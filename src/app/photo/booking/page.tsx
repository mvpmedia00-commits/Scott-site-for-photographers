import type { Metadata } from "next"

import { PhotoBookingForm } from "@/components/photo-booking-form"
import { PHOTO_EMAIL } from "@/data/photo"

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Book a Chicago headshot, branding, or portrait session with Matthew Phillips.",
}

export default function PhotoBookingPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Booking</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Start your session</h1>
        <p className="mt-4 text-lg leading-8 text-[#e8dcc8]/90">
          Share the use, headcount, and timeline. I send a range and dates. No
          public calendar. No walk-in studio hours.
        </p>
        <ol className="mt-8 space-y-3 text-[#e8dcc8]">
          <li>1. I read the inquiry.</li>
          <li>2. You get options, a price range, and availability.</li>
          <li>3. We lock wardrobe, location, and a date in writing.</li>
        </ol>
        <p className="mt-8 text-sm text-[#c9b8a0]">
          Direct:{" "}
          <a className="underline" href={`mailto:${PHOTO_EMAIL}`}>
            {PHOTO_EMAIL}
          </a>
        </p>
      </div>
      <PhotoBookingForm />
    </div>
  )
}
