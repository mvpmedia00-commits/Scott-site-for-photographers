"use client"

import { useMemo, useState } from "react"

import { HotelCard } from "@/components/hotel-card"
import { hotels } from "@/data/hotels"
import { HOTEL_REGIONS, type HotelRegion } from "@/lib/types"

const FILTERS = ["All", ...HOTEL_REGIONS] as const
type Filter = (typeof FILTERS)[number]

export function HotelScout() {
  const [region, setRegion] = useState<Filter>("All")

  const rows = useMemo(
    () =>
      region === "All" ? hotels : hotels.filter((hotel) => hotel.region === region),
    [region]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((id) => {
          const count =
            id === "All"
              ? hotels.length
              : hotels.filter((hotel) => hotel.region === (id as HotelRegion)).length
          const active = region === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setRegion(id)}
              className={
                active
                  ? "rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                  : "rounded-full bg-white/5 px-3 py-1.5 text-sm text-[#c9b8a0] ring-1 ring-white/10 hover:bg-white/10"
              }
            >
              {id} · {count}
            </button>
          )
        })}
      </div>
      {rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-[#1c1814] px-5 py-8 text-[#c9b8a0] ring-1 ring-white/10">
          No listed programs in that region yet. Worldwide marketplaces still
          take dates there — switch to Worldwide or All.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {rows.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  )
}
