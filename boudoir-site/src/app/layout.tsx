import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioGate } from "@/components/studio-gate"
import { STUDIO_BRAND, studioOgImage } from "@/data/studio"
import { siteUrl } from "@/lib/site-url"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#070707] font-sans text-[#f4ede1]">
        <StudioGate>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </StudioGate>
      </body>
    </html>
  )
}
