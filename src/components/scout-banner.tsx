"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function ScoutBanner() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    void fetch("/api/scout", { cache: "no-store" })
      .then((response) => response.json())
      .then((json: { liveCount?: number }) => {
        setCount(json.liveCount ?? 0)
      })
      .catch(() => setCount(null))
  }, [])

  return (
    <Link
      href="/desk"
      className="mb-8 flex items-center justify-between gap-4 rounded-2xl bg-[#1c1814] px-5 py-4 ring-1 ring-white/10"
    >
      <span>
        <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400" />
        Scout is watching Chicago listings
        {count == null
          ? "."
          : count === 0
            ? " — no extras this pass."
            : ` — ${count} new find${count === 1 ? "" : "s"} beyond the catalog.`}
      </span>
      <span className="shrink-0 text-sm text-[#e2b657]">Open desk</span>
    </Link>
  )
}
