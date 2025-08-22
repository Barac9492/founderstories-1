import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { doc, setDoc, getDoc } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['founderName', 'founderEmail', 'projectName', 'projectTagline', 'milestoneType', 'milestoneDescription', 'milestoneDate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create or update founder document
    const founderSlug = data.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const founderRef = doc(db, 'founders', founderSlug);
    
    // Check if founder already exists
    const existingFounder = await getDoc(founderRef);
    
    const founderData = {
      name: data.founderName,
      slug: founderSlug,
      avatar: `https://placehold.co/100x100/6366f1/ffffff?text=${data.founderName.charAt(0).toUpperCase()}`,
      title: data.title || "Indie Maker",
      project: data.projectName,
      tagline: data.projectTagline,
      location: data.location || "Korea",
      website: data.website || "",
      twitter: data.twitter || "",
      github: data.github || "",
      email: data.founderEmail,
      rank: existingFounder.exists() ? existingFounder.data()?.rank || 999 : 999,
      deltaWeekly: 0,
      heatScore: 50, // Default heat score
      monthlyRevenue: data.monthlyRevenue ? parseInt(data.monthlyRevenue) : 0,
      foundedDate: new Date().toISOString().split('T')[0],
      isBootstrapped: data.isBootstrapped || true,
      scoreComponents: {
        revenue: data.milestoneType === 'revenue' ? 20 : 10,
        customers: data.milestoneType === 'customers' ? 20 : 10,
        product: data.milestoneType === 'product' ? 20 : 10,
        community: data.milestoneType === 'community' ? 20 : 10,
        partnership: data.milestoneType === 'partnership' ? 20 : 10,
        recognition: data.milestoneType === 'recognition' ? 20 : 10,
      },
      updatedAt: new Date().toISOString()
    };

    // Save founder data
    await setDoc(founderRef, founderData, { merge: true });

    // Create milestone document
    const milestoneRef = doc(db, `founders/${founderSlug}/milestones`, `milestone-${Date.now()}`);
    const milestoneData = {
      type: data.milestoneType,
      description: data.milestoneDescription,
      date: data.milestoneDate,
      verified: false, // Manual verification needed
      link: data.milestoneLink || "",
      value: data.milestoneValue ? parseInt(data.milestoneValue) : null,
      submittedAt: new Date().toISOString(),
      isPublic: data.isPublic || true
    };

    await setDoc(milestoneRef, milestoneData);

    return NextResponse.json({
      success: true,
      message: 'Milestone submitted successfully!',
      founderSlug: founderSlug
    });

  } catch (error) {
    console.error('Error submitting milestone:', error);
    return NextResponse.json(
      { error: 'Failed to submit milestone. Please try again.' },
      { status: 500 }
    );
  }
}