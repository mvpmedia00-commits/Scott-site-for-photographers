"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import {
  cloudStill,
  studioGallery,
  studioGalleryCategories,
  type StudioGalleryCategory,
} from "@/data/studio"
import { cn } from "@/lib/utils"

export function StudioGallery() {
  const [category, setCategory] = useState<StudioGalleryCategory>("All")
  const items = useMemo(
    () =>
      category === "All"
        ? studioGallery
        : studioGallery.filter((item) => item.category === category),
    [category]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {studioGalleryCategories.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setCategory(label)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition-colors",
              category === label
                ? "bg-[#f4ede1] text-[#14110e]"
                : "bg-white/5 text-[#e8dcc8] hover:bg-white/10"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-[#c9b8a0]">
          Nothing in this category yet. Try All, or write for a private look
          at unpublished work.
        </p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <figure key={item.id} className="mb-4 break-inside-avoid">
              <Image
                src={cloudStill(item.id, 900)}
                alt={`${item.category} still, MVP Media Chicago`}
                width={900}
                height={1200}
                className="h-auto w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-2 text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">
                {item.category}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
