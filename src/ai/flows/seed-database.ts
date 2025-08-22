'use server';
/**
 * @fileOverview A flow to seed the Firestore database with initial startup data.
 *
 * - seedDatabase - A function that clears and seeds the database.
 * - SeedDatabaseOutput - The return type for the seedDatabase function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase-admin';
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import * as fs from 'fs/promises';
import * as path from 'path';

const SeedDatabaseOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  startupCount: z.number(),
  milestoneCount: z.number(),
});
export type SeedDatabaseOutput = z.infer<typeof SeedDatabaseOutputSchema>;

type StartupSeed = {
    name: string;
    slug: string;
    logo: string;
    sector: string;
    tagline: string;
    rank: number;
    deltaWeekly: number;
    heatScore: number;
    scoreComponents: {
        funding: number;
        expansion: number;
        hiring: number;
        press: number;
        users: number;
    };
    _milestones?: Array<{
        type: "funding" | "hiring" | "expansion" | "press" | "users";
        description: string;
        date: string;
        verified: boolean;
        link: string;
    }>;
};

export async function seedDatabase(): Promise<SeedDatabaseOutput> {
  return seedDatabaseFlow();
}

const seedDatabaseFlow = ai.defineFlow(
  {
    name: 'seedDatabaseFlow',
    inputSchema: z.void(),
    outputSchema: SeedDatabaseOutputSchema,
  },
  async () => {
    console.log('Starting database seed process...');
    const batch = writeBatch(db);

    // 1. Clear existing data
    console.log('Clearing existing founder data...');
    const foundersSnapshot = await getDocs(collection(db, 'founders'));
    for (const founderDoc of foundersSnapshot.docs) {
      // Note: This doesn't clear subcollections automatically.
      // For a full wipe, a more complex recursive delete would be needed,
      // but for this app's purpose, overwriting is sufficient.
      batch.delete(founderDoc.ref);
    }
    console.log(`Cleared ${foundersSnapshot.size} founders.`);

    // 2. Read seed data from JSON file
    const jsonPath = path.resolve(process.cwd(), 'firestore.json');
    const jsonString = await fs.readFile(jsonPath, 'utf-8');
    const data = JSON.parse(jsonString);
    const foundersToSeed: StartupSeed[] = data.founders || data.startups;

    let totalMilestones = 0;

    // 3. Prepare batch write for new data
    console.log(`Seeding ${foundersToSeed.length} founders...`);
    for (const founderData of foundersToSeed) {
      const { _milestones, ...founderCoreData } = founderData;
      const founderRef = doc(collection(db, 'founders'));
      batch.set(founderRef, founderCoreData);

      if (_milestones && _milestones.length > 0) {
        totalMilestones += _milestones.length;
        const milestonesCollectionRef = collection(db, `founders/${founderRef.id}/milestones`);
        for (const milestoneData of _milestones) {
          const milestoneRef = doc(milestonesCollectionRef);
          batch.set(milestoneRef, milestoneData);
        }
      }
    }

    // 4. Commit the batch
    await batch.commit();
    console.log('Database seeded successfully.');

    return {
      success: true,
      message: 'Database seeded successfully!',
      startupCount: foundersToSeed.length,
      milestoneCount: totalMilestones,
    };
  }
);
