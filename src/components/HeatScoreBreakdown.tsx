"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ScoreComponents } from "@/lib/types";

type HeatScoreBreakdownProps = {
  scoreComponents: ScoreComponents;
};

export function HeatScoreBreakdown({ scoreComponents }: HeatScoreBreakdownProps) {
  const chartData = Object.entries(scoreComponents).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const chartConfig = {
    value: {
      label: "Points",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Heat Score Breakdown</CardTitle>
        <CardDescription>
          The formula is simple and public for trust.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <XAxis dataKey="value" type="number" hide />
            <Tooltip cursor={{ fill: "hsl(var(--accent) / 0.3)" }} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
