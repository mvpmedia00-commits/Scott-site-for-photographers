import { assembleDesk } from "@/lib/desk/assemble"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  const secret = process.env.CRON_SECRET
  if (secret && auth !== `Bearer ${secret}` && process.env.NODE_ENV === "production") {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const desk = await assembleDesk({ force: true })
  return Response.json({
    ok: true,
    scannedAt: desk.scannedAt,
    opportunities: desk.opportunities.length,
    brief: desk.brief.headline,
    sources: desk.sources,
  })
}
