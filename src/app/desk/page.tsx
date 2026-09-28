import type { Metadata } from "next"

import { OpportunityDesk } from "@/components/opportunity-desk"

export const metadata: Metadata = {
  title: "Opportunity desk",
}

export default function DeskPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        Matthew’s desk · paid work first
      </p>
      <h1 className="mt-2 max-w-4xl font-heading text-4xl sm:text-5xl">
        Every listing is scored for getting you paid, credentialed, and in the
        room — not for filling a calendar.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        A $500 event-photography gig outranks a $60 photo walk. Pipelines keep
        jobs, press passes, fashion, boudoir/nude/adult, hotels, and workshops
        from burying each other. Jobs and events still search Chicagoland. A new
        acting scout covers auditions, extra/stand-in days, and SRO/rush/usher
        rooms so you can apply and stand next to other aspiring actors. Paid
        headshots (models and locations) have their own tab. Advertise (free /
        paid) is where to list the boudoir studio, the headshot company, and
        OnlyFans — not the same as clients who pay you. A funding scout covers
        Illinois and Florida grants, charity grants, contests, easy capital, and
        city/state/federal contracts. Luxury house sitting (private homes,
        lodging for care) has its own tab — not a hotel stay. Hotel content stays
        are worldwide. 18+ adult listings stay separate. Pitches are ready to
        copy. Nothing sends until you say so.
      </p>
      <OpportunityDesk />
    </div>
  )
}
