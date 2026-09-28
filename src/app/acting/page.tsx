import type { Metadata } from "next"
import Link from "next/link"

import { ActingScout } from "@/components/acting-scout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Acting & headshots",
}

export default function ActingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Chicagoland · apply, then stand in the room
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Acting jobs, extra/stand-in days, standing-room rooms, and people who
        will pay for headshots.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Auditions live on Backstage, Actors Access, Casting Networks, and the
        Equity hotline. Extra and stand-in work is Cine-Casting, 4 Star,
        Compass/Bokeh, and Joan Philo’s One Chicago extras pages — you should
        not pay a middleman to be background. “Standing room only” in this town
        is rush/lottery at Broadway in Chicago plus ushering (Steppenwolf, The
        Saints) so you are in the building with other aspiring actors. Models
        and location hosts who pay for pictures are a separate stack: pitch
        them as MVP Media, don’t shoot for exposure. Pitches never send
        themselves.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/desk" />}>
          Score them on the desk
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<Link href="/photo" />}
        >
          Headshot site
        </Button>
      </div>
      <div className="mt-10">
        <ActingScout />
      </div>
    </div>
  )
}
