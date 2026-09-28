import {
  chicagoDateTime,
  parseHumanRange,
  parseMonthDayYear,
  scoutId,
} from "@/lib/bot/time"
import type { ScoutEvent } from "@/lib/bot/types"
import { scoreEvent } from "@/lib/bot/score"

function stripTags(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
}

function keep(
  title: string,
  startAt: string,
  endAt: string,
  location: string,
  url: string,
  source: string,
  sourceUrl: string,
  summary = "",
  cost?: string
): ScoutEvent | null {
  const cleanTitle = stripTags(title).replace(/\s+/g, " ").trim()
  if (cleanTitle.length < 6 || cleanTitle.length > 160) return null
  if (/select date|upcoming|month day|events archive|cookie/i.test(cleanTitle)) {
    return null
  }
  const relevance = scoreEvent(cleanTitle, `${summary} ${location}`)
  if (!relevance) return null
  if (new Date(endAt).getFullYear() < 2026) return null
  return {
    id: scoutId(cleanTitle, startAt, url),
    title: cleanTitle,
    startAt,
    endAt,
    location: location || "Chicago, IL",
    url,
    source,
    sourceUrl,
    cost,
    summary: stripTags(summary) || `${cleanTitle} listed on ${source}.`,
    relevance,
    inCatalog: false,
  }
}

export function extractJsonLdEvents(
  html: string,
  source: string,
  sourceUrl: string
) {
  const found: ScoutEvent[] = []
  const blocks = html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1]) as unknown
      const nodes = flattenLd(parsed)
      for (const node of nodes) {
        if (!isRecord(node)) continue
        const types = Array.isArray(node["@type"])
          ? node["@type"]
          : [node["@type"]]
        if (!types.some((type) => String(type).toLowerCase().includes("event"))) {
          continue
        }
        const title = String(node.name || "")
        const start = String(node.startDate || node.startTime || "")
        if (!title || !start) continue
        const end = String(node.endDate || "")
        const url = String(node.url || sourceUrl)
        const location = locationFromLd(node.location)
        const startAt = normalizeIso(start)
        const endAt = end ? normalizeIso(end) : addDefaultEnd(startAt)
        const event = keep(
          title,
          startAt,
          endAt,
          location,
          url,
          source,
          sourceUrl,
          String(node.description || "")
        )
        if (event) found.push(event)
      }
    } catch {
      // ignore broken JSON-LD
    }
  }
  return found
}

export function extractRssEvents(
  xml: string,
  source: string,
  sourceUrl: string
) {
  const found: ScoutEvent[] = []
  const items = xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)
  for (const item of items) {
    const title = stripTags(tag(item[1], "title") || "")
    const link = stripTags(tag(item[1], "link") || sourceUrl)
    const description = stripTags(tag(item[1], "description") || "")
    const pub = tag(item[1], "pubDate") || tag(item[1], "dc:date")
    const when = parseLooseDate(description) || parseLooseDate(pub || "")
    if (!title || !when) continue
    const event = keep(
      title,
      when.startAt,
      when.endAt,
      "Chicago, IL",
      link,
      source,
      sourceUrl,
      description
    )
    if (event) found.push(event)
  }
  return found
}

export function extractEventbriteListings(
  html: string,
  source: string,
  sourceUrl: string
) {
  const found: ScoutEvent[] = []
  const cards = html.matchAll(
    /href="(https:\/\/www\.eventbrite\.com\/e\/[^"]+)"[^>]*>\s*([^<]{8,180})/gi
  )
  for (const card of cards) {
    const url = card[1].split("?")[0]
    const title = stripTags(card[2])
    if (/save this event|share this event/i.test(title)) continue
    const window = html.slice(
      Math.max(0, (card.index || 0) - 400),
      (card.index || 0) + 900
    )
    const when =
      parseEventbriteWhen(stripTags(window)) ||
      parseLooseDate(stripTags(window))
    if (!when) continue
    const locationMatch = stripTags(window).match(
      /([A-Za-z][A-Za-z0-9 .'/&-]{2,40})\s*[·|]\s*([A-Za-z0-9 .,'/&-]{2,60})/
    )
    const location = locationMatch
      ? `${locationMatch[1]}, ${locationMatch[2]}, Chicago, IL`
      : "Chicago, IL"
    const event = keep(title, when.startAt, when.endAt, location, url, source, sourceUrl)
    if (event) found.push(event)
  }
  return unique(found)
}

