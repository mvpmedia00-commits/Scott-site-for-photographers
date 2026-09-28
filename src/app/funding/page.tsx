import type { Metadata } from "next"
import Link from "next/link"

import { FundingScout } from "@/components/funding-scout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Grants, contests, and government contracts",
}

export default function FundingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Illinois · Florida · federal boards
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl sm:text-5xl">
        Grants, charity grants, contests, and government contracts for the
        company — Illinois in one section, Florida in the other.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Arts grants (DCASE, Illinois Arts Council, Florida Division of Arts and
        Culture) can fund a project. Community foundations fund nonprofits, not
        an LLC by itself. Contests buy a clip. City, county, and state
        photography work is a bid on BidBuy, Chicago DPS, MyFloridaMarketPlace,
        and SAM.gov. The “easy” programs are free counselors and microloans —
        still not a gift. Applications never send themselves.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/desk" />}>
          Score them on the desk
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<Link href="/advertise" />}
        >
          Advertise scout
        </Button>
      </div>
      <div className="mt-10">
        <FundingScout />
      </div>
    </div>
  )
}
