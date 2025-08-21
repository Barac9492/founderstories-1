import type { Startup } from "./types";

const startups: Startup[] = [
  {
    id: "1",
    slug: "seoul-spice-club",
    name: "Seoul Spice Club",
    logo: "https://placehold.co/40x40/fca5a5/000000.png?text=S",
    sector: "Subscription Box",
    tagline: "Discover artisanal Korean spices, delivered monthly.",
    rank: 1,
    latestMilestone: {
      id: "m1",
      type: "users",
      description: "Shipped our 500th monthly spice box",
      date: "2025-08-20",
      verified: true,
      link: "#",
    },
    deltaWeekly: 3,
    heatScore: 95,
    scoreComponents: { funding: 0, expansion: 10, hiring: 25, press: 30, users: 30 },
    milestones: [
      { id: "m1-1", type: "users", description: "Shipped our 500th monthly spice box", date: "2025-08-20", verified: true, link: "#" },
      { id: "m1-2", type: "press", description: "Featured on a popular food blog", date: "2025-06-15", verified: true, link: "#" },
      { id: "m1-3", type: "hiring", description: "Hired a part-time fulfillment assistant", date: "2025-05-01", verified: true, link: "#" },
    ],
  },
  {
    id: "2",
    slug: "hanok-hideaways",
    name: "Hanok Hideaways",
    logo: "https://placehold.co/40x40/a5b4fc/000000.png?text=H",
    sector: "Travel",
    tagline: "Book unique stays in traditional Korean houses.",
    rank: 2,
    latestMilestone: {
      id: "m2",
      type: "users",
      description: "100 bookings processed through the platform",
      date: "2025-07-10",
      verified: true,
      link: "#",
    },
    deltaWeekly: 0,
    heatScore: 92,
    scoreComponents: { funding: 0, expansion: 5, hiring: 30, press: 22, users: 35 },
     milestones: [
      { id: "m2-1", type: "users", description: "100 bookings processed through the platform", date: "2025-07-10", verified: true, link: "#" },
      { id: "m2-2", type: "press", description: "Mentioned in a travel magazine", date: "2025-06-05", verified: true, link: "#" },
    ],
  },
  {
    id: "3",
    slug: "webtoon-wizard",
    name: "Webtoon Wizard",
    logo: "https://placehold.co/40x40/fcd34d/000000.png?text=W",
    sector: "Creator Tool",
    tagline: "AI-powered storyboarding for webtoon artists.",
    rank: 3,
    latestMilestone: {
      id: "m3",
      type: "funding",
      description: "Received a $10k micro-grant from an arts fund",
      date: "2025-08-15",
      verified: true,
      link: "#",
    },
    deltaWeekly: -1,
    heatScore: 87,
    scoreComponents: { funding: 20, expansion: 10, hiring: 12, press: 25, users: 20 },
     milestones: [
      { id: "m3-1", type: "funding", description: "Received a $10k micro-grant from an arts fund", date: "2025-08-15", verified: true, link: "#" },
      { id: "m3-2", type: "users", description: "50 artists are using the beta", date: "2025-04-22", verified: true, link: "#" },
    ],
  },
  {
    id: "4",
    slug: "makgeolli-mates",
    name: "Makgeolli Mates",
    logo: "https://placehold.co/40x40/86efac/000000.png?text=M",
    sector: "E-commerce",
    tagline: "A subscription service for craft makgeolli.",
    rank: 4,
    latestMilestone: {
      id: "m4",
      type: "expansion",
      description: "First international shipment to Japan",
      date: "2025-08-01",
      verified: true,
      link: "#",
    },
    deltaWeekly: 5,
    heatScore: 85,
    scoreComponents: { funding: 0, expansion: 30, hiring: 15, press: 10, users: 30 },
     milestones: [
      { id: "m4-1", type: "expansion", description: "First international shipment to Japan", date: "2025-08-01", verified: true, link: "#" },
      { id: "m4-2", type: "users", description: "Partnered with our 10th brewery", date: "2025-03-10", verified: false, link: "#" },
    ],
  },
  {
    id: "5",
    slug: "k-fashion-insider",
    name: "K-Fashion Insider",
    logo: "https://placehold.co/40x40/93c5fd/000000.png?text=K",
    sector: "Media",
    tagline: "The indie newsletter for upcoming Korean fashion brands.",
    rank: 5,
    latestMilestone: {
      id: "m5",
      type: "users",
      description: "Crossed 1,000 free subscribers",
      date: "2025-08-22",
      verified: true,
      link: "#",
    },
    deltaWeekly: 2,
    heatScore: 82,
    scoreComponents: { funding: 0, expansion: 10, hiring: 12, press: 30, users: 30 },
     milestones: [
        { id: "m5-1", type: "users", description: "Crossed 1,000 free subscribers", date: "2025-08-22", verified: true, link: "#" },
        { id: "m5-2", type: "hiring", description: "Brought on a freelance editor", date: "2025-07-01", verified: true, link: "#" },
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
