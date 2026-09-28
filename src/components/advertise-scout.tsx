"use client"

import { useMemo, useState } from "react"

import { AdvertiseCard } from "@/components/advertise-card"
import { advertiseChannels } from "@/data/advertise"
import type { AdBusiness, AdPrice } from "@/lib/types"

const BUSINESS_FILTERS: { id: "all" | AdBusiness; label: string }[] = [
  { id: "all", label: "All businesses" },
  { id: "boudoir", label: "Boudoir" },
  { id: "headshots", label: "Headshots" },
  { id: "onlyfans", label: "OnlyFans 18+" },
]

const PRICE_FILTERS: { id: "all" | AdPrice; label: string }[] = [
  { id: "all", label: "Free + paid" },
  { id: "free", label: "Free" },
  { id: "freemium", label: "Free + upgrades" },
  { id: "paid", label: "Paid" },
]

function matchesBusiness(
  channel: (typeof advertiseChannels)[number],
  id: "all" | AdBusiness
) {
  return id === "all" || channel.businesses.includes(id)
}

export function AdvertiseScout() {
  const [business, setBusiness] = useState<(typeof BUSINESS_FILTERS)[number]["id"]>("all")
  const [price, setPrice] = useState<(typeof PRICE_FILTERS)[number]["id"]>("all")

  const rows = useMemo(
    () =>
      advertiseChannels.filter((channel) => {
        const businessOk = matchesBusiness(channel, business)
        const priceOk = price === "all" || channel.price === price
        return businessOk && priceOk
      }),
    [business, price]
  )

  const showAdultNote =
    business === "onlyfans" || rows.some((channel) => channel.adultOnly)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {BUSINESS_FILTERS.map((item) => {
          const count =
            item.id === "all"
              ? advertiseChannels.length
              : advertiseChannels.filter((channel) =>
                  matchesBusiness(channel, item.id)
                ).length
          const active = business === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setBusiness(item.id)}
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
        {PRICE_FILTERS.map((item) => {
          const count =
            item.id === "all"
              ? advertiseChannels.filter((channel) =>
                  matchesBusiness(channel, business)
                ).length
              : advertiseChannels.filter(
                  (channel) =>
                    matchesBusiness(channel, business) && channel.price === item.id
                ).length
          const active = price === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPrice(item.id)}
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
      {showAdultNote ? (
        <p className="mt-6 rounded-2xl border border-[#c8102e]/40 bg-[#c8102e]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          OnlyFans rows are 18+ only. Instagram and TikTok as OF funnels are
          listed as ban risk, not as a plan. Photography ads stay on their own
          accounts. Nothing posts until you copy it.
        </p>
      ) : null}
      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-[#1c1814] px-5 py-8 text-[#c9b8a0] ring-1 ring-white/10">
          Nothing in that slice. Switch to All businesses or Free + paid.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {rows.map((channel) => (
            <AdvertiseCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  )
}
