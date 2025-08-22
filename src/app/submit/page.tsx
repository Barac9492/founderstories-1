import { MilestoneSubmissionForm } from "@/components/milestone-submission-form"

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <MilestoneSubmissionForm />
    </div>
  )
}

export const metadata = {
  title: "Submit Milestone - FounderStories",
  description: "Share your indie maker journey and inspire other Korean founders",
}