import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Milestone } from "@/lib/types";
import { CheckCircle2, CircleDot, DollarSign, Globe, Newspaper, Users, Link as LinkIcon } from "lucide-react";
import { Badge } from "./ui/badge";

type MilestonesFeedProps = {
  milestones: Milestone[];
};

const MilestoneIcon = ({ type }: { type: Milestone["type"] }) => {
  switch (type) {
    case "funding":
      return <DollarSign className="h-5 w-5 text-primary" />;
    case "expansion":
      return <Globe className="h-5 w-5 text-primary" />;
    case "hiring":
      return <Users className="h-5 w-5 text-primary" />;
    case "press":
      return <Newspaper className="h-5 w-5 text-primary" />;
    case "users":
      return <Users className="h-5 w-5 text-primary" />;
    default:
      return <CircleDot className="h-5 w-5 text-primary" />;
  }
};

export function MilestonesFeed({ milestones }: MilestonesFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start pb-8">
              <div className="absolute left-0 top-1 -translate-x-1/2 h-5 w-5 bg-primary rounded-full flex items-center justify-center ring-4 ring-background">
                <MilestoneIcon type={milestone.type} />
              </div>
              <div className="pl-10 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{milestone.description}</p>
                    <p className="text-sm text-muted-foreground">
                       {new Date(milestone.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                   <Badge variant={milestone.verified ? "secondary" : "outline"} className={milestone.verified ? "bg-accent/30 text-accent-foreground" : ""}>
                    {milestone.verified ? <CheckCircle2 className="w-3 h-3 mr-1.5" /> : null}
                    {milestone.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                 <a href={milestone.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1">
                    View Proof <LinkIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
