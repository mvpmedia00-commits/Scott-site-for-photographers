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
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070707]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-heading text-xl tracking-tight text-[#f4ede1]">MVP Media</span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-[#c9b8a0] sm:inline">
            Chicago · portraits
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {photoNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
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
          <Button
            nativeButton={false}
            size="sm"
            className="ml-2 bg-[#c4a574] text-[#14110e] hover:bg-[#d4b98a]"
            render={<Link href="/booking" />}
          >
            Book consultation
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="text-[#f4ede1] md:hidden" />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#1c1814] text-[#f4ede1] sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="font-heading text-[#f4ede1]">MVP Media</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {photoNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="mt-2 rounded-lg bg-[#c4a574] px-3 py-3 text-center text-base text-[#14110e]"
              >
                Book consultation
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
