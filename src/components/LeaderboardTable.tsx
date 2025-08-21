import type { Startup } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type LeaderboardTableProps = {
  startups: Startup[];
};

export function LeaderboardTable({ startups }: LeaderboardTableProps) {
  const DeltaIndicator = ({ delta }: { delta: number }) => {
    if (delta > 0) {
      return (
        <span className="flex items-center text-accent-foreground font-semibold">
          <ArrowUp className="h-4 w-4 mr-1" /> {delta}
        </span>
      );
    }
    if (delta < 0) {
      return (
        <span className="flex items-center text-destructive font-semibold">
          <ArrowDown className="h-4 w-4 mr-1" /> {Math.abs(delta)}
        </span>
      );
    }
    return (
      <span className="flex items-center text-muted-foreground">
        <Minus className="h-4 w-4" />
      </span>
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border shadow-md bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Rank</TableHead>
            <TableHead>Startup</TableHead>
            <TableHead className="hidden lg:table-cell">Latest Milestone</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Δ Weekly</TableHead>
            <TableHead className="w-[150px] text-right">Heat Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {startups.map((startup) => (
            <TableRow key={startup.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="text-center font-bold text-lg">
                <Link href={`/s/${startup.slug}`} className="block w-full h-full">
                  {startup.rank}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/s/${startup.slug}`} className="flex items-center gap-4">
                  <Image
                    src={startup.logo}
                    alt={`${startup.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-md"
                    data-ai-hint="startup logo"
                  />
                  <div className="flex-grow">
                    <div className="font-bold flex items-center gap-2">
                      {startup.name}
                      {startup.rank <= 10 && (
                        <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                          🔥 Top 10
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.sector}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Link href={`/s/${startup.slug}`} className="block w-full h-full">
                  <p className="font-medium truncate max-w-xs">{startup.latestMilestone.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(startup.latestMilestone.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                <Link href={`/s/${startup.slug}`} className="flex items-center justify-center w-full h-full">
                  <DeltaIndicator delta={startup.deltaWeekly} />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/s/${startup.slug}`} className="block w-full h-full">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold">{startup.heatScore}</span>
                  </div>
                  <Progress value={startup.heatScore} className="h-2 mt-1" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
