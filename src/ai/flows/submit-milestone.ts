'use server';

/**
 * @fileOverview A flow for submitting new startup milestones.
 *
 * - submitMilestone - A function that handles new milestone submissions.
 * - SubmitMilestoneInput - The input type for the submitMilestone function.
 * - SubmitMilestoneOutput - The return type for the submitMilestone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubmitMilestoneInputSchema = z.object({
  startupName: z.string().describe('The name of the startup.'),
  milestoneType: z
    .enum(['funding', 'hiring', 'expansion', 'users', 'press'])
    .describe('The type of the milestone.'),
  description: z.string().describe('A description of the milestone.'),
  date: z.string().describe('The date the milestone was achieved.'),
  proofLink: z.string().url().describe('A URL to a public source verifying the milestone.'),
});

export type SubmitMilestoneInput = z.infer<typeof SubmitMilestoneInputSchema>;

const SubmitMilestoneOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SubmitMilestoneOutput = z.infer<typeof SubmitMilestoneOutputSchema>;

export async function submitMilestone(
  input: SubmitMilestoneInput
): Promise<SubmitMilestoneOutput> {
  return submitMilestoneFlow(input);
}

const submitMilestoneFlow = ai.defineFlow(
  {
    name: 'submitMilestoneFlow',
    inputSchema: SubmitMilestoneInputSchema,
    outputSchema: SubmitMilestoneOutputSchema,
  },
  async input => {
    // In a real application, you would save this to a database
    // and queue it for verification.
    console.log('Received milestone submission:', input);

    // The AI part can be expanded here later to analyze the proofLink,
    // verify the description, and calculate its impact on the heat score.

    return {
      success: true,
      message: 'Milestone submitted for verification.',
    };
  }
);
