"use client"

import { useMemo, useState } from "react"

import { ActingCard } from "@/components/acting-card"
import { actingLeads } from "@/data/acting"
import type { ActingKind } from "@/lib/types"

const FILTERS: { id: "all" | ActingKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "audition", label: "Auditions" },
  { id: "extra", label: "Extra / stand-in" },
  { id: "sro", label: "SRO / rush / usher" },
  { id: "headshot-model", label: "Models paying" },
  { id: "headshot-location", label: "Locations paying" },
]

export function ActingScout() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all")
  const rows = useMemo(
    () =>
      filter === "all" ? actingLeads : actingLeads.filter((lead) => lead.kind === filter),
    [filter]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const count =
            item.id === "all"
              ? actingLeads.length
              : actingLeads.filter((lead) => lead.kind === item.id).length
          const active = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={
                active
                  ? "rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                  : "rounded-full bg-white/5 px-3 py-1.5 text-sm text-[#c9b8a0] ring-1 ring-white/10 hover:bg-white/10"
              }
            >
              {item.label} · {count}
            </button>
          )
        })}
      </div>
      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-[#1c1814] px-5 py-8 text-[#c9b8a0] ring-1 ring-white/10">
          Nothing in that slice yet. Switch to All.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {rows.map((lead) => (
            <ActingCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
