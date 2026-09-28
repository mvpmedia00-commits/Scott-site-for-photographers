"use client"

import { useCallback, useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ScanResult, ScoutEvent, SourceStatus } from "@/lib/bot/types"
import { cn } from "@/lib/utils"

const INTERVAL_MS = 15 * 60 * 1000

type Payload = ScanResult & { newFinds: ScoutEvent[] }

export function ScoutBot() {
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [lastLocalScan, setLastLocalScan] = useState<string | null>(null)

  const scan = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/scout${force ? "?force=1" : ""}`, {
        cache: "no-store",
      })
      if (!response.ok) throw new Error(`Scan failed (${response.status})`)
      const json = (await response.json()) as Payload
      setData(json)
      setLastLocalScan(new Date().toISOString())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const kickoff = window.setTimeout(() => {
      void scan(true)
    }, 0)
    const timer = window.setInterval(() => {
      void scan(true)
    }, INTERVAL_MS)
    return () => {
      window.clearTimeout(kickoff)
      window.clearInterval(timer)
    }
  }, [scan])

  async function copyFeed() {
    const url = `${window.location.origin}/api/feed.ics`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-[#1c1814] p-5 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "size-3 rounded-full",
              error ? "bg-[#c8102e]" : "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]"
            )}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9b8a0]">
              {loading ? "Scanning" : error ? "Scan error" : "Watching Chicago"}
            </p>
            <p className="text-sm text-[#e8dcc8]">
              {lastLocalScan
                ? `Last pass ${new Date(lastLocalScan).toLocaleTimeString("en-US", {
                    timeZone: "America/Chicago",
                  })} CT · next pass in 15 minutes`
                : "Opening the sources now"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void scan(true)} disabled={loading}>
            {loading ? "Scanning…" : "Scan now"}
          </Button>
          <Button variant="outline" className="border-white/20" onClick={copyFeed}>
            {copied ? "Copied feed" : "Copy calendar feed"}
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            className="border-white/20"
            render={<a href="/api/feed.ics" />}
          >
            Download .ics
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-[#c9b8a0]">
        <p className="font-medium text-[#f4ede1]">Keep it on your Google Calendar</p>
        <p className="mt-2">
          Google Calendar → Other calendars → From URL → paste the feed. Google
          only pulls public https URLs, so subscribe after you publish the app.
          Until then, download the .ics or leave this page open — Scout
          rescans here every 15 minutes.
        </p>
        <code className="mt-3 block break-all rounded-lg bg-black/30 px-3 py-2 text-xs text-[#e8dcc8]">
          /api/feed.ics
        </code>
      </div>

      {error ? (
        <div className="rounded-2xl border border-[#c8102e]/40 bg-[#c8102e]/10 px-5 py-4 text-[#f4ede1]">
          {error}. Catalog events still show. Retry the scan.
        </div>
      ) : null}

      <section>
        <h2 className="font-heading text-2xl">Sources</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.sources ?? placeholderSources).map((source) => (
            <SourceCard key={source.id} source={source} loading={loading && !data} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl">
          New since the last catalog
          {data ? ` · ${data.liveCount}` : ""}
        </h2>
        {loading && !data ? (
          <div className="mt-4 grid gap-3">
            <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
          </div>
        ) : (data?.newFinds.length ?? 0) === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-white/15 px-5 py-10 text-[#c9b8a0]">
            No extra listings this pass. Scout will keep checking Eventbrite and
            the Chicago photo orgs. The catalog events already on your calendar
            stay in the feed.
          </p>
        ) : (
          <div className="mt-4 grid gap-3">
            {data?.newFinds.map((event) => (
              <ScoutCard key={event.id} event={event} fresh />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-heading text-2xl">
          Full watch list
          {data ? ` · ${data.events.length}` : ""}
        </h2>
        <div className="mt-4 grid gap-3">
          {(data?.events ?? []).slice(0, 40).map((event) => (
            <ScoutCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  )
}

const placeholderSources: SourceStatus[] = [
  { id: "1", name: "Eventbrite · photography", url: "#", ok: true, found: 0 },
  { id: "2", name: "Filter Photo Festival", url: "#", ok: true, found: 0 },
  { id: "3", name: "ASMP Chicago", url: "#", ok: true, found: 0 },
]

function SourceCard({
  source,
  loading,
}: {
  source: SourceStatus
  loading?: boolean
}) {
  return (
    <a
      href={source.url === "#" ? undefined : source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl bg-[#1c1814] p-4 ring-1 ring-white/10"
    >
      <p className="text-sm text-[#f4ede1]">{source.name}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">
        {loading ? "Checking" : source.ok ? `${source.found} hits` : source.error}
      </p>
    </a>
  )
}

function ScoutCard({ event, fresh }: { event: ScoutEvent; fresh?: boolean }) {
  const start = new Date(event.startAt)
  return (
    <article className="rounded-2xl bg-[#1c1814] p-5 ring-1 ring-white/10">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant={event.relevance === "high" ? "secondary" : "outline"}>
          {event.relevance}
        </Badge>
        <Badge variant="outline">{event.source}</Badge>
        {event.inCatalog ? <Badge variant="outline">Already in plan</Badge> : null}
        {fresh ? <Badge>New</Badge> : null}
      </div>
      <h3 className="mt-2 font-heading text-xl">{event.title}</h3>
      <p className="mt-1 text-sm text-[#c9b8a0]">
        {start.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Chicago",
        })}{" "}
        CT · {event.location}
      </p>
      <p className="mt-3 text-sm text-[#e8dcc8]">{event.summary}</p>
      <a
        href={event.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-sm underline-offset-4 hover:underline"
      >
        Open listing
      </a>
    </article>
  )
}
