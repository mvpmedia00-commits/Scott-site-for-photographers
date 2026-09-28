import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
    default: "South Loop Stay — Chicago photographer week",
    template: "%s · South Loop Stay",
  },
  description:
    "Scored photography opportunities: paid jobs, press credentials, worldwide hotel content stays, and a daily action brief.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#14110e] font-sans text-[#f4ede1]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
