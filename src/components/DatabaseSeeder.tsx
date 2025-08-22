
'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { HardDriveUpload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { seedDatabase } from "@/ai/flows/seed-database";
import { useRouter } from "next/navigation";

export function DatabaseSeeder() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSeed = async () => {
        setLoading(true);
        try {
            const result = await seedDatabase();
            if (result.success) {
                toast({
                    title: "Database Seeded!",
                    description: `Successfully seeded ${result.startupCount} startups and ${result.milestoneCount} milestones. The page will now refresh.`,
                });
                router.refresh();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Failed to seed database:", error);
            toast({
                variant: "destructive",
                title: "Seeding Failed",
                description: "Could not seed the database. Please check the logs.",
            });
        } finally {
            setLoading(false);
        }
    }

    // Only show this component in development
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <Button variant="outline" onClick={handleSeed} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <HardDriveUpload />}
            <span className="ml-2">Seed Database</span>
        </Button>
    )
}
