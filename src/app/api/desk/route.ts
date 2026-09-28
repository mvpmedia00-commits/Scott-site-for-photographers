import { assembleDesk } from "@/lib/desk/assemble"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const force = searchParams.get("force") === "1"
  const desk = await assembleDesk({ force })
  return Response.json(desk)
}
