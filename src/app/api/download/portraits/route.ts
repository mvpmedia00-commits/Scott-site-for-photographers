import { readFile } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-dynamic"

const FILE = "mvp-media-portraits.zip"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", FILE)
  const data = await readFile(filePath)
  return new Response(data, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${FILE}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
