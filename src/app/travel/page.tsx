import type { Metadata } from "next"

import { TravelCircuit } from "@/components/travel-circuit"

export const metadata: Metadata = {
  title: "Nude circuit",
}

export default function TravelPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
        18+ · jobs first · then travel you buy
      </p>
      <h1 className="mt-2 max-w-4xl font-heading text-4xl sm:text-5xl">
        Nude and adult photography travel — get paid as a shooter or as a male
        actor, or buy the circuit when that is how the work is sold.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Paid photographer jobs first (POSED MAG, Jenny Taylor’s US studios,
        destination seconds). Then female-model calls and male-actor work.
        Instagram, X, ModelManagement, AdultFolio, and SexyJobs are listed at
        the bottom because those sites block scrapers. Pay-to-play trips
        (Hecho, Prague Boudoir, Isis) stay last. 18+ with ID. Nothing sends
        itself.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#e2b657]">
        Isis Fashion Awards is accessory fashion with a photographer call time,
        not a nude set. Dan Hecho is art-nude you pay to shoot. Both are listed
        because that is how destination content is actually sold.
      </p>
      <TravelCircuit />
    </div>
  )
}
