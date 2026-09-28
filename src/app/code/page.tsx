import type { Metadata } from "next"

import { WebsiteCode } from "@/components/website-code"

export const metadata: Metadata = {
  title: { absolute: "Source code — three websites" },
  description:
    "Download the Next.js source for South Loop Stay, MVP Media portraits, and the 18+ boudoir studio.",
}

export default function CodePage() {
  return <WebsiteCode />
}
