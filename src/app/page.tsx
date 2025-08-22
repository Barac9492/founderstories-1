"use client";

import { Header } from "@/components/Header";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getFounders, getTopMovers } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, Badge, Users, Info, Plus, Target, DollarSign, Rocket } from "lucide-react";
import Link from "next/link";
import { DatabaseSeeder } from "@/components/DatabaseSeeder";
import { useEffect, useState } from "react";
import type { Founder } from "@/lib/types";

export default function Home() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [topMovers, setTopMovers] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [foundersData, topMoversData] = await Promise.all([
          getFounders(),
          getTopMovers()
        ]);
        setFounders(foundersData);
        setTopMovers(topMoversData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Korean Indie Makers Making Real Money
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Real founders. Real revenue. Real milestones. No VC hype, just bootstrapped builders 
            sharing their honest journey from $0 to sustainable income.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/submit">
                <Plus className="w-5 h-5 mr-2" />
                Share Your Milestone
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="#leaderboard">
                <Target className="w-5 h-5 mr-2" />
                See the Rankings
              </Link>
            </Button>
          </div>
        </div>

        {/* Value Props for Founders */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold mb-2">Revenue Transparency</h3>
              <p className="text-muted-foreground">
                Real MRR numbers from Korean indie makers. See who's making $1K to $50K monthly.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Founder Community</h3>
              <p className="text-muted-foreground">
                Connect with other Korean builders. Get customer intros and partnership opportunities.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">Growth Inspiration</h3>
              <p className="text-muted-foreground">
                Follow founders going from first sale to sustainable business. Real stories, real progress.
              </p>
            </Card>
          </div>
        </section>

{!loading && topMovers.length > 0 && (
           <section className="mb-16">
           <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
             <ArrowUp className="w-7 h-7 mr-3 text-accent" /> Rising Makers
           </h2>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {topMovers.map((founder) => (
               <Card key={founder.id} className="bg-card/50 hover:bg-card/90 transition-colors duration-300">
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-lg font-medium font-headline">{founder.name}</CardTitle>
                   <div className="flex items-center text-sm font-bold text-accent">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      +{founder.deltaWeekly}
                    </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground mb-2">{founder.project}</p>
                   <p className="text-xs text-muted-foreground">{founder.latestMilestone?.description}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </section>
        )}
        
        <section className="mb-12" id="leaderboard">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline">Korean Indie Maker Rankings</h2>
              <p className="text-muted-foreground mt-1">
                Ranked by Heat Score: revenue growth, customer love, and product momentum. 
                <Link href="/submit" className="text-primary hover:underline ml-1">Add your milestone →</Link>
              </p>
            </div>
            <DatabaseSeeder />
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading founders...</p>
            </div>
          ) : (
            <LeaderboardTable startups={founders} />
          )}
        </section>

        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline flex items-center text-2xl">
                <Info className="w-6 h-6 mr-3 text-primary"/>
                For Korean Indie Makers, By Korean Indie Makers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                <strong>이것은 투자자를 위한 것이 아닙니다.</strong> This is for the builders, the makers, the ones bootstrapping their dreams into reality.
              </p>
              <p>
                We track what actually matters: your first paying customer, hitting $1K MRR, launching that feature you've been working on for months. 
                Small wins that lead to big outcomes. Real progress, not press releases.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/submit">
                    <Plus className="w-4 h-4 mr-2" />
                    Share Your Story
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="mailto:founders@founderstories.dev">
                    <Users className="w-4 h-4 mr-2" />
                    Join Our Community
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built by Korean indie makers, for Korean indie makers. 
            <Link href="/submit" className="text-primary hover:underline ml-1">Share your milestone</Link> or 
            <a href="mailto:founders@founderstories.dev" className="text-primary hover:underline ml-1">get in touch</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
