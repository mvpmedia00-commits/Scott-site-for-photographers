import { createHash } from "node:crypto"

export function scoutId(title: string, startAt: string, url: string) {
  return `scout-${createHash("sha1")
    .update(`${title.trim().toLowerCase()}|${startAt.slice(0, 10)}|${url}`)
    .digest("hex")
    .slice(0, 12)}`
}

export function chicagoOffset(dateStr: string): "-05:00" | "-06:00" {
  return dateStr >= "2026-03-08" && dateStr < "2026-11-01" ? "-05:00" : "-06:00"
}

export function chicagoDateTime(
  dateStr: string,
  hours: number,
  minutes: number
) {
  const hh = String(hours).padStart(2, "0")
  const mm = String(minutes).padStart(2, "0")
  return `${dateStr}T${hh}:${mm}:00${chicagoOffset(dateStr)}`
}

export function addHours(iso: string, hours: number) {
  const date = new Date(iso)
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  return date.toISOString()
}

export function pad(value: number) {
  return String(value).padStart(2, "0")
}

const MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
}

export function parseMonthDayYear(
  month: string,
  day: string,
  year = "2026"
) {
  const m = MONTHS[month.toLowerCase().replace(".", "")]
  if (!m) return null
  return `${year}-${pad(m)}-${pad(Number(day))}`
}

export function toMinutes(hours: number, minutes: number, meridiem?: string) {
  let h = hours % 12
  if ((meridiem || "").toLowerCase().startsWith("p") && hours !== 12) h += 12
  if ((meridiem || "").toLowerCase().startsWith("a") && hours === 12) h = 0
  if (!meridiem && hours === 24) h = 0
  return h * 60 + minutes
}

export function parseClock(value: string) {
  const match = value
    .trim()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?$/i)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2] || 0)
  const meridiem = match[3]
  return toMinutes(hours, minutes, meridiem)
}

export function parseHumanRange(dateStr: string, time: string) {
  const cleaned = time
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\(.*?\)/g, "")
    .trim()

  const range = cleaned.match(
    /(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)/i
  )
  if (range) {
    let startClock = parseClock(range[1])
    const endClock = parseClock(range[2])
    if (startClock == null || endClock == null) return fallback(dateStr)
    if (!/a\.?m\.?|p\.?m\.?/i.test(range[1]) && /p\.?m\.?/i.test(range[2])) {
      startClock = toMinutes(Math.floor(startClock / 60), startClock % 60, "pm")
      if (startClock > endClock) {
        startClock = toMinutes(
          Math.floor(startClock / 60) - 12,
          startClock % 60,
          "am"
        )
      }
    }
    return {
      startAt: chicagoDateTime(
        dateStr,
        Math.floor(startClock / 60),
        startClock % 60
      ),
      endAt: chicagoDateTime(dateStr, Math.floor(endClock / 60), endClock % 60),
    }
  }

  const single = cleaned.match(
    /(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?))/i
  )
  if (single) {
    const startClock = parseClock(single[1])
    if (startClock == null) return fallback(dateStr)
    const startAt = chicagoDateTime(
      dateStr,
      Math.floor(startClock / 60),
      startClock % 60
    )
    return { startAt, endAt: addHours(startAt, 2) }
  }

  if (/morning/i.test(cleaned)) {
    return {
      startAt: chicagoDateTime(dateStr, 8, 30),
      endAt: chicagoDateTime(dateStr, 10, 0),
    }
  }
  if (/evening/i.test(cleaned)) {
    return {
      startAt: chicagoDateTime(dateStr, 18, 0),
      endAt: chicagoDateTime(dateStr, 21, 0),
    }
  }
  return fallback(dateStr)
}

function fallback(dateStr: string) {
  return {
    startAt: chicagoDateTime(dateStr, 10, 0),
    endAt: chicagoDateTime(dateStr, 12, 0),
  }
}

export function eachDate(start: string, end?: string) {
  const dates = [start]
  if (!end || end === start) return dates
  const cursor = new Date(`${start}T12:00:00Z`)
  const last = new Date(`${end}T12:00:00Z`)
  while (cursor < last) {
    cursor.setUTCDate(cursor.getUTCDate() + 1)
    const next = cursor.toISOString().slice(0, 10)
    dates.push(next)
  }
  return dates
}

export function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function titlesMatch(a: string, b: string) {
  const left = normalizeTitle(a)
  const right = normalizeTitle(b)
  if (!left || !right) return false
  return left === right || left.includes(right) || right.includes(left)
}
