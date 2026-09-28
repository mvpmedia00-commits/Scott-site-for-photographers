"use client"

import { useMemo, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { hotels } from "@/data/hotels"
import { HOTEL_REGIONS } from "@/lib/types"

const defaultDeliverables = `In exchange for two nights, I will deliver:
• 30–40 edited stills of the room, common spaces, and one restaurant moment
• 1 Instagram carousel and 1 reel within 7 days of checkout
• 6–8 Stories tagging the property
• Full usage of 10 images on the hotel’s social channels, with photographer credit`

const defaultDates = "Three midweek windows in the next 90 days (I’ll confirm against your occupancy)"
const defaultWhy =
  "I am applying as a photographer who can travel to listed dates. I will pick a property that already sits on a trip so you are not paying my airfare."

export function PitchForm() {
  const openHotels = hotels.filter((item) => item.likelihood !== "Already filled")
  const [name, setName] = useState("Matthew")
  const [instagram, setInstagram] = useState("")
  const [website, setWebsite] = useState("")
  const [dates, setDates] = useState(defaultDates)
  const [why, setWhy] = useState(defaultWhy)
  const [deliverables, setDeliverables] = useState(defaultDeliverables)
  const [hotelId, setHotelId] = useState(openHotels[0]?.id ?? hotels[0].id)
  const [copied, setCopied] = useState(false)

  const hotel = hotels.find((item) => item.id === hotelId) ?? hotels[0]

  const letter = useMemo(() => {
    const who = name.trim() || "[Your name]"
    const ig = instagram.trim() || "[@handle]"
    const site = website.trim() || "[portfolio URL]"
    return `Subject: Photographer content stay — ${hotel.city}, ${hotel.country} — ${dates}

Hello ${hotel.name} team,

My name is ${who}. I am a photographer building hospitality and editorial work, and I would like to propose a hosted stay in exchange for a full content set — not a generic influencer drop-in.

Property / market: ${hotel.city}, ${hotel.country} (${hotel.region})

Why these dates: ${why}

Proposed dates: ${dates}

Portfolio: ${site}
Instagram: ${ig}

${deliverables}

I can work midweek if that is easier on occupancy. I am happy to photograph breakfast or a restaurant service if a meal credit is possible; I know food is rarely included unless we plan it. Airfare stays mine unless you are running a media itinerary.

If a full comp is not available, a photographer rate plus meals for a shoot day still works.

Thank you for reading. I can send a 5-image hospitality sample and a one-page media sheet today.

${who}`
  }, [name, instagram, website, dates, why, deliverables, hotel])

  async function copyLetter() {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <Field label="Your name">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jordan Lee"
            className="h-10 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
        <Field label="Instagram">
          <Input
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            placeholder="@yourhandle"
            className="h-10 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
        <Field label="Portfolio">
          <Input
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder="https://"
            className="h-10 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
        <Field label="Dates to request">
          <Input
            value={dates}
            onChange={(event) => setDates(event.target.value)}
            className="h-10 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
        <Field label="Send this pitch to">
          <select
            value={hotelId}
            onChange={(event) => {
              const nextId = event.target.value
              setHotelId(nextId)
              const next = hotels.find((item) => item.id === nextId)
              if (!next) return
              if (next.region === "Worldwide") {
                setWhy(defaultWhy)
                setDates(defaultDates)
              } else if (next.city === "Chicago") {
                setWhy(
                  "I will be in Chicago and can make a tight hospitality story while I am here — interiors, common spaces, and one restaurant moment."
                )
              } else {
                setWhy(
                  `I can be in ${next.city} on a trip I am already taking. I want to make a hospitality set for this property, not a generic city dump.`
                )
              }
            }}
            className="h-10 w-full rounded-lg border border-white/15 bg-[#1c1814] px-2.5 text-sm text-[#f4ede1]"
          >
            {HOTEL_REGIONS.map((region) => {
              const group = openHotels.filter((item) => item.region === region)
              if (group.length === 0) return null
              return (
                <optgroup key={region} label={region}>
                  {group.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {item.country}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </Field>
        <Field label="Why these dates / this city">
          <Textarea
            value={why}
            onChange={(event) => setWhy(event.target.value)}
            className="min-h-24 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
        <Field label="Deliverables">
          <Textarea
            value={deliverables}
            onChange={(event) => setDeliverables(event.target.value)}
            className="min-h-36 border-white/15 bg-black/20 text-[#f4ede1]"
          />
        </Field>
      </form>
      <div className="space-y-3">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="font-heading text-2xl text-[#f4ede1]">
            Copy this email
          </h2>
          <Button onClick={copyLetter}>
            {copied ? "Copied" : "Copy pitch"}
          </Button>
        </div>
        <pre className="max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-2xl bg-[#1c1814] p-5 text-sm leading-6 text-[#e8dcc8] ring-1 ring-white/10">
          {letter}
        </pre>
        <p className="text-sm text-[#c9b8a0]">
          Stayamo, SURŌ, Vayada, Accor, and OYO: apply on their sites first, then
          paste this as the message to the property. Loews: paste into the US
          stay form. Marriott/Hyatt: send to the regional desk and CC the hotel.
          VisitBritain and Tourism Australia: this is a media-assignment letter,
          not a collab DM. Nothing emails until you copy or send it.
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-[0.18em] text-[#c9b8a0]">
        {label}
      </span>
      {children}
    </label>
  )
}
