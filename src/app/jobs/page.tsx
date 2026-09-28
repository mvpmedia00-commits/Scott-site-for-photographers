import type { Metadata } from "next"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { jobs } from "@/data/jobs"

export const metadata: Metadata = {
  title: "Jobs",
}

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Open work
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Apply before you network, then use the rooms to follow up.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Chicago’s immediate photographer hiring is concentrated in wedding and
        event studios, plus newsroom freelance from the Headline Club fair.
        Send these applications this weekend so you have something to talk
        about at Filter and on Oct 9.
      </p>
      <Button
        nativeButton={false}
        className="mt-6"
        render={
          <a
            href="https://www.eventbrite.com/e/chicago-media-career-fair-2026-tickets-2000042619314"
            target="_blank"
            rel="noreferrer"
          />
        }
      >
        RSVP to the Oct 9 career fair
      </Button>
      <div className="mt-10 grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-[#c9b8a0]">
        Listings were live on Sept 18, 2026. Studios fill benches quickly. If a
        link 404s, search the employer name plus Chicago photographer.
      </p>
    </div>
  )
}
