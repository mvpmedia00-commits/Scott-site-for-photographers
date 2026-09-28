"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { photoNav } from "@/data/photo"
import { studioNav } from "@/data/studio"
import { cn } from "@/lib/utils"

const plannerLinks = [
  { href: "/sites", label: "Sites" },
  { href: "/download", label: "Code" },
  { href: "/", label: "Plan" },
  { href: "/desk", label: "Desk" },
  { href: "/travel", label: "Circuit" },
  { href: "/hotels", label: "Stay" },
  { href: "/housesit", label: "Sits" },
  { href: "/events", label: "Events" },
  { href: "/bot", label: "Scout" },
  { href: "/jobs", label: "Jobs" },
  { href: "/acting", label: "Acting" },
  { href: "/advertise", label: "Advertise" },
  { href: "/funding", label: "Funding" },
  { href: "/pitch", label: "Pitch kit" },
]

type Chrome = "planner" | "studio" | "photo"

export function SiteHeader({ forceStudio = false }: { forceStudio?: boolean } = {}) {
  const pathname = usePathname()
  const onStudioRoute = pathname.startsWith("/studio")
  if (onStudioRoute && !forceStudio) return null

  const chrome: Chrome = forceStudio || onStudioRoute
    ? "studio"
    : pathname.startsWith("/photo")
      ? "photo"
      : "planner"

  const nav = chrome === "studio" ? studioNav : chrome === "photo" ? photoNav : plannerLinks
  const home = chrome === "studio" ? "/studio" : chrome === "photo" ? "/photo" : "/"
  const brand = chrome === "planner" ? "South Loop Stay" : "MVP Media"
  const tag =
    chrome === "studio"
      ? "Chicago · 18+"
      : chrome === "photo"
        ? "Chicago · portraits"
        : "Chicago · Fall 2026"
  const bookHref = chrome === "studio" ? "/studio/booking" : "/photo/booking"
  const showBook = chrome !== "planner"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/10 backdrop-blur-md",
        chrome === "planner" ? "bg-[#14110e]/80" : "bg-[#070707]/85"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-baseline gap-4">
          <Link href={home} className="flex items-baseline gap-2">
            <span className="font-heading text-xl tracking-tight text-[#f4ede1]">
              {brand}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-[#c9b8a0] sm:inline">
              {tag}
            </span>
          </Link>
          {chrome !== "planner" ? (
            <Link
              href="/sites"
              className="hidden text-xs uppercase tracking-[0.16em] text-[#c4a574] hover:text-[#f4ede1] sm:inline"
            >
              All sites
            </Link>
          ) : null}
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((link) => {
            const active =
              link.href === home
                ? pathname === link.href
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-[#f4ede1] text-[#14110e]"
                    : "text-[#e8dcc8] hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          {showBook ? (
            <Button
              nativeButton={false}
              size="sm"
              className="ml-2 bg-[#c4a574] text-[#14110e] hover:bg-[#d4b98a]"
              render={<Link href={bookHref} />}
            >
              Book consultation
            </Button>
          ) : null}
        </nav>
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-[#f4ede1] md:hidden"
              />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#1c1814] text-[#f4ede1] sm:max-w-xs"
          >
            <SheetHeader>
              <SheetTitle className="font-heading text-[#f4ede1]">
                {brand}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              {showBook ? (
                <Link
                  href={bookHref}
                  className="mt-2 rounded-lg bg-[#c4a574] px-3 py-3 text-center text-base text-[#14110e]"
                >
                  Book consultation
                </Link>
              ) : null}
              {chrome !== "planner" ? (
                <Link href="/sites" className="mt-2 rounded-lg px-3 py-3 text-base hover:bg-white/10">
                  All sites
                </Link>
              ) : null}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
