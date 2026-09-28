import type { Metadata } from "next"
import Link from "next/link"

import { AdvertiseScout } from "@/components/advertise-scout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Advertise boudoir, headshots, OnlyFans",
}

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Where to list the work · free and paid
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Sites that can advertise the boudoir studio, the headshot business, and
        OnlyFans — with the free shelves and the paid ones in the same scout.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        This is not the Paid Headshots tab. That tab is people who pay you to
        shoot. This scout is where you put the businesses in front of strangers:
        Google Business, Maps, Instagram, Reddit, Thumbtack, Google Ads, and the
        18+ boards that actually allow an OnlyFans link. Instagram and TikTok as
        OF funnels are marked ban risk on purpose. Listing copy is ready to copy.
        Nothing posts itself.
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
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<Link href="/studio" />}
        >
          Boudoir site
        </Button>
      </div>
      <div className="mt-10">
        <AdvertiseScout />
      </div>
    </div>
  )
}
