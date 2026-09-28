import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PHOTO_CITY, PHOTO_EMAIL } from "@/data/photo"

export const metadata: Metadata = {
  title: "About",
  description:
    "Matthew Phillips photographs headshots, branding, and portraits in Chicago.",
}

export default function PhotoAboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Image
          src="/photo/chicago-skyline.jpg"
          alt="Chicago skyline at dusk"
          width={900}
          height={1200}
          className="h-auto w-full rounded-3xl object-cover"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Matthew Phillips</p>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
            Chicago photographer. Headshots, portraits, and the pictures companies publish.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#c9b8a0]">
            MVP Media is the studio people hire when the photo has a job: a
            speaker page, a team grid, a personal site, a family wall. I direct
            the session so you are not guessing in front of the camera.
          </p>
          <ul className="mt-8 space-y-3 text-[#e8dcc8]">
            <li>Corporate and actor headshots that still look like you at a glance.</li>
            <li>Brand sets for founders, counsel, and people who sell their face as much as their work.</li>
            <li>Based in {PHOTO_CITY}. On-site teams welcome.</li>
          </ul>
          <p className="mt-8 leading-7 text-[#c9b8a0]">
            Direct:{" "}
            <a className="underline" href={`mailto:${PHOTO_EMAIL}`}>
              {PHOTO_EMAIL}
            </a>
            . I read inquiries myself.
          </p>
          <Button nativeButton={false} className="mt-10" render={<Link href="/booking" />}>
            Start a consultation
          </Button>
        </div>
      </div>
    </div>
  )
}
