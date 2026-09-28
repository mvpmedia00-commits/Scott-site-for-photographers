import { newFinds, runScout } from "@/lib/bot/scan"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const force = searchParams.get("force") === "1"
  const result = await runScout({ force })
  return Response.json({
    ...result,
    newFinds: newFinds(result.events),
  })
}
