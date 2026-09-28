import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cloudStill, STUDIO_CITY, STUDIO_EMAIL, studioPrep } from "@/data/studio"

export const metadata: Metadata = {
  title: "About",
  description:
    "Matthew Phillips photographs boudoir and after-dark editorial in Chicago. 18+, consent first, files you control.",
}

export default function StudioAboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Image
          src={cloudStill(
            "v1771783064/grok-video-ad3c66dd-7957-4c7b-b49e-afa366007980_fjp7bx",
            900
          )}
          alt="Cinematic still from an MVP Media Chicago session"
          width={900}
          height={1200}
          className="h-auto w-full rounded-3xl object-cover"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Matthew Phillips</p>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
            Chicago photographer. After-dark boudoir and private adult portrait.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#c9b8a0]">
            I built MVP Media for clients who want direction, not a photo booth.
            Every project starts with what you will and will not share, and ends
            with a gallery you control.
          </p>
          <ul className="mt-8 space-y-3 text-[#e8dcc8]">
            <li>Guided posing and pacing — you are not left guessing.</li>
            <li>True-to-life cinematic color that holds up in print and on a phone.</li>
            <li>18+ only. Government ID on file for every person in front of the camera.</li>
            <li>Based in {STUDIO_CITY}. Destination days quoted in writing.</li>
          </ul>
          <p className="mt-8 leading-7 text-[#c9b8a0]">
            Direct:{" "}
            <a className="underline" href={`mailto:${STUDIO_EMAIL}`}>
              {STUDIO_EMAIL}
            </a>
            . I read inquiries myself. No assistant desk. No public calendar.
          </p>
          <Button nativeButton={false} className="mt-10" render={<Link href="/studio/booking" />}>
            Start a consultation
          </Button>
        </div>
      </div>

      <section className="mt-16 border-t border-white/10 pt-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Session prep</p>
        <h2 className="mt-2 font-heading text-4xl">What actually helps before the shoot.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
          The briefing I send before a shoot: wardrobe, ID, and who sees the
          files.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {studioPrep.map((item) => (
            <article key={item.title} className="rounded-3xl bg-[#14110e] p-6 ring-1 ring-white/10">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#c9b8a0]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
