import type { Metadata } from "next"
import Link from "next/link"

import { HotelScout } from "@/components/hotel-scout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Content stays",
}

export default function HotelsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Room for content · worldwide
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Hotel stays for photographers — any city on the map, if you apply like a
        vendor.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        There is no walk-up hotel that comps room and meals for anyone with a
        camera. The working path is worldwide: photographer marketplaces
        (Stayamo, SURŌ, Vayada), chain desks (Loews, Accor, Marriott, Hyatt,
        OYO Frames), and tourism-board media hosting (VisitBritain, Tourism
        Australia). Chicago properties stay on the list because you live there —
        they are not the whole scout. Ask for breakfast as a deliverable. Travel
        stays yours unless the contract says otherwise. Pitches never send
        themselves.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/pitch" />}>
          Write the pitch
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<Link href="/desk" />}
        >
          Score them on the desk
        </Button>
      </div>
      <div className="mt-10">
        <HotelScout />
      </div>
    </div>
  )
}
