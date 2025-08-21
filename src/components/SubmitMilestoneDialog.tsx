"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const milestoneSchema = z.object({
  milestoneType: z.enum(["funding", "hiring", "expansion", "users", "press"]),
  description: z.string().min(10, "Description must be at least 10 characters.").max(280),
  date: z.date(),
  proofLink: z.string().url("Please enter a valid URL."),
});

type MilestoneFormValues = z.infer<typeof milestoneSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SubmitMilestoneDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const form = useForm<MilestoneFormValues>({
    resolver: zodResolver(milestoneSchema),
  });

  const onSubmit = (data: MilestoneFormValues) => {
    console.log(data);
    toast({
      title: "Milestone Submitted!",
      description: "Your milestone is now pending verification. Thank you!",
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">Submit a Milestone</DialogTitle>
              <DialogDescription>
                Want to climb the leaderboard? Submit your latest achievement for verification.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="milestoneType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Milestone Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a milestone type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="funding">Funding</SelectItem>
                        <SelectItem value="hiring">Hiring</SelectItem>
                        <SelectItem value="expansion">Expansion</SelectItem>
                        <SelectItem value="users">User Growth</SelectItem>
                        <SelectItem value="press">Press Mention</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Raised $45M Series B bridge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proofLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proof Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/press-release" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit for Verification</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
