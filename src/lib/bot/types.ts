export type ScoutRelevance = "high" | "medium" | "low"

export type ScoutEvent = {
  id: string
  title: string
  startAt: string
  endAt: string
  location: string
  url: string
  source: string
  sourceUrl: string
  cost?: string
  summary: string
  relevance: ScoutRelevance
  inCatalog: boolean
}

export type SourceStatus = {
  id: string
  name: string
  url: string
  ok: boolean
  found: number
  error?: string
}

export type ScanResult = {
  scannedAt: string
  sources: SourceStatus[]
  events: ScoutEvent[]
  liveCount: number
  catalogCount: number
}
