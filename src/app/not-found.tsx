import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">404</p>
      <h1 className="mt-3 font-heading text-4xl">That frame is not on the roll.</h1>
      <p className="mt-4 text-[#c9b8a0]">
        The stay, event, and job lists are still here. Start from the plan.
      </p>
      <Button nativeButton={false} className="mt-8" render={<Link href="/" />}>
        Back to the plan
      </Button>
    </div>
  )
}
