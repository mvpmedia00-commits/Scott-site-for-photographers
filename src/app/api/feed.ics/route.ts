import { toIcs } from "@/lib/bot/ics"
import { runScout } from "@/lib/bot/scan"

export const dynamic = "force-dynamic"

export async function GET() {
  const result = await runScout()
  const ics = toIcs(
    result.events.filter((event) => event.relevance !== "low"),
    "Chicago Photographer Scout"
  )
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'inline; filename="chicago-photographer-scout.ics"',
      "Cache-Control": "public, max-age=1800",
    },
  })
}
