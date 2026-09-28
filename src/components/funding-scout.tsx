"use client"

import { useMemo, useState } from "react"

import { FundingCard } from "@/components/funding-card"
import { fundingLeads } from "@/data/funding"
import type { FundingKind, FundingRegion } from "@/lib/types"

const REGION_FILTERS: { id: "all" | FundingRegion; label: string }[] = [
  { id: "all", label: "All regions" },
  { id: "illinois", label: "Illinois" },
  { id: "florida", label: "Florida" },
  { id: "federal", label: "Federal (both)" },
]

const KIND_FILTERS: { id: "all" | FundingKind; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "grant", label: "Grants" },
  { id: "charity", label: "Charity" },
  { id: "contest", label: "Contests" },
  { id: "contract", label: "Gov contracts" },
  { id: "capital", label: "Easy capital" },
]

function matchesRegion(
  lead: (typeof fundingLeads)[number],
  id: "all" | FundingRegion
) {
  if (id === "all") return true
  if (id === "federal") return lead.region === "federal"
  return lead.region === id || lead.region === "federal"
}

function matchesKind(
  lead: (typeof fundingLeads)[number],
  id: "all" | FundingKind
) {
  return id === "all" || lead.kind === id
}

export function FundingScout() {
  const [region, setRegion] = useState<(typeof REGION_FILTERS)[number]["id"]>("all")
  const [kind, setKind] = useState<(typeof KIND_FILTERS)[number]["id"]>("all")

  const rows = useMemo(
    () =>
      fundingLeads.filter(
        (lead) => matchesRegion(lead, region) && matchesKind(lead, kind)
      ),
    [region, kind]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {REGION_FILTERS.map((item) => {
          const count = fundingLeads.filter((lead) =>
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
          const count = fundingLeads.filter(
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
        There is no standing “easy $50k LLC grant.” Charity foundations fund
        nonprofits. SBA and SBDC are the easy first meetings — usually loans,
        not gifts. Government contracts want SAM.gov / BidBuy /
        MyFloridaMarketPlace registration. Grant-mill ads that charge a fee are
        marked. Nothing applies until you submit it.
      </p>
      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-[#1c1814] px-5 py-8 text-[#c9b8a0] ring-1 ring-white/10">
          Nothing in that slice. Switch to All regions or All types.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {rows.map((lead) => (
            <FundingCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
