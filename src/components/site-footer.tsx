"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { PHOTO_EMAIL } from "@/data/photo"
import { STUDIO_EMAIL } from "@/data/studio"

export function SiteFooter({ forceStudio = false }: { forceStudio?: boolean } = {}) {
  const pathname = usePathname()
  const onStudioRoute = pathname.startsWith("/studio")
  if (onStudioRoute && !forceStudio) return null

  if (forceStudio || onStudioRoute) {
    return (
      <footer className="mt-auto border-t border-white/10 bg-[#070707]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#c9b8a0] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 MVP Media · Matthew Phillips · Chicago · 18+</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a className="underline" href={`mailto:${STUDIO_EMAIL}`}>
              {STUDIO_EMAIL}
            </a>
            <Link className="underline" href="/studio/contact">
              Contact
            </Link>
            <Link className="underline" href="/photo">
              Headshots
            </Link>
          </p>
        </div>
      </footer>
    )
  }

  if (pathname.startsWith("/photo")) {
    return (
      <footer className="mt-auto border-t border-white/10 bg-[#070707]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#c9b8a0] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 MVP Media · Matthew Phillips · Chicago</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a className="underline" href={`mailto:${PHOTO_EMAIL}`}>
              {PHOTO_EMAIL}
            </a>
            <Link className="underline" href="/photo/contact">
              Contact
            </Link>
            <Link className="underline" href="/photo/booking">
              Book
            </Link>
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#100e0c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#c9b8a0] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Researched Sept 18, 2026. Listings move. Confirm RSVP pages before you
          travel. Adult travel is 18+ only.
        </p>
        <p className="flex flex-wrap gap-x-4">
          <Link href="/sites" className="underline">
            All sites
          </Link>
          <Link href="/code" className="underline">
            Source code
          </Link>
          <Link href="/photo" className="underline">
            Headshots & portraits
          </Link>
          <Link href="/studio" className="underline">
            Client boudoir site
          </Link>
        </p>
      </div>
    </footer>
  )
}
