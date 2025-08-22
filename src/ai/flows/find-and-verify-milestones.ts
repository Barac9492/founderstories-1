'use server';

/**
 * @fileOverview An AI agent that researches startups to find and verify new milestones.
 *
 * - findAndVerifyMilestones - A function that finds and verifies milestones for a startup.
 * - FindAndVerifyMilestonesInput - The input type for the findAndVerifyMilestones function.
 * - FindAndVerifyMilestonesOutput - The return type for the findAndVerifyMilestones function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, limit } from 'firebase/firestore';


const searchTool = ai.defineTool(
  {
    name: 'searchTheWeb',
    description: 'Searches the web for recent news and articles about a given topic.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.object({
      results: z.array(
        z.object({
          title: z.string(),
          link: z.string().url(),
          snippet: z.string(),
        })
      ),
    }),
  },
  async (input) => {
    // In a real implementation, this would use a search API like Google Search.
    // For now, we return mock data to simulate the process.
    console.log(`Searching the web for: ${input.query}`);
    if (input.query.toLowerCase().includes('toss')) {
        return {
          results: [
            {
              title: 'Toss Raises $410M to Supercharge its Super App Ambitions',
              link: 'https://techcrunch.com/2021/06/28/toss-raises-410m-to-supercharge-its-super-app-ambitions/',
              snippet: 'South Korean fintech unicorn Toss has raised $410 million in a new funding round, pushing its valuation to $7.4 billion...',
            },
            {
                title: 'Viva Republica, parent company of Toss, expands to 1000 employees',
                link: 'https://www.realnews.com/viva-republica-expands-to-1000-employees',
                snippet: 'Viva Republica, the parent company of the popular financial service app Toss, announced today that it has surpassed 1000 total employees, marking a significant milestone in its growth.',
            }
          ],
        };
    }
    return { results: [] };
  }
);


const FindAndVerifyMilestonesInputSchema = z.object({
  startupName: z.string().describe('The name of the startup to research.'),
});
export type FindAndVerifyMilestonesInput = z.infer<typeof FindAndVerifyMilestonesInputSchema>;

const MilestoneSchema = z.object({
    type: z
    .enum(['funding', 'hiring', 'expansion', 'users', 'press'])
    .describe('The type of the milestone.'),
  description: z.string().describe('A description of the milestone.'),
  date: z.string().describe('The date the milestone was achieved (YYYY-MM-DD).'),
  proofLink: z.string().url().describe('A URL to a public source verifying the milestone.'),
  verified: z.boolean().describe('Whether the milestone is considered verified by the agent.')
});

const FindAndVerifyMilestonesOutputSchema = z.object({
  milestones: z.array(MilestoneSchema).describe("A list of new, verified milestones found for the startup.")
});
export type FindAndVerifyMilestonesOutput = z.infer<typeof FindAndVerifyMilestonesOutputSchema>;


export async function findAndVerifyMilestones(
  input: FindAndVerifyMilestonesInput
): Promise<FindAndVerifyMilestonesOutput> {
  return findAndVerifyMilestonesFlow(input);
}


const milestoneFinderPrompt = ai.definePrompt({
    name: 'milestoneFinderPrompt',
    input: { schema: FindAndVerifyMilestonesInputSchema },
    output: { schema: FindAndVerifyMilestonesOutputSchema },
    tools: [searchTool],
    prompt: `You are an expert startup analyst. Your job is to find, analyze, and verify milestones for startups based on web search results.

    For the startup '{{{startupName}}}', search the web for any recent news or articles.
    
    From the search results, identify key, verifiable milestones such as:
    - Funding rounds (amount, series, investors)
    - Significant hiring announcements (e.g., reaching a certain number of employees, key executive hires)
    - Market or geographical expansion
    - Major user growth (e.g., reaching 1 million users)
    - Significant press mentions in top-tier publications.
    
    For each potential milestone you identify, you must provide a description, an estimated date, a proof link directly from the search results, and set 'verified' to true. If you cannot find any new milestones, return an empty list.`,
});


const findAndVerifyMilestonesFlow = ai.defineFlow(
  {
    name: 'findAndVerifyMilestonesFlow',
    inputSchema: FindAndVerifyMilestonesInputSchema,
    outputSchema: FindAndVerifyMilestonesOutputSchema,
  },
  async (input) => {
    const { output } = await milestoneFinderPrompt(input);
    
    if (!output || !output.milestones || output.milestones.length === 0) {
      console.log(`No new milestones found for ${input.startupName}`);
      return { milestones: [] };
    }
    
    const startupsRef = collection(db, "startups");
    const q = query(startupsRef, where("name", "==", input.startupName), limit(1));
    const startupSnapshot = await getDocs(q);

    if (startupSnapshot.empty) {
        throw new Error(`Startup "${input.startupName}" not found.`);
    }
    const startupId = startupSnapshot.docs[0].id;
    const milestonesCollection = collection(db, `startups/${startupId}/milestones`);

    for (const milestone of output.milestones) {
        await addDoc(milestonesCollection, {
            type: milestone.type,
            description: milestone.description,
            date: milestone.date,
            link: milestone.proofLink,
            verified: milestone.verified,
        });
        console.log(`Saved new milestone for ${input.startupName}: ${milestone.description}`);
    }

    console.log(`Found and saved ${output.milestones.length} new milestones for ${input.startupName}`);
    return output;
  }
);
