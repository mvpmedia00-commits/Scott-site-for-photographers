"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const KEY = "mvp-studio-18"

export function StudioGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [left, setLeft] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAllowed(window.sessionStorage.getItem(KEY) === "yes")
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  if (allowed === null) {
    return (
      <div className="min-h-screen bg-[#070707]" aria-busy="true" aria-label="Checking age gate" />
    )
  }

  if (left) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c4a574]">MVP Media</p>
        <h1 className="mt-4 font-heading text-4xl">This studio is 18+.</h1>
        <p className="mt-4 leading-7 text-[#c9b8a0]">You can close this tab.</p>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c4a574]">MVP Media</p>
        <h1 className="mt-4 font-heading text-4xl">This studio is 18+</h1>
        <p className="mt-4 leading-7 text-[#c9b8a0]">
          Boudoir, artistic nude, and after-dark editorial. Confirm you are 18
          or older to enter. Everyone photographed must present government ID.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => {
              window.sessionStorage.setItem(KEY, "yes")
              setAllowed(true)
            }}
          >
            I am 18 or older
          </Button>
          <Button variant="outline" className="border-white/20" onClick={() => setLeft(true)}>
            Leave
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
