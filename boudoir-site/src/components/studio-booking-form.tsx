"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { STUDIO_EMAIL, studioSessions } from "@/data/studio"

export function StudioBookingForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const data = new FormData(event.currentTarget)
    const adult = data.get("adult") === "on"
    if (!adult) {
      setError("Confirm you are 18+ before sending.")
      return
    }
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const session = String(data.get("session") || "").trim()
    const city = String(data.get("city") || "").trim()
    const budget = String(data.get("budget") || "").trim()
    const timeline = String(data.get("timeline") || "").trim()
    const message = String(data.get("message") || "").trim()
    if (!name || !email || !session) {
      setError("Name, email, and session type are required.")
      return
    }
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "not stated"}`,
      `Session: ${session}`,
      `City: ${city || "Chicago"}`,
      `Budget: ${budget || "not stated"}`,
      `Timeline: ${timeline || "flexible"}`,
      "",
      message || "(no extra notes)",
      "",
      "I confirm I am 18+ and everyone photographed will be 18+ with ID.",
    ].join("\n")
    const href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(`Boudoir inquiry — ${session}`)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-[#14110e] p-6 ring-1 ring-[#c4a574]/40">
        <p className="font-heading text-2xl">Your mail app should be open.</p>
        <p className="mt-3 leading-7 text-[#c9b8a0]">
          If it did not open, write {STUDIO_EMAIL} with the same details. I
          review inquiries privately and reply with availability and a range —
          not a public calendar.
        </p>
        <Button className="mt-6" type="button" onClick={() => setSent(false)}>
          Edit the inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-[#14110e] p-6 ring-1 ring-white/10">
      <label className="block text-sm">
        Full name
        <Input name="name" required className="mt-1 bg-black/40" autoComplete="name" />
      </label>
      <label className="block text-sm">
        Email
        <Input name="email" type="email" required className="mt-1 bg-black/40" autoComplete="email" />
      </label>
      <label className="block text-sm">
        Phone (optional)
        <Input name="phone" type="tel" className="mt-1 bg-black/40" autoComplete="tel" />
      </label>
      <label className="block text-sm">
        Session
        <select
          name="session"
          required
          className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-2 text-sm"
          defaultValue="Private boudoir"
        >
          {studioSessions.map((session) => (
            <option key={session.slug}>{session.title}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          City
          <Input name="city" placeholder="Chicago" className="mt-1 bg-black/40" />
        </label>
        <label className="block text-sm">
          Timeline
          <Input name="timeline" placeholder="Next 4–8 weeks" className="mt-1 bg-black/40" />
        </label>
      </div>
      <label className="block text-sm">
        Budget (USD, optional)
        <Input name="budget" type="number" min={0} className="mt-1 bg-black/40" />
      </label>
      <label className="block text-sm">
        What do you want the set to feel like?
        <Textarea name="message" rows={5} className="mt-1 bg-black/40" />
      </label>
      <label className="flex items-start gap-2 text-sm text-[#c9b8a0]">
        <input name="adult" type="checkbox" required className="mt-1" />
        I am 18 or older. Everyone in front of the camera will be 18+ with
        government ID.
      </label>
      {error ? <p className="text-sm text-[#c8102e]">{error}</p> : null}
      <Button type="submit">Request a private quote</Button>
      <p className="text-xs text-[#c9b8a0]">
        Opens email to {STUDIO_EMAIL}. Nothing is stored on this server.
      </p>
    </form>
  )
}
