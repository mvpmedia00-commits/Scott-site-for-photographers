import { catalogScoutEvents } from "@/lib/bot/catalog"
import { markCatalog, mergeEvents, upcomingOnly } from "@/lib/bot/score"
import { fetchSource, SOURCES } from "@/lib/bot/sources"
import type { ScanResult, ScoutEvent } from "@/lib/bot/types"

let cache: { at: number; result: ScanResult } | null = null
const TTL_MS = 20 * 60 * 1000

export async function runScout(options?: { force?: boolean }): Promise<ScanResult> {
  if (!options?.force && cache && Date.now() - cache.at < TTL_MS) {
    return cache.result
  }

  const runs = await Promise.all(
    SOURCES.map((source) =>
      fetchSource(source.id, source.name, source.url, source.parse)
    )
  )

  const live = markCatalog(
    upcomingOnly(mergeEvents(runs.map((run) => run.events)))
  )
  const catalog = upcomingOnly(catalogScoutEvents())
  const events = mergeEvents([catalog, live]).filter((event) => {
    if (event.source === "South Loop catalog") return true
    return event.relevance !== "low"
  })

  const result: ScanResult = {
    scannedAt: new Date().toISOString(),
    sources: runs.map((run) => run.status),
    events,
    liveCount: live.filter((event) => !event.inCatalog).length,
    catalogCount: catalog.length,
  }
  cache = { at: Date.now(), result }
  return result
}

export function latestCache() {
  return cache?.result ?? null
}

export function newFinds(events: ScoutEvent[]) {
  return events.filter(
    (event) => event.source !== "South Loop catalog" && !event.inCatalog
  )
}
