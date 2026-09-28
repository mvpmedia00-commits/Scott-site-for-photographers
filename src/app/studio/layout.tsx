import type { Metadata } from "next"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioGate } from "@/components/studio-gate"
import { STUDIO_BRAND, studioOgImage } from "@/data/studio"

export const metadata: Metadata = {
  title: {
    default: "MVP Media — Chicago boudoir",
    template: "%s · MVP Media",
  },
  description:
    "Chicago boudoir, artistic nude, and after-dark editorial with Matthew Phillips. 18+, discreet, destination on request.",
  applicationName: STUDIO_BRAND,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: STUDIO_BRAND,
    title: "MVP Media — Chicago boudoir",
    description:
      "Private boudoir, artistic nude, and after-dark editorial in Chicago. 18+ only.",
    images: [{ url: studioOgImage, width: 1200, height: 800, alt: "MVP Media session still" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Media — Chicago boudoir",
    description:
      "Private boudoir, artistic nude, and after-dark editorial in Chicago. 18+ only.",
    images: [studioOgImage],
  },
}

export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return (
    <div className="min-h-full bg-[#070707] text-[#f4ede1]">
      <StudioGate>
        <SiteHeader forceStudio />
        {children}
        <SiteFooter forceStudio />
      </StudioGate>
    </div>
  )
}
