import type { Metadata } from "next"

import { PitchForm } from "@/components/pitch-form"

export const metadata: Metadata = {
  title: "Pitch kit",
}

export default function PitchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Content for a key
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Ask for the room like a photographer, not like a guest who wants a free
        minibar.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Hotel stays worldwide. Hotels ignore vague “collab?” DMs. They answer a
        date, a shot list, and usage rights. Fill this in, copy the email, send
        it today. If they will not comp meals, offer a restaurant gallery for
        breakfast. Airfare stays yours unless a tourism board or chain invites
        a press itinerary.
      </p>
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-[#e8dcc8]">
        <li>Lead with 5 hospitality or interior frames, not a wedding dump.</li>
        <li>Give three date windows, including a midweek option.</li>
        <li>Say you will deliver stills they can use, not only Stories.</li>
        <li>Put meals in the same sentence as a food shoot, not as a demand.</li>
      </ul>
      <div className="mt-10">
        <PitchForm />
      </div>
    </div>
  )
}
