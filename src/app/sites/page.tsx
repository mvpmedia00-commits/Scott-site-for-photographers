import type { Metadata } from "next"

import { SitesHub } from "@/components/sites-hub"

export const metadata: Metadata = {
  title: { absolute: "Sites — South Loop Stay" },
  description:
    "Open South Loop Stay, MVP Media portraits, and the 18+ boudoir studio.",
}

export default function SitesPage() {
  return <SitesHub asPage title="All three websites" />
}
