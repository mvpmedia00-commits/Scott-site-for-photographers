import type { Metadata } from "next"

import { PhotoBookingForm } from "@/components/photo-booking-form"
import { PHOTO_EMAIL } from "@/data/photo"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write Matthew Phillips at MVP Media to book Chicago headshots, branding, or portraits.",
}

export default function PhotoContactPage() {
  return (
    <div
      id="contact"
      className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr]"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Contact</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Hire MVP Media.</h1>
        <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
          Email lands with me. If you would rather skip the form, use the
          address below.
        </p>
        <p className="mt-8">
          <a
            className="font-heading text-2xl underline decoration-[#c4a574] underline-offset-4"
            href={`mailto:${PHOTO_EMAIL}`}
          >
            {PHOTO_EMAIL}
          </a>
        </p>
        <ul className="mt-8 space-y-3 text-[#e8dcc8]">
          <li>Chicago and Chicagoland first. On-site teams quoted by headcount.</li>
          <li>Replies include a range and dates — not a public calendar link.</li>
          <li>Need after-dark or boudoir? That lives on a separate 18+ studio.</li>
        </ul>
      </div>
      <PhotoBookingForm />
    </div>
  )
}
