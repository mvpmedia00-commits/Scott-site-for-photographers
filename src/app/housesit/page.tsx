import type { Metadata } from "next"
import Link from "next/link"

import { HouseSitScout } from "@/components/housesit-scout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Luxury house sitting",
}

export default function HouseSitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Private homes · lodging for care
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Luxury homes that want a house sitter — and the few jobs that actually
        pay a caretaker.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        TrustedHousesitters, Nomador, and Luxury House Sitting are where villas
        and waterfront houses list. Florida is dense; Illinois is thinner.
        Almost every sit is unpaid lodging plus pets, not a W-2. If you need a
        paycheck in a luxury house, that is estate staffing (Caretaker Gazette,
        Pavilion, Household Staffing). Hotel content stays stay on the Stay
        tab. Applications never send themselves.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/desk" />}>
          Score them on the desk
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<Link href="/hotels" />}
        >
          Hotel stays
        </Button>
      </div>
      <div className="mt-10">
        <HouseSitScout />
      </div>
    </div>
  )
}
