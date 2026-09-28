"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TRAVEL_LANE_LABELS,
  TRAVEL_LANES,
  travelTrips,
  travelWatch,
  type TravelLane,
  type TravelTrip,
} from "@/data/travel"
import { buildPitch } from "@/lib/desk/pitches"
import { loadDeskState } from "@/lib/desk/tracker"
import { cn } from "@/lib/utils"

const TODAY = "2026-09-18"

function isUpcoming(trip: TravelTrip) {
  if (trip.rolling) return true
  const stamp = trip.start || trip.deadline
  if (!stamp) return true
  return stamp >= TODAY
}

function rank(trip: TravelTrip) {
  if (trip.lane === "job" && trip.payCents >= 40000) return 96
  if (trip.lane === "job") return 92
  if (trip.lane === "talent" && trip.payCents >= 40000) return 88
  if (trip.lane === "talent") return 82
  if (trip.lane === "festival" && trip.payCents >= 40000) return 78
  if (trip.lane === "festival") return 70
  const start = trip.start || "2028-01-01"
  const days = Math.max(0, (new Date(start).getTime() - new Date(TODAY).getTime()) / 86400000)
  return Math.max(40, 62 - Math.floor(days / 40))
}

function moneyTone(trip: TravelTrip) {
  if (trip.payCents > 0 && trip.costCents === 0) return "They pay you"
  if (trip.payCents > 0) return "Paid · some cost"
  return "You pay"
}

function formatWindow(trip: TravelTrip) {
  if (trip.rolling) return "Rolling"
  if (trip.start && trip.end && trip.start !== trip.end) {
    return `${trip.start} → ${trip.end}`
  }
  return trip.start || trip.deadline || "Dates TBA"
}

function lodgingLabel(trip: TravelTrip) {
  if (trip.lodging === "included") return "Lodging included"
  if (trip.lodging === "hotel-block") return "Hotel block"
  if (trip.lodging === "trade") return "Lodging possible as trade"
  return "Lodging not included"
}

