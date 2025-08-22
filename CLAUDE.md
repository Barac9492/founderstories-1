# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FounderStories is a startup leaderboard and milestone tracking platform for Korean startups. It ranks companies based on a "Heat Score" calculated from various milestone types (funding, hiring, expansion, press, users).

## Key Commands

```bash
# Development
npm run dev          # Start Next.js dev server with Turbopack on port 9002
npm run genkit:dev   # Start AI/Genkit development server
npm run genkit:watch # Start AI/Genkit with hot reload

# Build and Production
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking (tsc --noEmit)
```

## Architecture Overview

### Tech Stack
- **Next.js 15.3** with App Router and TypeScript
- **Firebase** (Firestore database, Admin SDK for server operations)
- **Google Genkit AI** with Gemini 2.0 Flash model
- **Radix UI + Shadcn/ui** component library
- **Tailwind CSS** with custom design system

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Homepage leaderboard
│   └── s/[slug]/       # Dynamic startup profile pages
├── components/         # React components
│   └── ui/            # Shadcn/ui components
├── lib/               # Core utilities
│   ├── firebase-client.ts  # Client Firebase config
│   ├── firebase-admin.ts   # Server Firebase config
│   ├── data.ts            # Data fetching functions
│   └── types.ts           # TypeScript definitions
└── ai/                # AI/Genkit integration
    ├── genkit.ts      # AI configuration
    └── flows/         # AI workflow definitions
```

### Data Model
- **Startups Collection**: Main entities with heat scores and rankings
- **Milestones Subcollection**: Events nested under each startup
- Heat Score calculated from milestone types: funding, hiring, expansion, press, users

### Key Data Fetching Functions (lib/data.ts)
- `getStartups()`: Fetches ranked startup list
- `getStartupBySlug()`: Gets single startup with milestones
- `getMilestonesByStartup()`: Fetches startup milestones
- `getHeatScoreBreakdown()`: Returns score component breakdown

## Important Patterns

### Server Components by Default
All components are server components unless marked with `'use client'`. Data fetching happens server-side using Firebase Admin SDK.

### AI Integration
Genkit flows in `src/ai/flows/` handle:
- Milestone submission and verification
- Social media post generation
- Automated milestone discovery
- Database seeding (development)

### Styling Approach
- Tailwind CSS with custom design tokens
- CSS variables for theming (supports dark mode)
- Component variants using Class Variance Authority (CVA)
- Fonts: Space Grotesk (headlines) + Inter (body)

### Firebase Security
- Public read access to all startup data
- Anyone can submit milestones (unverified by default)
- No authentication required for basic functionality

## Common Development Tasks

### Adding New UI Components
Use Shadcn/ui CLI or manually add to `src/components/ui/`. Components should follow existing patterns using Radix primitives with Tailwind styling.

### Modifying Heat Score Algorithm
Update scoring logic in `lib/data.ts:calculateHeatScore()` and ensure `getHeatScoreBreakdown()` reflects changes.

### Working with AI Flows
1. Edit flow definitions in `src/ai/flows/`
2. Use `npm run genkit:watch` for hot reload
3. Test flows via Genkit UI at http://localhost:4000

### Database Operations
- Client-side: Use `lib/firebase-client.ts` imports
- Server-side: Use `lib/firebase-admin.ts` imports
- All Firestore operations should handle errors gracefully

## Environment Configuration

Required environment variables:
- Firebase configuration (auto-configured in Firebase hosting)
- Google AI API credentials for Genkit

## Notes

- Build errors from TypeScript/ESLint are ignored in production (`ignoreBuildErrors: true` in next.config.ts)
- Development server runs on port 9002 to avoid conflicts
- Images use placehold.co for placeholder content
- The project was originally named "FounderRank" in specifications