import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import {
  PHOTO_EMAIL,
  photoFaqs,
  photoHero,
  photoProcess,
  photoSessions,
} from "@/data/photo"
import { siteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: { absolute: "MVP Media — Chicago headshots and portraits" },
}

export default function PhotoHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographBusiness",
    name: "MVP Media",
    image: photoHero.src,
    url: siteUrl(),
    email: PHOTO_EMAIL,
    areaServed: "Chicago, IL",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
    founder: { "@type": "Person", name: "Matthew Phillips" },
    description:
      "Chicago headshots, personal branding, portraits, couples, and event photography.",
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={photoHero.src}
          alt={photoHero.alt}
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/55 to-[#070707]/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#c4a574]">
            Chicago · headshots · portraits
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[1.05] sm:text-7xl">
            Sharp. Human. Booked.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#e8dcc8]">
            Headshots, branding, and portraits with Matthew Phillips. Light that
            reads as expensive. Files you can actually put on a site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/booking" />} size="lg">
              Book a session
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="border-white/20 bg-black/30"
              render={<Link href="/gallery" />}
            >
              View gallery
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Sessions</p>
        <h2 className="mt-2 font-heading text-4xl">What companies and people hire.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {photoSessions.map((session) => (
            <article key={session.slug} className="rounded-3xl bg-[#14110e] p-6 ring-1 ring-white/10">
              <h3 className="font-heading text-2xl">{session.title}</h3>
              <p className="mt-3 leading-7 text-[#c9b8a0]">{session.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#100e0c]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Process</p>
            <h2 className="mt-2 font-heading text-4xl">Brief to delivery</h2>
            <ol className="mt-6 space-y-4 text-[#e8dcc8]">
              {photoProcess.map((item) => (
                <li key={item.step}>
                  <strong className="text-[#c4a574]">{item.step} </strong>
                  {item.title} — {item.body}
                </li>
              ))}
            </ol>
          </div>
          <Image
            src="/photo/headshot-corporate.jpg"
            alt="Corporate headshot in window light"
            width={1100}
            height={1400}
            className="h-full min-h-72 w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Location</p>
            <h2 className="mt-2 font-heading text-4xl">Chicago first. On site when the office is the set.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#c9b8a0]">
              Loop, South Loop, River North, and the suburbs. I come to your
              office for team grids. Destination days are quoted, not assumed.
            </p>
            <Button nativeButton={false} className="mt-8" render={<Link href="/booking" />}>
              Request a quote
            </Button>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Use</p>
            <h2 className="mt-2 font-heading text-4xl">Pictures that survive a website.</h2>
            <ul className="mt-6 space-y-3 text-[#e8dcc8]">
              <li>LinkedIn and speaker pages that still look like you at 80px.</li>
              <li>Color that holds in print, not just a phone screen.</li>
              <li>A usage note in writing so marketing can actually publish.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Questions</p>
          <h2 className="mt-2 font-heading text-4xl">Before you write.</h2>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {photoFaqs.map((item) => (
              <div key={item.q} className="rounded-3xl bg-[#14110e] p-6 ring-1 ring-white/10">
                <dt className="font-heading text-xl">{item.q}</dt>
                <dd className="mt-3 leading-7 text-[#c9b8a0]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#100e0c]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Contact</p>
            <h2 className="mt-2 font-heading text-4xl">Hire the studio.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#c9b8a0]">
              {PHOTO_EMAIL} — or the form. I reply with a range and dates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button nativeButton={false} render={<a href={`mailto:${PHOTO_EMAIL}`} />}>
              Email Matthew
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              className="border-white/20"
              render={<Link href="/contact" />}
            >
              Open contact form
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
