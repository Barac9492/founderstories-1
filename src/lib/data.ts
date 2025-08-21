import type { Startup } from "./types";

const startups: Startup[] = [
  {
    id: "1",
    slug: "pixel-perfect",
    name: "Pixel Perfect",
    logo: "https://placehold.co/40x40/fca5a5/000000.png?text=P",
    sector: "Design Tool",
    tagline: "The last screen design tool you'll ever need.",
    rank: 1,
    latestMilestone: {
      id: "m1",
      type: "users",
      description: "Crossed 1,000 active monthly users",
      date: "2025-08-20",
      verified: true,
      link: "#",
    },
    deltaWeekly: 3,
    heatScore: 95,
    scoreComponents: { funding: 10, expansion: 10, hiring: 25, press: 20, users: 30 },
    milestones: [
      { id: "m1-1", type: "users", description: "Crossed 1,000 active monthly users", date: "2025-08-20", verified: true, link: "#" },
      { id: "m1-2", type: "press", description: "Featured on a popular design blog", date: "2025-06-15", verified: true, link: "#" },
      { id: "m1-3", type: "hiring", description: "Hired a freelance marketer", date: "2025-05-01", verified: true, link: "#" },
    ],
  },
  {
    id: "2",
    slug: "code-canvas",
    name: "CodeCanvas",
    logo: "https://placehold.co/40x40/a5b4fc/000000.png?text=C",
    sector: "Developer Tool",
    tagline: "Generate UI from a text prompt.",
    rank: 2,
    latestMilestone: {
      id: "m2",
      type: "users",
      description: "500 developers have tried our beta",
      date: "2025-07-10",
      verified: true,
      link: "#",
    },
    deltaWeekly: 0,
    heatScore: 92,
    scoreComponents: { funding: 5, expansion: 5, hiring: 30, press: 22, users: 30 },
     milestones: [
      { id: "m2-1", type: "users", description: "500 developers have tried our beta", date: "2025-07-10", verified: true, link: "#" },
      { id: "m2-2", type: "press", description: "Reached #1 on Hacker News", date: "2025-06-05", verified: true, link: "#" },
    ],
  },
  {
    id: "3",
    slug: "audio-hive",
    name: "AudioHive",
    logo: "https://placehold.co/40x40/fcd34d/000000.png?text=A",
    sector: "Creator Economy",
    tagline: "The platform for indie podcasters.",
    rank: 3,
    latestMilestone: {
      id: "m3",
      type: "funding",
      description: "Received a $25k grant",
      date: "2025-08-15",
      verified: true,
      link: "#",
    },
    deltaWeekly: -1,
    heatScore: 87,
    scoreComponents: { funding: 30, expansion: 10, hiring: 12, press: 25, users: 10 },
     milestones: [
      { id: "m3-1", type: "funding", description: "Received a $25k grant", date: "2025-08-15", verified: true, link: "#" },
      { id: "m3-2", type: "users", description: "100 paid subscribers", date: "2025-04-22", verified: true, link: "#" },
    ],
  },
  {
    id: "4",
    slug: "local-eats",
    name: "LocalEats",
    logo: "https://placehold.co/40x40/86efac/000000.png?text=L",
    sector: "Food Tech",
    tagline: "Discover hidden gem restaurants.",
    rank: 4,
    latestMilestone: {
      id: "m4",
      type: "expansion",
      description: "Launched in our second city, Busan",
      date: "2025-08-01",
      verified: true,
      link: "#",
    },
    deltaWeekly: 5,
    heatScore: 85,
    scoreComponents: { funding: 10, expansion: 30, hiring: 15, press: 10, users: 20 },
     milestones: [
      { id: "m4-1", type: "expansion", description: "Launched in our second city, Busan", date: "2025-08-01", verified: true, link: "#" },
      { id: "m4-2", type: "users", description: "First 100 restaurant partnerships", date: "2025-03-10", verified: false, link: "#" },
    ],
  },
  {
    id: "5",
    slug: "nomad-visa-kr",
    name: "NomadVisa.kr",
    logo: "https://placehold.co/40x40/93c5fd/000000.png?text=N",
    sector: "TravelTech",
    tagline: "Helping remote workers move to Korea.",
    rank: 5,
    latestMilestone: {
      id: "m5",
      type: "users",
      description: "Helped our 10th client get their visa",
      date: "2025-08-22",
      verified: true,
      link: "#",
    },
    deltaWeekly: 2,
    heatScore: 82,
    scoreComponents: { funding: 5, expansion: 10, hiring: 12, press: 25, users: 30 },
     milestones: [
        { id: "m5-1", type: "users", description: "Helped our 10th client get their visa", date: "2025-08-22", verified: true, link: "#" },
        { id: "m5-2", type: "hiring", description: "Brought on a part-time assistant", date: "2025-07-01", verified: true, link: "#" },
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
