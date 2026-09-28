import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const paths = ["/", "/gallery", "/about", "/contact", "/booking"]
  const now = new Date()
  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }))
}
