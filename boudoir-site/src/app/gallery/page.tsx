import type { Metadata } from "next"

import { StudioGallery } from "@/components/studio-gallery"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Boudoir, artistic nude, editorial, and motion stills from MVP Media sessions in Chicago.",
}

export default function StudioGalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c4a574]">18+ gallery</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
        Stills from real sessions.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c9b8a0]">
        Frames pulled from the studio Cloudinary set. Filter by category. Full
        galleries go to clients privately after delivery — this is the public
        cut.
      </p>
      <div className="mt-10">
        <StudioGallery />
      </div>
    </div>
  )
}
