import type { Metadata } from "next"

import { EventsExplorer } from "@/components/events-explorer"
import { ScoutBanner } from "@/components/scout-banner"

export const metadata: Metadata = {
  title: "Events",
}

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Fall 2026 · Chicago
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Every photography room worth walking into.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Start with Filter Photo this week, then the Oct 9 media career fair,
        then FotoWorks in November. Free events are marked. Sold-out tours are
        still listed so you know what you missed.
      </p>
      <div className="mt-10">
        <ScoutBanner />
        <EventsExplorer />
      </div>
    </div>
  )
}
