import type { Startup } from "./types";

const startups: Startup[] = [
  {
    id: "1",
    slug: "upstage",
    name: "Upstage",
    logo: "https://placehold.co/40x40/29ABE2/FFFFFF.png?text=U",
    sector: "AI & ML",
    tagline: "Making AI accessible for everyone.",
    rank: 1,
    latestMilestone: {
      id: "m1",
      type: "funding",
      description: "$45M Series B bridge",
      date: "2025-08-20",
      verified: true,
      link: "#",
    },
    deltaWeekly: 3,
    heatScore: 95,
    scoreComponents: { funding: 40, expansion: 20, hiring: 15, press: 10, users: 10 },
    milestones: [
      { id: "m1-1", type: "funding", description: "$45M Series B bridge", date: "2025-08-20", verified: true, link: "#" },
      { id: "m1-2", type: "expansion", description: "Opened new office in Japan", date: "2025-06-15", verified: true, link: "#" },
      { id: "m1-3", type: "hiring", description: "Hired 50 new engineers", date: "2025-05-01", verified: true, link: "#" },
    ],
  },
  {
    id: "2",
    slug: "furiosa-ai",
    name: "FuriosaAI",
    logo: "https://placehold.co/40x40/90EE90/000000.png?text=F",
    sector: "AI Hardware",
    tagline: "Next-generation AI accelerators.",
    rank: 2,
    latestMilestone: {
      id: "m2",
      type: "funding",
      description: "$125M Series B",
      date: "2025-07-10",
      verified: true,
      link: "#",
    },
    deltaWeekly: 0,
    heatScore: 92,
    scoreComponents: { funding: 38, expansion: 15, hiring: 17, press: 12, users: 10 },
     milestones: [
      { id: "m2-1", type: "funding", description: "$125M Series B", date: "2025-07-10", verified: true, link: "#" },
      { id: "m2-2", type: "press", description: "Featured in Bloomberg", date: "2025-06-05", verified: true, link: "#" },
    ],
  },
  {
    id: "3",
    slug: "toss",
    name: "Toss",
    logo: "https://placehold.co/40x40/1a1a1a/ffffff.png?text=T",
    sector: "FinTech",
    tagline: "Reimagining finance.",
    rank: 3,
    latestMilestone: {
      id: "m3",
      type: "press",
      description: "Preparing 2026 IPO",
      date: "2025-08-15",
      verified: true,
      link: "#",
    },
    deltaWeekly: -1,
    heatScore: 87,
    scoreComponents: { funding: 30, expansion: 18, hiring: 12, press: 17, users: 10 },
     milestones: [
      { id: "m3-1", type: "press", description: "Preparing 2026 IPO", date: "2025-08-15", verified: true, link: "#" },
      { id: "m3-2", type: "users", description: "Reached 20 million users", date: "2025-04-22", verified: true, link: "#" },
    ],
  },
  {
    id: "4",
    slug: "musinsa",
    name: "MUSINSA",
    logo: "https://placehold.co/40x40/E6E6E6/000000.png?text=M",
    sector: "E-commerce",
    tagline: "Korea's leading fashion platform.",
    rank: 4,
    latestMilestone: {
      id: "m4",
      type: "expansion",
      description: "Launched in 13 countries",
      date: "2025-08-01",
      verified: true,
      link: "#",
    },
    deltaWeekly: 5,
    heatScore: 85,
    scoreComponents: { funding: 25, expansion: 20, hiring: 15, press: 15, users: 10 },
     milestones: [
      { id: "m4-1", type: "expansion", description: "Launched in 13 countries", date: "2025-08-01", verified: true, link: "#" },
      { id: "m4-2", type: "funding", description: "$200M Series C", date: "2025-03-10", verified: false, link: "#" },
    ],
  },
  {
    id: "5",
    slug: "lunit",
    name: "Lunit",
    logo: "https://placehold.co/40x40/29ABE2/ffffff.png?text=L",
    sector: "HealthTech",
    tagline: "AI solutions for cancer diagnostics.",
    rank: 5,
    latestMilestone: {
      id: "m5",
      type: "press",
      description: "Enters Top 10 for first time!",
      date: "2025-08-22",
      verified: true,
      link: "#",
    },
    deltaWeekly: 2,
    heatScore: 82,
    scoreComponents: { funding: 30, expansion: 15, hiring: 12, press: 15, users: 10 },
     milestones: [
        { id: "m5-1", type: "press", description: "Enters Top 10 for first time!", date: "2025-08-22", verified: true, link: "#" },
        { id: "m5-2", type: "hiring", description: "Expanded research team by 30%", date: "2025-07-01", verified: true, link: "#" },
     ],
  },
];

export const getStartups = (): Startup[] => {
  return startups.sort((a, b) => a.rank - b.rank);
};

export const getStartupBySlug = (slug: string): Startup | undefined => {
  return startups.find((s) => s.slug === slug);
};

export const getTopMovers = (): Startup[] => {
    return startups.filter(s => s.deltaWeekly > 0).sort((a, b) => b.deltaWeekly - a.deltaWeekly).slice(0, 3);
}
