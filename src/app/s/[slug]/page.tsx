import { getStartupBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MilestonesFeed } from "@/components/MilestonesFeed";
import { HeatScoreBreakdown } from "@/components/HeatScoreBreakdown";
import { SocialPostGenerator } from "@/components/SocialPostGenerator";
import { Globe, Link as LinkIcon, Briefcase } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

export default function StartupProfilePage({ params }: Props) {
  const startup = getStartupBySlug(params.slug);

  if (!startup) {
    notFound();
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
          <Button size="lg" className="mt-2">Claim this profile</Button>
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