export function extractAsmpEvents(html: string, sourceUrl: string) {
  const found: ScoutEvent[] = []
  const text = stripTags(html)
  const matches = text.matchAll(
    /([A-Za-z][A-Za-z0-9 .:'-]{6,80}?)\s+([A-Z][a-z]+ \d{1,2})\s+@\s+(\d{1,2}:\d{2}\s*[ap]m)\s*-\s*(\d{1,2}:\d{2}\s*[ap]m)/gi
  )
  for (const match of matches) {
    const date = parseMonthDayYear(match[2].split(" ")[0], match[2].split(" ")[1])
    if (!date) continue
    const range = parseHumanRange(date, `${match[3]} - ${match[4]}`)
    const event = keep(
      match[1].replace(/Roundtable.*/i, "ASMP Chicago Roundtable").trim() ||
        "ASMP Chicago Roundtable",
      range.startAt,
      range.endAt,
      "Chicago, IL",
      sourceUrl,
      "ASMP Chicago",
      sourceUrl,
      "ASMP Chicago professional photographer event."
    )
    if (event) found.push(event)
  }
  if (found.length === 0 && /roundtable/i.test(text) && /september 30/i.test(text)) {
    const range = parseHumanRange("2026-09-30", "1:00 PM - 3:00 PM")
    const event = keep(
      "ASMP Chicago Roundtable",
      range.startAt,
      range.endAt,
      "Pleasant House Pub, 2119 S Halsted, Chicago, IL",
      "https://www.asmp.org/chicago/event/september-30-pleasanthousepub/",
      "ASMP Chicago",
      sourceUrl
    )
    if (event) found.push(event)
  }
  return unique(found)
}

export function extractDatedHeadings(
  html: string,
  source: string,
  sourceUrl: string
) {
  const found: ScoutEvent[] = []
  const headings = html.matchAll(
    /<(h[1-3]|a)[^>]*>([\s\S]*?)<\/\1>/gi
  )
  for (const heading of headings) {
    const title = stripTags(heading[2])
    if (title.length < 8 || title.length > 140) continue
    const nearby = html.slice(
      heading.index || 0,
      (heading.index || 0) + 500
    )
    const when = parseLooseDate(stripTags(nearby))
    if (!when) continue
    const href = nearby.match(/href=["'](https?:\/\/[^"']+)["']/i)
    const event = keep(
      title,
      when.startAt,
      when.endAt,
      "Chicago, IL",
      href?.[1] || sourceUrl,
      source,
      sourceUrl
    )
    if (event) found.push(event)
  }
  return unique(found)
}

function flattenLd(value: unknown, depth = 0): unknown[] {
  if (depth > 6) return []
  if (Array.isArray(value)) return value.flatMap((node) => flattenLd(node, depth + 1))
  if (!isRecord(value)) return [value]
  const nodes: unknown[] = [value]
  if (Array.isArray(value["@graph"])) {
    nodes.push(...flattenLd(value["@graph"], depth + 1))
  }
  if (Array.isArray(value.itemListElement)) {
    nodes.push(...flattenLd(value.itemListElement, depth + 1))
  }
  if (value.item) {
    nodes.push(...flattenLd(value.item, depth + 1))
  }
  return nodes
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object"
}

function locationFromLd(value: unknown): string {
  if (typeof value === "string") return value
  if (!isRecord(value)) return "Chicago, IL"
  const name = String(value.name || "")
  const address = value.address
  if (typeof address === "string") return [name, address].filter(Boolean).join(", ")
  if (isRecord(address)) {
    return [
      name,
      address.streetAddress,
      address.addressLocality,
      address.addressRegion,
    ]
      .filter(Boolean)
      .join(", ")
  }
  return name || "Chicago, IL"
}

function normalizeIso(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return chicagoDateTime(value, 10, 0)
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return chicagoDateTime("2026-09-18", 10, 0)
  return date.toISOString()
}

function addDefaultEnd(startAt: string) {
  const date = new Date(startAt)
  date.setTime(date.getTime() + 2 * 60 * 60 * 1000)
  return date.toISOString()
}

function tag(xml: string, name: string) {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"))
  return match?.[1]
}

function parseEventbriteWhen(text: string) {
  const match = text.match(
    /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{1,2}:\d{2}\s*[AP]M)\b/i
  )
  if (!match) return null
  const date = parseMonthDayYear(match[1], match[2])
  if (!date) return null
  return parseHumanRange(date, match[3])
}

function parseLooseDate(text: string) {
  const full = text.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(2026|2027)?\b/i
  )
  if (full) {
    const date = parseMonthDayYear(full[1], full[2], full[3] || "2026")
    if (!date) return null
    const time = text.match(/\b(\d{1,2}:\d{2}\s*[ap]m(?:\s*-\s*\d{1,2}:\d{2}\s*[ap]m)?)\b/i)
    return parseHumanRange(date, time?.[1] || "10:00 AM")
  }
  const short = parseEventbriteWhen(text)
  if (short) return short
  if (/\btoday\b/i.test(text)) {
    return parseHumanRange("2026-09-18", extractTime(text) || "5:00 PM")
  }
  const weekday = text.match(
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i
  )
  if (weekday) {
    const date = nextWeekday(weekday[1])
    return parseHumanRange(date, extractTime(text) || "6:00 PM")
  }
  return null
}

function extractTime(text: string) {
  return text.match(/\b(\d{1,2}:\d{2}\s*[ap]m)\b/i)?.[1]
}

function nextWeekday(name: string) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]
  const want = days.indexOf(name.toLowerCase())
  const base = new Date("2026-09-18T12:00:00-05:00")
  const delta = (want - base.getDay() + 7) % 7
  base.setDate(base.getDate() + delta)
  return base.toISOString().slice(0, 10)
}

function unique(events: ScoutEvent[]) {
  const map = new Map<string, ScoutEvent>()
  for (const event of events) map.set(event.id, event)
  return [...map.values()]
}
