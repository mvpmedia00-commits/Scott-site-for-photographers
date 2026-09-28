"use client"

import { useMemo, useState } from "react"

import { EventCard } from "@/components/event-card"
import { events } from "@/data/events"
import type { CareerFit, EventKind } from "@/lib/types"
import { cn } from "@/lib/utils"

const kinds: Array<"All" | EventKind> = [
  "All",
  "Festival",
  "Hiring",
  "Networking",
  "Exhibition",
  "Workshop",
  "Talk",
]

const fits: Array<"All" | CareerFit> = [
  "All",
  "Get hired",
  "Get shown",
  "Get connected",
  "Skill up",
]

export function EventsExplorer() {
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState<(typeof kinds)[number]>("All")
  const [fit, setFit] = useState<(typeof fits)[number]>("All")
  const [freeOnly, setFreeOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events
      .filter((event) => {
        if (kind !== "All" && event.kind !== kind) return false
        if (fit !== "All" && event.careerFit !== fit) return false
        if (freeOnly && !event.cost.toLowerCase().includes("free")) return false
        if (!q) return true
        const haystack = [
          event.title,
          event.venue,
          event.neighborhood,
          event.why,
          event.howToUse,
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [query, kind, fit, freeOnly])

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-2xl bg-[#1c1814] p-4 ring-1 ring-white/10 sm:p-5">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-[#c9b8a0]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Curator, career fair, Pilsen, free…"
            className="h-10 w-full rounded-lg border border-white/15 bg-black/20 px-3 text-[#f4ede1] outline-none placeholder:text-[#8d7d6a] focus-visible:ring-3 focus-visible:ring-[#f4ede1]/30"
          />
        </label>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#c9b8a0]">
            Type
          </p>
          <div className="flex flex-wrap gap-1.5">
            {kinds.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setKind(item)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  kind === item
                    ? "bg-[#f4ede1] text-[#14110e]"
                    : "bg-white/5 text-[#e8dcc8] hover:bg-white/10"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#c9b8a0]">
            Career use
          </p>
          <div className="flex flex-wrap gap-1.5">
            {fits.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFit(item)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  fit === item
                    ? "bg-[#c8102e] text-white"
                    : "bg-white/5 text-[#e8dcc8] hover:bg-white/10"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#e8dcc8]">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(event) => setFreeOnly(event.target.checked)}
            className="size-4 accent-[#c8102e]"
          />
          Free events only
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 px-6 py-16 text-center">
          <p className="font-heading text-2xl text-[#f4ede1]">
            Nothing matches that cut.
          </p>
          <p className="mt-2 text-[#c9b8a0]">
            Clear the search or switch back to All. Festival week still has more
            than a dozen free rooms you can walk into.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <p className="text-sm text-[#c9b8a0]">
            {filtered.length} event{filtered.length === 1 ? "" : "s"}
          </p>
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
