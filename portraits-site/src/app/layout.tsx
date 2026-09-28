import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PHOTO_BRAND, photoOgImage } from "@/data/photo"
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
    default: "MVP Media — Chicago headshots and portraits",
    template: "%s · MVP Media",
  },
  description:
    "Chicago headshots, personal branding, portraits, families, and events with Matthew Phillips. Clean light. Files you can use.",
  applicationName: PHOTO_BRAND,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: PHOTO_BRAND,
    title: "MVP Media — Chicago headshots and portraits",
    description:
      "Corporate headshots, branding, and portraits in Chicago. Book a session with Matthew Phillips.",
    images: [{ url: photoOgImage, width: 1200, height: 1600, alt: "MVP Media headshot" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Media — Chicago headshots and portraits",
    description:
      "Corporate headshots, branding, and portraits in Chicago. Book a session with Matthew Phillips.",
    images: [photoOgImage],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#070707] font-sans text-[#f4ede1]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