export function TravelCircuit() {
  const [lane, setLane] = useState<"all" | TravelLane>("all")
  const [role, setRole] = useState<"all" | "photographer" | "talent" | "model">("all")
  const [copied, setCopied] = useState<string | null>(null)

  const rows = useMemo(() => {
    return travelTrips
      .filter(isUpcoming)
      .filter((trip) => (lane === "all" ? true : trip.lane === lane))
      .filter((trip) => {
        if (role === "all") return true
        if (role === "photographer") return trip.role === "photographer" || trip.role === "both"
        if (role === "talent") return trip.role === "talent" || trip.role === "both"
        return trip.role === "model" || trip.role === "both"
      })
      .map((trip) => ({ trip, score: rank(trip) }))
      .sort((a, b) => {
        const laneOrder = { job: 0, talent: 1, festival: 2, retreat: 3 }
        if (a.trip.lane !== b.trip.lane) {
          return laneOrder[a.trip.lane] - laneOrder[b.trip.lane]
        }
        return b.score - a.score || (a.trip.start || "9").localeCompare(b.trip.start || "9")
      })
  }, [lane, role])

  const counts = useMemo(() => {
    const upcoming = travelTrips.filter(isUpcoming)
    return {
      all: upcoming.length,
      job: upcoming.filter((t) => t.lane === "job").length,
      talent: upcoming.filter((t) => t.lane === "talent").length,
      festival: upcoming.filter((t) => t.lane === "festival").length,
      retreat: upcoming.filter((t) => t.lane === "retreat").length,
    }
  }, [])

  async function copyPitch(trip: TravelTrip) {
    const pitch = buildPitch(
      trip.title,
      trip.lane === "talent" ? "adult" : trip.lane === "festival" ? "press" : "adult",
      trip.pitchKind,
      trip.contact,
      `${trip.city}, ${trip.country}`,
      trip.start ? `${trip.start}T12:00:00-05:00` : undefined,
      trip.summary,
      loadDeskState().profile
    )
    await navigator.clipboard.writeText(`Subject: ${pitch.subject}\n\n${pitch.body}`)
    setCopied(trip.id)
    window.setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="mt-10 space-y-8">
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Paid photographer jobs" value={counts.job} hint="Apply these first" />
        <Stat label="Paid models / talent" value={counts.talent} hint="Female models + male actor" />
        <Stat label="Industry events" value={counts.festival} hint="Press, AVN, XBIZ, Isis" />
        <Stat label="Pay-to-shoot travel" value={counts.retreat} hint="Hecho, Tulum, Bali" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip
          active={lane === "all"}
          onClick={() => setLane("all")}
          label={`All · ${counts.all}`}
        />
        {TRAVEL_LANES.map((id) => (
          <Chip
            key={id}
            active={lane === id}
            onClick={() => setLane(id)}
            label={`${TRAVEL_LANE_LABELS[id]} · ${counts[id]}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip active={role === "all"} onClick={() => setRole("all")} label="All roles" />
        <Chip
          active={role === "photographer"}
          onClick={() => setRole("photographer")}
          label="Behind the camera"
        />
        <Chip active={role === "talent"} onClick={() => setRole("talent")} label="Male actor" />
        <Chip active={role === "model"} onClick={() => setRole("model")} label="Female models" />
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-[#c9b8a0]">
          Nothing in this filter. Switch lanes — paid jobs are the default reason this page exists.
        </p>
      ) : (
        <div className="grid gap-4">
          {rows.map(({ trip, score }) => (
            <article
              key={trip.id}
              className="rounded-3xl bg-[#1c1814] p-5 ring-1 ring-white/10 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#e2b657]">
                    {TRAVEL_LANE_LABELS[trip.lane]} · {score}/100
                  </p>
                  <h2 className="mt-1 font-heading text-2xl leading-tight">{trip.title}</h2>
                  <p className="mt-1 text-sm text-[#c9b8a0]">
                    {trip.city}, {trip.country} · {formatWindow(trip)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-white/20",
                      trip.payCents > 0 ? "text-[#e2b657]" : "text-[#c9b8a0]"
                    )}
                  >
                    {moneyTone(trip)}
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-[#c9b8a0]">
                    {trip.role === "both"
                      ? "Photographer + talent"
                      : trip.role === "model"
                        ? "Female model"
                        : trip.role === "talent"
                          ? "Male talent"
                          : "Photographer"}
                  </Badge>
                </div>
              </div>
              <p className="mt-4 leading-7 text-[#e8dcc8]">{trip.summary}</p>
              {trip.honestNote ? (
                <p className="mt-3 text-sm leading-6 text-[#e2b657]">{trip.honestNote}</p>
              ) : null}
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Fact label="You earn" value={trip.payLabel} />
                <Fact label="You pay" value={trip.costLabel} />
                <Fact label="Bed" value={lodgingLabel(trip)} />
                <Fact
                  label="Flights / meals"
                  value={`${trip.flights}${trip.meals ? " · meals on site" : " · meals extra"}`}
                />
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  nativeButton={false}
                  render={<a href={trip.url} target="_blank" rel="noreferrer" />}
                >
                  {trip.nextAction}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20"
                  onClick={() => void copyPitch(trip)}
                >
                  {copied === trip.id ? "Copied" : "Copy pitch"}
                </Button>
                {trip.contact.email ? (
                  <Button
                    nativeButton={false}
                    variant="outline"
                    className="border-white/20"
                    render={<a href={`mailto:${trip.contact.email}`} />}
                  >
                    Mail {trip.contact.name.split(" ")[0]}
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

      <section>
        <h2 className="font-heading text-2xl">Instagram, X, and boards Scout cannot scrape</h2>
        <p className="mt-2 max-w-3xl text-sm text-[#c9b8a0]">
          Destination casts, female-model calls, and most hiring posts live on
          Instagram, X, ModelManagement, AdultFolio, SexyJobs, and PurplePort.
          Open these whenever you want a new fly-out job that is not already on
          this list. 18+ only.
        </p>
        <h3 className="mt-6 text-sm uppercase tracking-[0.16em] text-[#c9b8a0]">
          Social
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {travelWatch
            .filter((item) => item.kind === "social")
            .map((item) => (
              <Button
                key={item.url}
                nativeButton={false}
                variant="outline"
                className="border-white/20"
                render={<a href={item.url} target="_blank" rel="noreferrer" />}
              >
                {item.name}
              </Button>
            ))}
        </div>
        <h3 className="mt-6 text-sm uppercase tracking-[0.16em] text-[#c9b8a0]">
          Job / model boards
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {travelWatch
            .filter((item) => item.kind === "boards")
            .map((item) => (
              <Button
                key={item.url}
                nativeButton={false}
                variant="outline"
                className="border-white/20"
                render={<a href={item.url} target="_blank" rel="noreferrer" />}
              >
                {item.name}
              </Button>
            ))}
        </div>
      </section>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: number
  hint: string
}) {
  return (
    <div className="rounded-2xl bg-[#1c1814] p-4 ring-1 ring-white/10">
      <p className="text-3xl font-heading text-[#f4ede1]">{value}</p>
      <p className="mt-1 text-sm">{label}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">{hint}</p>
    </div>
  )
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition-colors",
        active ? "bg-[#f4ede1] text-[#14110e]" : "bg-white/5 text-[#e8dcc8] hover:bg-white/10"
      )}
    >
      {label}
    </button>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  )
}
