'use server';

/**
 * @fileOverview A social media post generator for founders to share their startup's achievements.
 *
 * - generateSocialMediaPost - A function that generates a social media post for a startup's milestone.
 * - GenerateSocialMediaPostInput - The input type for the generateSocialMediaPost function.
 * - GenerateSocialMediaPostOutput - The return type for the generateSocialMediaPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaPostInputSchema = z.object({
  startupName: z.string().describe('The name of the startup.'),
  latestMilestone: z.string().describe('The latest verified milestone of the startup.'),
  deltaWeekly: z.string().describe('The weekly change in rank of the startup.'),
  heatScore: z.number().describe('The heat score of the startup.'),
});
export type GenerateSocialMediaPostInput = z.infer<
  typeof GenerateSocialMediaPostInputSchema
>;

const GenerateSocialMediaPostOutputSchema = z.object({
  socialMediaPost: z.string().describe('The generated social media post.'),
});
export type GenerateSocialMediaPostOutput = z.infer<
  typeof GenerateSocialMediaPostOutputSchema
>;

export async function generateSocialMediaPost(
  input: GenerateSocialMediaPostInput
): Promise<GenerateSocialMediaPostOutput> {
  return generateSocialMediaPostFlow(input);
}

const generateSocialMediaPostPrompt = ai.definePrompt({
  name: 'generateSocialMediaPostPrompt',
  input: {schema: GenerateSocialMediaPostInputSchema},
  output: {schema: GenerateSocialMediaPostOutputSchema},
  prompt: `You are a social media expert specializing in crafting engaging posts for startup founders.

  Based on the information provided, generate a compelling social media post to highlight the startup's achievement.
  Include relevant hashtags and a call to action to encourage engagement.

  Startup Name: {{{startupName}}}
  Latest Milestone: {{{latestMilestone}}}
  Weekly Rank Change: {{{deltaWeekly}}}
  Heat Score: {{{heatScore}}}

  Example:
  "🚀 Big news! {{startupName}} just achieved {{{latestMilestone}}}, boosting our Heat Score to {{heatScore}}! {{deltaWeekly}}! Check out our profile and join us on our journey! #startup #koreanstartup #innovation"
  `,
});

const generateSocialMediaPostFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaPostFlow',
    inputSchema: GenerateSocialMediaPostInputSchema,
    outputSchema: GenerateSocialMediaPostOutputSchema,
  },
  async input => {
    const {output} = await generateSocialMediaPostPrompt(input);
    return output!;
  }
);
