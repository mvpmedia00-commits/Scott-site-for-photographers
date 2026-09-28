import type { ScoutEvent } from "@/lib/bot/types"

function fold(line: string) {
  if (line.length <= 74) return line
  const chunks = [line.slice(0, 74)]
  let rest = line.slice(74)
  while (rest.length) {
    chunks.push(` ${rest.slice(0, 73)}`)
    rest = rest.slice(73)
  }
  return chunks.join("\r\n")
}

function icsDate(iso: string) {
  const date = new Date(iso)
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  const hh = String(date.getUTCHours()).padStart(2, "0")
  const mm = String(date.getUTCMinutes()).padStart(2, "0")
  const ss = String(date.getUTCSeconds()).padStart(2, "0")
  return `${y}${m}${d}T${hh}${mm}${ss}Z`
}

function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

export function toIcs(events: ScoutEvent[], calendarName: string) {
  const stamp = icsDate(new Date().toISOString())
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//South Loop Stay//Scout Bot//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    "X-WR-TIMEZONE:America/Chicago",
  ]

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      fold(`UID:${event.id}@southloopstay`),
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsDate(event.startAt)}`,
      `DTEND:${icsDate(event.endAt)}`,
      fold(`SUMMARY:${escapeText(event.title)}`),
      fold(
        `DESCRIPTION:${escapeText(
          `${event.summary}\\nSource: ${event.source}\\n${event.url}`
        )}`
      ),
      fold(`LOCATION:${escapeText(event.location)}`),
      fold(`URL:${event.url}`),
      "END:VEVENT"
    )
  }

  lines.push("END:VCALENDAR")
  return `${lines.join("\r\n")}\r\n`
}
