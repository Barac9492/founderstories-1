import type { Founder, Milestone } from "./types";
import { db } from "./firebase-client";
import { collection, getDocs, query, where, limit, orderBy, getDoc, doc } from "firebase/firestore";

const foundersCollection = collection(db, 'founders');

export const getFounders = async (): Promise<Founder[]> => {
    const snapshot = await getDocs(query(foundersCollection, orderBy("rank")));
    const founders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Founder));
    
    for (const founder of founders) {
        const milestonesCollection = collection(db, `founders/${founder.id}/milestones`);
        const milestoneSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc"), limit(1)));
        if (!milestoneSnapshot.empty) {
            founder.latestMilestone = { id: milestoneSnapshot.docs[0].id, ...milestoneSnapshot.docs[0].data() } as Milestone;
        }
    }
    return founders;
};

export const getFounderBySlug = async (slug: string): Promise<Founder | undefined> => {
    const q = query(foundersCollection, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return undefined;
    }

    const founderDoc = snapshot.docs[0];
    const founder = { id: founderDoc.id, ...founderDoc.data() } as Founder;

    const milestonesCollection = collection(db, `founders/${founder.id}/milestones`);
    const milestonesSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc")));
    
    founder.milestones = milestonesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Milestone));
    
    if (founder.milestones.length > 0) {
        founder.latestMilestone = founder.milestones[0];
    }

    return founder;
};

export const getTopMovers = async (): Promise<Founder[]> => {
    const q = query(foundersCollection, where("deltaWeekly", ">", 0), orderBy("deltaWeekly", "desc"), limit(3));
    const snapshot = await getDocs(q);
    const founders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Founder));

     for (const founder of founders) {
        const milestonesCollection = collection(db, `founders/${founder.id}/milestones`);
        const milestoneSnapshot = await getDocs(query(milestonesCollection, orderBy("date", "desc"), limit(1)));
        if (!milestoneSnapshot.empty) {
            founder.latestMilestone = { id: milestoneSnapshot.docs[0].id, ...milestoneSnapshot.docs[0].data() } as Milestone;
        }
    }
    return founders;
}

export const getFounderOptions = async (): Promise<{id: string, name: string}[]> => {
    const snapshot = await getDocs(query(foundersCollection, orderBy("name")));
    return snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name as string }));
}

// Calculate Heat Score based on bootstrap metrics
export const calculateHeatScore = (founder: Founder): number => {
    const { revenue, customers, product, community, partnership, recognition } = founder.scoreComponents;
    
    // Bootstrap-focused scoring algorithm
    const revenueWeight = 0.4;  // Revenue is king for indie makers
    const customersWeight = 0.3; // Customer love matters most
    const productWeight = 0.15;  // Shipping and iteration
    const communityWeight = 0.1;  // Building in public
    const partnershipWeight = 0.03; // Strategic partnerships
    const recognitionWeight = 0.02; // Press and awards (less important)
    
    return Math.round(
        revenue * revenueWeight +
        customers * customersWeight + 
        product * productWeight +
        community * communityWeight +
        partnership * partnershipWeight +
        recognition * recognitionWeight
    );
}

export const getHeatScoreBreakdown = (founder: Founder) => {
    const components = founder.scoreComponents;
    const total = calculateHeatScore(founder);
    
    return {
        total,
        breakdown: [
            { name: 'Revenue', value: components.revenue, description: 'Monthly recurring revenue, sales' },
            { name: 'Customers', value: components.customers, description: 'Customer testimonials, case studies' },
            { name: 'Product', value: components.product, description: 'Launches, features, iterations' },
            { name: 'Community', value: components.community, description: 'Social following, Discord members' },
            { name: 'Partnership', value: components.partnership, description: 'Collaborations, integrations' },
            { name: 'Recognition', value: components.recognition, description: 'Press, awards, mentions' }
        ]
    };
};
