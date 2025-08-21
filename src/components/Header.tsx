"use client";

import { Button } from "@/components/ui/button";
import { SubmitMilestoneDialog } from "@/components/SubmitMilestoneDialog";
import { useState } from "react";
import { Flame } from "lucide-react";

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Flame className="h-6 w-6 mr-2 text-primary" />
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold font-headline text-lg">FounderRank</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button onClick={() => setIsDialogOpen(true)}>
              Submit Milestone
            </Button>
          </div>
        </div>
      </header>
      <SubmitMilestoneDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
