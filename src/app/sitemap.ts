import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const paths = [
    "/",
    "/desk",
    "/photo",
    "/photo/gallery",
    "/photo/about",
    "/photo/contact",
    "/photo/booking",
    "/studio",
    "/studio/gallery",
    "/studio/about",
    "/studio/contact",
    "/studio/booking",
    "/travel",
    "/hotels",
    "/housesit",
    "/events",
    "/jobs",
    "/acting",
    "/advertise",
    "/funding",
    "/bot",
    "/pitch",
    "/sites",
    "/code",
    "/download",
  ]
  const now = new Date()
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency:
      path.startsWith("/studio") || path.startsWith("/photo") ? "weekly" : "daily",
    priority: path === "/studio" || path === "/photo" || path === "/" ? 1 : 0.7,
  }))
}
