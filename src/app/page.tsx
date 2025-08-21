import { Header } from "@/components/Header";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getStartups, getTopMovers } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Badge, Users, Info } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const startups = getStartups();
  const topMovers = getTopMovers();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            The Unwritten Stories of Korean Startups
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            FounderRank tracks the small wins and giant leaps of founders in real-time. This isn't just data. It's the journey.
          </p>
        </div>

        {topMovers.length > 0 && (
           <section className="mb-16">
           <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
             <ArrowUp className="w-7 h-7 mr-3 text-accent" /> Top Movers
           </h2>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {topMovers.map((startup) => (
               <Card key={startup.id} className="bg-card/50 hover:bg-card/90 transition-colors duration-300">
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-lg font-medium font-headline">{startup.name}</CardTitle>
                   <div className="flex items-center text-sm font-bold text-accent">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      {startup.deltaWeekly} spots
                    </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">{startup.latestMilestone.description}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </section>
        )}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold font-headline">Leaderboard</h2>
            <p className="text-muted-foreground mt-1">This is a living list, fueled by verified milestones from founders like you.</p>
          </div>
          <LeaderboardTable startups={startups} />
        </section>

        <section className="mb-16">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Info className="w-5 h-5 mr-3 text-primary"/>
                About FounderRank
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>This isn't for VCs. It's for the founders, the makers, the ones in the arena.</p>
              <p>We measure progress, not just hype. A new hire, a product launch, a country expansion—these are the milestones that matter. They tell the real story. By making these small wins visible and celebrating them, we create a different kind of status, a different kind of community.</p>
              <p>This is an invitation. Share your journey. See the progress. Connect with others on the same path. Let's make something remarkable, together.</p>
            </CardContent>
          </Card>
        </section>

      </main>
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built by a solo indie hacker. Follow the journey on <a href="https://x.com/levelsio" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X (formerly Twitter)</a>.</p>
        </div>
      </footer>
    </div>
  );
}
