import { MilestoneSubmissionForm } from "@/components/milestone-submission-form"
import { Header } from "@/components/Header"

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MilestoneSubmissionForm />
    </div>
  )
}

export const metadata = {
  title: "Submit Milestone - FounderStories",
  description: "Share your indie maker journey and inspire other Korean founders",
}