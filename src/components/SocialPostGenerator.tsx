"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import type { Startup } from "@/lib/types";
import { generateSocialMediaPost } from "@/ai/flows/generate-social-media-post";
import { Skeleton } from "./ui/skeleton";

type SocialPostGeneratorProps = {
  startup: Startup;
};

export function SocialPostGenerator({ startup }: SocialPostGeneratorProps) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePost = async () => {
    setLoading(true);
    setPost("");
    try {
      const result = await generateSocialMediaPost({
        startupName: startup.name,
        latestMilestone: startup.latestMilestone.description,
        deltaWeekly:
          startup.deltaWeekly > 0
            ? `We moved up ${startup.deltaWeekly} spots this week!`
            : startup.deltaWeekly < 0
            ? `We dropped ${Math.abs(startup.deltaWeekly)} spots, but we're still fighting!`
            : "Our rank is stable this week.",
        heatScore: startup.heatScore,
      });
      setPost(result.socialMediaPost);
    } catch (error) {
      console.error("Failed to generate social media post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate social media post. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!post) return;
    navigator.clipboard.writeText(post);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share your achievement.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Share Your Win
        </CardTitle>
        <CardDescription>
          Generate a social media post to celebrate your latest milestone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        ) : (
          <Textarea
            readOnly
            value={post || "Click 'Generate Post' to see the magic happen..."}
            className="h-36 resize-none bg-muted/50"
            placeholder="Your generated social media post will appear here."
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleGeneratePost} disabled={loading}>
          {loading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Post
        </Button>
        <Button
          variant="outline"
          onClick={handleCopyToClipboard}
          disabled={!post || loading}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
