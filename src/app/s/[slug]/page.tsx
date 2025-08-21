
'use client';

import { getStartupBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MilestonesFeed } from "@/components/MilestonesFeed";
import { HeatScoreBreakdown } from "@/components/HeatScoreBreakdown";
import { SocialPostGenerator } from "@/components/SocialPostGenerator";
import { Globe, Link as LinkIcon, Briefcase, Search, Loader2 } from "lucide-react";
import type { Startup } from "@/lib/types";
import { findAndVerifyMilestones } from "@/ai/flows/find-and-verify-milestones";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: {
    slug: string;
  };
};

function ProfilePageSkeleton() {
    return (
     <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                <Skeleton className="w-[120px] h-[120px] rounded-2xl" />
                <div className="flex-grow pt-2 space-y-3">
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card><CardHeader><CardTitle><Skeleton className="h-8 w-1/4" /></CardTitle></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
                </div>
                <div className="space-y-8">
                    <Card><CardHeader><CardTitle><Skeleton className="h-8 w-1/2" /></CardTitle></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
                    <Card><CardHeader><CardTitle><Skeleton className="h-8 w-1/2" /></CardTitle></CardHeader><CardContent><Skeleton className="h-36 w-full" /></CardContent></Card>
                </div>
            </div>
        </main>
     </div>
    )
}


export default function StartupProfilePage({ params }: Props) {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadStartup() {
      try {
        setLoading(true);
        const startupData = await getStartupBySlug(params.slug);
        if (!startupData) {
          notFound();
        } else {
          setStartup(startupData);
        }
      } catch (error) {
        console.error("Failed to load startup", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadStartup();
  }, [params.slug]);

  const handleRunAgent = async () => {
    if (!startup) return;
    setIsAgentRunning(true);
    try {
      const result = await findAndVerifyMilestones({ startupName: startup.name });
      const milestoneCount = result.milestones.length;
      toast({
        title: "Agent Finished",
        description: `Found ${milestoneCount} new milestone(s) for ${startup.name}. In a real app, these would be added to the feed for verification.`,
      });
    } catch (error) {
      console.error("Agent failed:", error);
      toast({
        variant: "destructive",
        title: "Agent Error",
        description: "The AI agent encountered an error. Please try again.",
      });
    } finally {
      setIsAgentRunning(false);
    }
  };
  
  if (loading || !startup) {
    return <ProfilePageSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <Image
            src={startup.logo}
            alt={`${startup.name} logo`}
            width={120}
            height={120}
            className="rounded-2xl border-4 border-card"
            data-ai-hint="startup logo"
          />
          <div className="flex-grow pt-2">
            <h1 className="text-5xl font-bold font-headline">{startup.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">{startup.tagline}</p>
            <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{startup.sector}</span>
                </div>
                {/* Add website and social links here if available in data */}
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    <span>{startup.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <Button size="lg" className="mt-2">Claim this profile</Button>
             <Button size="sm" variant="outline" onClick={handleRunAgent} disabled={isAgentRunning}>
                {isAgentRunning ? <Loader2 className="mr-2 animate-spin" /> : <Search className="mr-2" />}
                Find Milestones
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MilestonesFeed milestones={startup.milestones} />
          </div>
          <div className="space-y-8">
            <HeatScoreBreakdown scoreComponents={startup.scoreComponents} />
            <SocialPostGenerator startup={startup} />
          </div>
        </div>
      </main>
    </div>
  );
}
