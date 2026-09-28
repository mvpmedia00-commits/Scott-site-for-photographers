import type { Metadata } from "next"

import { StudioBookingForm } from "@/components/studio-booking-form"
import { STUDIO_EMAIL } from "@/data/studio"

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Request a private Chicago boudoir or after-dark editorial session with Matthew Phillips. 18+ only.",
}

export default function StudioBookingPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Private inquiry</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Start your session</h1>
        <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
          Share the concept, comfort level, and timeline. I qualify first, then
          send a range and dates. No public calendar. No walk-in studio hours.
        </p>
        <ol className="mt-8 space-y-3 text-[#e8dcc8]">
          <li>1. I read the inquiry.</li>
          <li>2. You get options, a price range, and availability.</li>
          <li>3. We lock scope and a date in writing.</li>
        </ol>
        <p className="mt-8 text-sm text-[#c9b8a0]">
          Direct:{" "}
          <a className="underline" href={`mailto:${STUDIO_EMAIL}`}>
            {STUDIO_EMAIL}
          </a>
        </p>
      </div>
      <StudioBookingForm />
    </div>
  )
}
