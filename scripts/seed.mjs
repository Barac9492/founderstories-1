import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs/promises';
import path from 'path';

// Initialize Firebase Admin
try {
  initializeApp({
    projectId: 'founderstories'
  });
} catch (error) {
  console.log('Firebase already initialized or error:', error.message);
}

const db = getFirestore();

async function seedDatabase() {
  console.log('🌱 Starting database seed process...');
  
  try {
    const batch = db.batch();

    // 1. Clear existing data
    console.log('🧹 Clearing existing startup data...');
    const startupsSnapshot = await db.collection('startups').get();
    for (const startupDoc of startupsSnapshot.docs) {
      batch.delete(startupDoc.ref);
    }
    console.log(`🗑️  Cleared ${startupsSnapshot.size} existing startups.`);

    // 2. Read seed data from JSON file
    const jsonPath = path.resolve(process.cwd(), 'firestore.json');
    const jsonString = await fs.readFile(jsonPath, 'utf-8');
    const data = JSON.parse(jsonString);
    const startupsToSeed = data.startups;

    let totalMilestones = 0;

    // 3. Prepare batch write for new data
    console.log(`📊 Seeding ${startupsToSeed.length} startups...`);
    for (const startupData of startupsToSeed) {
      const { _milestones, ...startupCoreData } = startupData;
      const startupRef = db.collection('startups').doc();
      batch.set(startupRef, startupCoreData);

      if (_milestones && _milestones.length > 0) {
        totalMilestones += _milestones.length;
        for (const milestoneData of _milestones) {
          const milestoneRef = startupRef.collection('milestones').doc();
          batch.set(milestoneRef, milestoneData);
        }
      }
    }

    // 4. Commit the batch
    await batch.commit();
    console.log('✅ Database seeded successfully!');
    console.log(`📈 Seeded ${startupsToSeed.length} startups with ${totalMilestones} milestones`);

    return {
      success: true,
      message: 'Database seeded successfully!',
      startupCount: startupsToSeed.length,
      milestoneCount: totalMilestones,
    };
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Run the seeder
seedDatabase()
  .then(result => {
    console.log('🎉 Seeding completed:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });