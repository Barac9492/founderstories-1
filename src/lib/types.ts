export type Milestone = {
  id: string;
  type: "funding" | "hiring" | "expansion" | "press" | "users";
  description: string;
  date: string;
  verified: boolean;
  link: string;
};

export type ScoreComponents = {
  funding: number;
  expansion: number;
  hiring: number;

  press: number;
  users: number;
};

export type Startup = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  sector: string;
  tagline: string;
  rank: number;
  latestMilestone: Milestone;
  deltaWeekly: number;
  heatScore: number;
  scoreComponents: ScoreComponents;
  milestones: Milestone[];
};
