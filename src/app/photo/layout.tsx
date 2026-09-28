import type { Metadata } from "next"

import { PHOTO_BRAND, photoOgImage } from "@/data/photo"

export const metadata: Metadata = {
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

export default function PhotoLayout({ children }: LayoutProps<"/photo">) {
  return <div className="min-h-full bg-[#070707] text-[#f4ede1]">{children}</div>
}
