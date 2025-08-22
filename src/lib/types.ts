export type Milestone = {
  id: string;
  type: "revenue" | "customers" | "product" | "community" | "partnership" | "recognition";
  description: string;
  date: string;
  verified: boolean;
  link: string;
  value?: number; // For revenue milestones
};

export type ScoreComponents = {
  revenue: number;     // Monthly recurring revenue, sales
  customers: number;   // Customer testimonials, case studies
  product: number;     // Launches, features, iterations
  community: number;   // Social following, Discord members
  partnership: number; // Collaborations, integrations
  recognition: number; // Press, awards, mentions
};

export type Founder = {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  title: string;
  project: string;
  tagline: string;
  location: string;
  website?: string;
  twitter?: string;
  rank: number;
  latestMilestone: Milestone;
  deltaWeekly: number;
  heatScore: number;
  scoreComponents: ScoreComponents;
  milestones: Milestone[];
  monthlyRevenue?: number;
  foundedDate: string;
  isBootstrapped: boolean;
};
