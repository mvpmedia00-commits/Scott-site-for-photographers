import { catalogScoutEvents } from "@/lib/bot/catalog"
import { normalizeTitle, titlesMatch } from "@/lib/bot/time"
import type { ScoutEvent, ScoutRelevance } from "@/lib/bot/types"

const HIGH = [
  "photograph",
  "photo fest",
  "photo festival",
  "portfolio review",
  "photojournal",
  "newsroom",
  "career fair",
  "asmp",
  "filter photo",
  "fotoworks",
  "headshot",
  "curator",
  "photobook",
  "photo book",
  "photo walk",
  "cyanotype",
  "media career",
  "wedding photographer",
  "staff photographer",
  "creator days",
  "fashion",
  "runway",
  "model call",
  "press pass",
  "media credential",
  "accreditation",
  "grant",
  "fellowship",
  "call for entry",
  "procurement",
  "sam.gov",
  "bidbuy",
  "small business grant",
  "house sitting",
  "trustedhousesitters",
  "caretaker",
  "photographer wanted",
  "hiring photographer",
  "boudoir",
  "nude",
  "erotic",
  "figure drawing",
  "life drawing",
  "fetish",
  "onlyfans",
  "glamour",
  "pinup",
]

const MEDIUM = [
  "exhibition",
  "gallery",
  "opening reception",
  "artist talk",
  "creator",
  "fine art",
  "print",
]

const SKIP = [
  "dog content",
  "r&b soiree",
  "welcome fall meet-up",
  "night off",
]

export function scoreEvent(title: string, summary = ""): ScoutRelevance | null {
  const hay = `${title} ${summary}`.toLowerCase()
  if (SKIP.some((token) => hay.includes(token))) return null
  if (HIGH.some((token) => hay.includes(token))) return "high"
  if (MEDIUM.some((token) => hay.includes(token))) return "medium"
  return null
}

export function markCatalog(events: ScoutEvent[]): ScoutEvent[] {
  const catalog = catalogScoutEvents()
  return events.map((event) => ({
    ...event,
    inCatalog: catalog.some(
      (item) =>
        titlesMatch(item.title, event.title) &&
        item.startAt.slice(0, 10) === event.startAt.slice(0, 10)
    ),
  }))
}

export function mergeEvents(groups: ScoutEvent[][]) {
  const byKey = new Map<string, ScoutEvent>()
  for (const group of groups) {
    for (const event of group) {
      const key = `${normalizeTitle(event.title).slice(0, 48)}|${event.startAt.slice(0, 10)}`
      const existing = byKey.get(key)
      if (!existing) {
        byKey.set(key, event)
        continue
      }
      const preferEvent =
        (!existing.inCatalog && event.inCatalog) ||
        (event.relevance === "high" && existing.relevance !== "high")
      if (preferEvent) byKey.set(key, event)
    }
  }
  return [...byKey.values()].sort((a, b) => a.startAt.localeCompare(b.startAt))
}

export function upcomingOnly(events: ScoutEvent[]) {
  const cutoff = Date.now() - 6 * 60 * 60 * 1000
  return events.filter((event) => new Date(event.endAt).getTime() >= cutoff)
}
