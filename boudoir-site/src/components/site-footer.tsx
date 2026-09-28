import Link from "next/link"

import { STUDIO_EMAIL } from "@/data/studio"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070707]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#c9b8a0] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2026 MVP Media · Matthew Phillips · Chicago · 18+</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="underline" href={`mailto:${STUDIO_EMAIL}`}>
            {STUDIO_EMAIL}
          </a>
          <Link className="underline" href="/contact">
            Contact
          </Link>
          <Link className="underline" href="/booking">
            Book
          </Link>
        </p>
      </div>
    </footer>
  )
}
