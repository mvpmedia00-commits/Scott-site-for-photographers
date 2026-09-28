"use client"

import { useMemo, useState } from "react"

import { HouseSitCard } from "@/components/housesit-card"
import { houseSitLeads } from "@/data/housesit"
import type { HouseSitKind, HouseSitRegion } from "@/lib/types"

const REGION_FILTERS: { id: "all" | HouseSitRegion; label: string }[] = [
  { id: "all", label: "All regions" },
  { id: "worldwide", label: "Worldwide" },
  { id: "united-states", label: "United States" },
  { id: "illinois", label: "Illinois" },
  { id: "florida", label: "Florida" },
  { id: "europe", label: "Europe" },
]

const KIND_FILTERS: { id: "all" | HouseSitKind; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "luxury-sit", label: "Luxury sits" },
  { id: "marketplace", label: "Sit boards" },
  { id: "paid-caretaker", label: "Paid caretaker" },
]

function matchesRegion(
  lead: (typeof houseSitLeads)[number],
  id: "all" | HouseSitRegion
) {
  if (id === "all") return true
  if (id === "worldwide") return lead.region === "worldwide"
  if (id === "united-states") {
    return (
      lead.region === "united-states" ||
      lead.region === "illinois" ||
      lead.region === "florida"
    )
  }
  if (id === "illinois" || id === "florida") {
    return (
      lead.region === id ||
      lead.region === "worldwide" ||
      lead.region === "united-states"
    )
  }
  return lead.region === id
}

function matchesKind(
  lead: (typeof houseSitLeads)[number],
  id: "all" | HouseSitKind
) {
  return id === "all" || lead.kind === id
}

export function HouseSitScout() {
  const [region, setRegion] = useState<(typeof REGION_FILTERS)[number]["id"]>("all")
  const [kind, setKind] = useState<(typeof KIND_FILTERS)[number]["id"]>("all")

  const rows = useMemo(
    () =>
      houseSitLeads.filter(
        (lead) => matchesRegion(lead, region) && matchesKind(lead, kind)
      ),
    [region, kind]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {REGION_FILTERS.map((item) => {
          const count = houseSitLeads.filter((lead) =>
            matchesRegion(lead, item.id)
          ).length
          const active = region === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setRegion(item.id)}
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
      <div className="mt-3 flex flex-wrap gap-2">
        {KIND_FILTERS.map((item) => {
          const count = houseSitLeads.filter(
            (lead) => matchesRegion(lead, region) && matchesKind(lead, item.id)
          ).length
          const active = kind === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setKind(item.id)}
              className={
                active
                  ? "rounded-full bg-[#e2b657] px-3 py-1.5 text-sm text-[#14110e]"
                  : "rounded-full bg-white/5 px-3 py-1.5 text-sm text-[#c9b8a0] ring-1 ring-white/10 hover:bg-white/10"
              }
            >
              {item.label} · {count}
            </button>
          )
        })}
      </div>
      <p className="mt-6 rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
        Luxury house sitting is almost never a salary. You get the house; they
        get occupancy and usually pet care. Paid caretaker / house-manager jobs
        are a separate stack (agencies, Caretaker Gazette). This is not the
        hotel content-stay scout. Nothing applies until you submit it.
      </p>
      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-[#1c1814] px-5 py-8 text-[#c9b8a0] ring-1 ring-white/10">
          Nothing in that slice. Switch to All regions or All types.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {rows.map((lead) => (
            <HouseSitCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
