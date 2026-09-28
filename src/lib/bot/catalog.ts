import { events } from "@/data/events"
import { eachDate, parseHumanRange, scoutId } from "@/lib/bot/time"
import type { ScoutEvent } from "@/lib/bot/types"

export function catalogScoutEvents(): ScoutEvent[] {
  const found: ScoutEvent[] = []

  for (const event of events) {
    const dates = eachDate(event.start, event.end)
    const expand =
      dates.length > 1 && /daily|two-day|weekend/i.test(event.time)
    const useDates = expand ? dates : [event.start]

    for (const date of useDates) {
      const range = parseHumanRange(date, event.time)
      found.push({
        id: scoutId(event.title, range.startAt, event.url),
        title: event.title,
        startAt: range.startAt,
        endAt: range.endAt,
        location: `${event.venue}, ${event.address}`,
        url: event.url,
        source: "South Loop catalog",
        sourceUrl: "/events",
        cost: event.cost,
        summary: event.why,
        relevance: "high",
        inCatalog: true,
      })
    }
  }

  return found
}
