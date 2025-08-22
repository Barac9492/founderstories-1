import { config } from 'dotenv';
config();

import '@/ai/flows/generate-social-media-post.ts';
import '@/ai/flows/submit-milestone.ts';
import '@/ai/flows/find-and-verify-milestones.ts';
import '@/ai/flows/seed-database.ts';
