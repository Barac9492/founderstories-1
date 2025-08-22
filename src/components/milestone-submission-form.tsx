"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle2, Upload, Globe, Twitter, Github, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const milestoneTypes = [
  { value: "revenue", label: "Revenue Milestone", description: "Monthly recurring revenue, sales target hit" },
  { value: "customers", label: "Customer Milestone", description: "New customers, testimonials, case studies" },
  { value: "product", label: "Product Milestone", description: "Feature launch, product update, new release" },
  { value: "community", label: "Community Milestone", description: "Social media growth, Discord members, following" },
  { value: "partnership", label: "Partnership Milestone", description: "Integrations, collaborations, strategic partnerships" },
  { value: "recognition", label: "Recognition Milestone", description: "Press coverage, awards, industry mentions" }
]

export function MilestoneSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [founderSlug, setFounderSlug] = useState<string>("")
  const [formData, setFormData] = useState({
    // Founder info
    founderName: "",
    founderEmail: "",
    projectName: "",
    projectTagline: "",
    website: "",
    twitter: "",
    github: "",
    location: "",
    
    // Milestone details
    milestoneType: "",
    milestoneDescription: "",
    milestoneDate: "",
    milestoneValue: "",
    milestoneLink: "",
    milestoneProof: null as File | null,
    
    // Additional context
    monthlyRevenue: "",
    isBootstrapped: true,
    isPublic: true,
    agreeToTerms: false
  })

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/submit-milestone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setFounderSlug(result.founderSlug)
        setSubmitted(true)
      } else {
        setError(result.error || 'Failed to submit milestone')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Milestone Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for sharing your journey! Your milestone has been saved and will appear on the leaderboard soon.
          </p>
          {founderSlug && (
            <p className="text-sm text-muted-foreground mb-4">
              Your founder profile: <Link href={`/f/${founderSlug}`} className="text-primary hover:underline">founderstories.dev/f/{founderSlug}</Link>
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setSubmitted(false)}>
              Submit Another Milestone
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                View Leaderboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Share Your Milestone</h1>
          <p className="text-muted-foreground">
            Every milestone matters. Share your progress and inspire other Korean indie makers.
          </p>
        </div>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Founder Information */}
        <Card>
          <CardHeader>
            <CardTitle>Founder Information</CardTitle>
            <CardDescription>
              Tell us about yourself and your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="founderName">Your Name *</Label>
                <Input
                  id="founderName"
                  value={formData.founderName}
                  onChange={(e) => handleInputChange("founderName", e.target.value)}
                  placeholder="김창업"
                  required
                />
              </div>
              <div>
                <Label htmlFor="founderEmail">Email Address *</Label>
                <Input
                  id="founderEmail"
                  type="email"
                  value={formData.founderEmail}
                  onChange={(e) => handleInputChange("founderEmail", e.target.value)}
                  placeholder="kim@myproject.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName">Project/Product Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange("projectName", e.target.value)}
                  placeholder="MyAwesomeApp"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Seoul, Korea"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectTagline">Project Tagline *</Label>
              <Input
                id="projectTagline"
                value={formData.projectTagline}
                onChange={(e) => handleInputChange("projectTagline", e.target.value)}
                placeholder="AI-powered tool that helps Korean students learn English"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://myproject.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="twitter">Twitter/X</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    placeholder="@myhandle"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                    placeholder="github.com/username"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestone Details */}
        <Card>
          <CardHeader>
            <CardTitle>Milestone Details</CardTitle>
            <CardDescription>
              Share the specific achievement you want to celebrate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="milestoneType">Milestone Type *</Label>
              <Select value={formData.milestoneType} onValueChange={(value) => handleInputChange("milestoneType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select milestone type" />
                </SelectTrigger>
                <SelectContent>
                  {milestoneTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="milestoneDescription">Milestone Description *</Label>
              <Textarea
                id="milestoneDescription"
                value={formData.milestoneDescription}
                onChange={(e) => handleInputChange("milestoneDescription", e.target.value)}
                placeholder="Hit $5K MRR after 8 months of building in public..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="milestoneDate">Achievement Date *</Label>
                <Input
                  id="milestoneDate"
                  type="date"
                  value={formData.milestoneDate}
                  onChange={(e) => handleInputChange("milestoneDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="milestoneValue">Value (if applicable)</Label>
                <Input
                  id="milestoneValue"
                  value={formData.milestoneValue}
                  onChange={(e) => handleInputChange("milestoneValue", e.target.value)}
                  placeholder="5000 (for $5K MRR)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="milestoneLink">Supporting Link</Label>
              <Input
                id="milestoneLink"
                value={formData.milestoneLink}
                onChange={(e) => handleInputChange("milestoneLink", e.target.value)}
                placeholder="Twitter post, blog article, or website showing this milestone"
              />
            </div>

            <div>
              <Label htmlFor="milestoneProof">Proof/Screenshot (Optional)</Label>
              <div className="mt-2">
                <Input
                  id="milestoneProof"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleInputChange("milestoneProof", e.target.files?.[0] || null)}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Revenue screenshots, customer testimonials, or analytics data (kept private)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Context */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Context</CardTitle>
            <CardDescription>
              Help us understand your journey better
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="monthlyRevenue">Current Monthly Revenue (Optional)</Label>
              <Input
                id="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                placeholder="5000 (in USD)"
              />
              <p className="text-sm text-muted-foreground mt-1">
                This helps us understand your current scale. Won't be shared publicly unless you choose to.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isBootstrapped"
                checked={formData.isBootstrapped}
                onCheckedChange={(checked) => handleInputChange("isBootstrapped", checked as boolean)}
              />
              <Label htmlFor="isBootstrapped">This is a bootstrapped/self-funded project</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleInputChange("isPublic", checked as boolean)}
              />
              <Label htmlFor="isPublic">I'm comfortable sharing this milestone publicly</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                required
              />
              <Label htmlFor="agreeToTerms">
                I agree to the Terms of Service and understand this milestone may be featured on FounderStories *
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>What happens next:</strong> We'll review your milestone and add it to your founder profile. 
            You'll get access to our Korean indie maker community, potential customer introductions, and 
            a chance to be featured in our weekly founder spotlight.
          </AlertDescription>
        </Alert>

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={isSubmitting || !formData.agreeToTerms}
        >
          {isSubmitting ? "Submitting..." : "Submit Milestone"}
        </Button>
      </form>
    </div>
  )
}