import type { Startup, Milestone } from "./types";
import { db } from "./firebase";
import { collection, getDocs, query, where, limit, orderBy, getDoc, doc } from "firebase/firestore";

const startupsCollection = collection(db, 'startups');

export const getStartups = async (): Promise<Startup[]> => {
    const snapshot = await getDocs(query(startupsCollection, orderBy("rank")));
    const startups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));
    
    // In a real app, latestMilestone would be handled more efficiently,
    // maybe stored directly on the startup document.
    // For now, we'll fetch it separately for simplicity.
    for (const startup of startups) {
        const milestonesCollection = collection(db, `startups/${startup.id}/milestones`);
        const milestoneSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc"), limit(1)));
        if (!milestoneSnapshot.empty) {
            startup.latestMilestone = { id: milestoneSnapshot.docs[0].id, ...milestoneSnapshot.docs[0].data() } as Milestone;
        }
    }
    return startups;
};

export const getStartupBySlug = async (slug: string): Promise<Startup | undefined> => {
    const q = query(startupsCollection, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return undefined;
    }

    const startupDoc = snapshot.docs[0];
    const startup = { id: startupDoc.id, ...startupDoc.data() } as Startup;

    const milestonesCollection = collection(db, `startups/${startup.id}/milestones`);
    const milestonesSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc")));
    
    startup.milestones = milestonesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Milestone));
    
    if (startup.milestones.length > 0) {
        startup.latestMilestone = startup.milestones[0];
    }

    return startup;
};

export const getTopMovers = async (): Promise<Startup[]> => {
    const q = query(startupsCollection, where("deltaWeekly", ">", 0), orderBy("deltaWeekly", "desc"), limit(3));
    const snapshot = await getDocs(q);
    const startups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));

     for (const startup of startups) {
        const milestonesCollection = collection(db, `startups/${startup.id}/milestones`);
        const milestoneSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc"), limit(1)));
        if (!milestoneSnapshot.empty) {
            startup.latestMilestone = { id: milestoneSnapshot.docs[0].id, ...milestoneSnapshot.docs[0].data() } as Milestone;
        }
    }
    return startups;
}

// This function is now async for consistency, even if it could fetch from a local cache in the future.
export const getStartupOptions = async (): Promise<{id: string, name: string}[]> => {
    const snapshot = await getDocs(query(startupsCollection, orderBy("name")));
    return snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name as string }));
}
