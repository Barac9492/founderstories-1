import { Header } from "@/components/Header";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getStartups, getTopMovers } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Badge, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const startups = getStartups();
  const topMovers = getTopMovers();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            The Live Heat Index of Korean Startups
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            FounderRank is a real-time leaderboard of Korean startups, ranked by verifiable milestones.
          </p>
        </div>

        {topMovers.length > 0 && (
           <section className="mb-12">
           <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
             <ArrowUp className="w-6 h-6 mr-2 text-accent-foreground" /> Top Movers
           </h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {topMovers.map((startup) => (
               <Card key={startup.id} className="bg-card/80 backdrop-blur-sm">
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-lg font-medium font-headline">{startup.name}</CardTitle>
                   <div className="flex items-center text-sm font-bold text-accent-foreground">
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
          <h2 className="text-2xl font-bold font-headline mb-2">Leaderboard</h2>
           <p className="text-muted-foreground mb-4">Demo data. Not live yet. But you get the idea.</p>
          <LeaderboardTable startups={startups} />
        </section>
      </main>
      <footer className="py-6 border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built by a solo indie hacker. Follow the journey on <a href="https://x.com/levelsio" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X (formerly Twitter)</a>.</p>
        </div>
      </footer>
    </div>
  );
}
