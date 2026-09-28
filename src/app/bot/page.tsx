import type { Metadata } from "next"

import { ScoutBot } from "@/components/scout-bot"

export const metadata: Metadata = {
  title: "Scout bot",
}

export default function BotPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Always on
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Scout keeps looking for Chicago photography rooms, acting jobs,
        worldwide hotel stays, places to advertise the boudoir studio, the
        headshot company, and OnlyFans, plus Illinois and Florida funding and
        luxury house-sitting boards.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Every 15 minutes while this page is open, and every 6 hours after you
        deploy, Scout rechecks Eventbrite, Filter Photo, ASMP, APA, museums,
        Choose Chicago, worldwide hotel-stay news, and Chicagoland acting /
        extra / headshot feeds (Eventbrite auditions, One Chicago extras, models
        paying for digitals), plus news about photography listings, OnlyFans
        promotion, Illinois/Florida grants, government photography contracts, and
        luxury house sitting / caretaker jobs. The{" "}
        <a className="underline" href="/desk">
          opportunity desk
        </a>{" "}
        scores every find 0–100 and writes a pitch you still have to send
        yourself. Subscribe to the live calendar feed so new finds keep landing
        next to events already on your Google Calendar. Destination nude and
        adult work lives on the{" "}
        <a className="underline" href="/travel">
          nude circuit
        </a>
        : paid photographer jobs and male-actor calls first, then Dan Hecho /
        Isis-style travel you buy.
      </p>
      <ScoutBot />
    </div>
  )
}
