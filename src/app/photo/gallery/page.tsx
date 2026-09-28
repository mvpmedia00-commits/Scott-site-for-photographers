import type { Metadata } from "next"

import { PhotoGallery } from "@/components/photo-gallery"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Headshots, branding, portraits, couples, and event frames from MVP Media in Chicago.",
}

export default function PhotoGalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">Gallery</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
        Headshots, portraits, and rooms that hire.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Lighting and direction samples. Client galleries stay private. Book a
        session and we make the set that is yours.
      </p>
      <div className="mt-10">
        <PhotoGallery />
      </div>
    </div>
  )
}
