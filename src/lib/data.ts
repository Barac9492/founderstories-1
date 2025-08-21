import type { Startup } from "./types";

const startups: Startup[] = [
  {
    id: "1",
    slug: "scatter-lab",
    name: "Scatter Lab",
    logo: "https://placehold.co/40x40/fca5a5/000000.png?text=S",
    sector: "AI",
    tagline: "Building emotionally intelligent AI companions.",
    rank: 1,
    latestMilestone: {
      id: "m1",
      type: "users",
      description: "AI companion 'Luda' reached 1 million registered users",
      date: "2025-08-15",
      verified: true,
      link: "#",
    },
    deltaWeekly: 2,
    heatScore: 94,
    scoreComponents: { funding: 20, expansion: 10, hiring: 25, press: 19, users: 20 },
    milestones: [
      { id: "m1-1", type: "users", description: "AI companion 'Luda' reached 1 million registered users", date: "2025-08-15", verified: true, link: "#" },
      { id: "m1-2", type: "funding", description: "Closed a $15M Series B round", date: "2025-06-30", verified: true, link: "#" },
      { id: "m1-3", type: "press", description: "Featured in major tech publication for ethical AI design", date: "2025-05-10", verified: true, link: "#" },
    ],
  },
  {
    id: "2",
    slug: "karrot",
    name: "Karrot",
    logo: "https://placehold.co/40x40/fdba74/000000.png?text=K",
    sector: "Marketplace",
    tagline: "The hyperlocal community app for your neighborhood.",
    rank: 2,
    latestMilestone: {
      id: "m2",
      type: "expansion",
      description: "Launched 'Karrot Pay' in beta for seamless local transactions",
      date: "2025-07-28",
      verified: true,
      link: "#",
    },
    deltaWeekly: 0,
    heatScore: 91,
    scoreComponents: { funding: 25, expansion: 25, hiring: 16, press: 10, users: 15 },
     milestones: [
      { id: "m2-1", type: "expansion", description: "Launched 'Karrot Pay' in beta for seamless local transactions", date: "2025-07-28", verified: true, link: "#" },
      { id: "m2-2", type: "users", description: "Crossed 30 million cumulative sign-ups in Korea", date: "2025-04-19", verified: true, link: "#" },
      { id: "m2-3", type: "hiring", description: "Opened new engineering hub in Pangyo", date: "2025-02-01", verified: true, link: "#" },
    ],
  },
  {
    id: "3",
    slug: "class101",
    name: "Class101",
    logo: "https://placehold.co/40x40/86efac/000000.png?text=C",
    sector: "Edutech",
    tagline: "The platform for online creative classes.",
    rank: 3,
    latestMilestone: {
      id: "m3",
      type: "hiring",
      description: "Hired a new CTO to lead global platform development",
      date: "2025-08-05",
      verified: true,
      link: "#",
    },
    deltaWeekly: 1,
    heatScore: 88,
    scoreComponents: { funding: 30, expansion: 10, hiring: 20, press: 8, users: 20 },
     milestones: [
      { id: "m3-1", type: "hiring", description: "Hired a new CTO to lead global platform development", date: "2025-08-05", verified: true, link: "#" },
      { id: "m3-2", type: "expansion", description: "Launched first cohort of classes in Japanese", date: "2025-06-20", verified: true, link: "#" },
      { id: "m3-3", type: "funding", description: "Secured strategic investment from a global education fund", date: "2025-03-15", verified: true, link: "#" },
    ],
  },
  {
    id: "4",
    slug: "riiid",
    name: "Riiid",
    logo: "https://placehold.co/40x40/a5b4fc/000000.png?text=R",
    sector: "Edutech",
    tagline: "AI-powered personalized learning solutions.",
    rank: 4,
    latestMilestone: {
      id: "m4",
      type: "press",
      description: "Published research on AI model accuracy in a top academic journal",
      date: "2025-08-18",
      verified: true,
      link: "#",
    },
    deltaWeekly: -2,
    heatScore: 85,
    scoreComponents: { funding: 25, expansion: 5, hiring: 15, press: 30, users: 10 },
     milestones: [
      { id: "m4-1", type: "press", description: "Published research on AI model accuracy in a top academic journal", date: "2025-08-18", verified: true, link: "#" },
      { id: "m4-2", type: "users", description: "Reached 5 million cumulative users for its public test prep app", date: "2025-05-25", verified: true, link: "#" },
    ],
  },
  {
    id: "5",
    slug: "wanted-lab",
    name: "Wanted Lab",
    logo: "https://placehold.co/40x40/fcd34d/000000.png?text=W",
    sector: "HR Tech",
    tagline: "AI-based recruitment and career development platform.",
    rank: 5,
    latestMilestone: {
      id: "m5",
      type: "expansion",
      description: "Acquired a smaller niche job board for designers",
      date: "2025-07-30",
      verified: false,
      link: "#",
    },
    deltaWeekly: 0,
    heatScore: 81,
    scoreComponents: { funding: 15, expansion: 25, hiring: 21, press: 10, users: 10 },
     milestones: [
        { id: "m5-1", type: "expansion", description: "Acquired a smaller niche job board for designers", date: "2025-07-30", verified: false, link: "#" },
        { id: "m5-2", type: "hiring", description: "Announced plan to hire 50 new engineers in H2", date: "2025-06-15", verified: true, link: "#" },
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
