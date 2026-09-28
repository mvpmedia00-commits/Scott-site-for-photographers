import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { cloudStill, STUDIO_EMAIL, studioFaqs, studioHero, studioProcess, studioSessions } from "@/data/studio"

export const metadata: Metadata = {
  title: { absolute: "MVP Media — Chicago boudoir" },
}

export default function StudioHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MVP Media",
    image: cloudStill(
      "v1771784294/grok-video-a77ba723-ed82-47fb-a44c-da394706ef53_zsw8ku",
      1200
    ),
    url: "/",
    email: STUDIO_EMAIL,
    areaServed: "Chicago, IL",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Matthew Phillips",
    },
    description:
      "Chicago boudoir, artistic nude, and after-dark editorial photography. 18+ only.",
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[78vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={studioHero.poster}
        >
          <source src={studioHero.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/55 to-[#070707]/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#c4a574]">
            Chicago · 18+ · discreet
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[1.05] sm:text-7xl">
            Bold. Intimate. Cinematic.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#e8dcc8]">
            Boudoir, artistic nude, and after-dark editorial with Matthew
            Phillips. Private production, consent first, files you control.
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
        <h2 className="mt-2 font-heading text-4xl">Choose the work you want made.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {studioSessions.map((session) => (
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
            <h2 className="mt-2 font-heading text-4xl">Consultation to delivery</h2>
            <ol className="mt-6 space-y-4 text-[#e8dcc8]">
              {studioProcess.map((item) => (
                <li key={item.step}>
                  <strong className="text-[#c4a574]">{item.step} </strong>
                  {item.title} — {item.body}
                </li>
              ))}
            </ol>
          </div>
          <Image
            src={cloudStill(
              "v1771784294/grok-video-a77ba723-ed82-47fb-a44c-da394706ef53_zsw8ku",
              1100
            )}
            alt="Cinematic studio lighting still from an MVP Media session"
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
            <h2 className="mt-2 font-heading text-4xl">
              Chicago first. Destination when it earns the ticket.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#c9b8a0]">
              Sessions are based in Chicago and the Chicagoland metro. Travel is
              quoted, not assumed. If the concept needs a hotel, a coast, or a
              villa, we write that into the agreement first.
            </p>
            <Button nativeButton={false} className="mt-8" render={<Link href="/booking" />}>
              Request a private quote
            </Button>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Confidential</p>
            <h2 className="mt-2 font-heading text-4xl">You decide what leaves the room.</h2>
            <ul className="mt-6 space-y-3 text-[#e8dcc8]">
              <li>Private consultation and written boundaries before production.</li>
              <li>Small set. No surprise assistants. No public studio hours.</li>
              <li>Secure delivery. Publishing only with your approval.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Questions</p>
          <h2 className="mt-2 font-heading text-4xl">Before you write.</h2>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {studioFaqs.map((item) => (
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
            <h2 className="mt-2 font-heading text-4xl">Start with a private note.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#c9b8a0]">
              {STUDIO_EMAIL} — or the form. I reply with a range and dates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button nativeButton={false} render={<a href={`mailto:${STUDIO_EMAIL}`} />}>
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
