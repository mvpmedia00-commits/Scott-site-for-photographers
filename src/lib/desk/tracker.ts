import type { DeskProfile, Lifecycle, TrackerItem } from "@/lib/desk/types"
import { defaultProfile } from "@/data/profile"

const KEY = "south-loop-desk-v1"

export type DeskState = {
  profile: DeskProfile
  items: Record<string, TrackerItem>
}

const empty: DeskState = { profile: defaultProfile, items: {} }

export function loadDeskState(): DeskState {
  if (typeof window === "undefined") return empty
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as DeskState
    return {
      profile: { ...defaultProfile, ...parsed.profile },
      items: parsed.items || {},
    }
  } catch {
    return empty
  }
}

export function saveDeskState(state: DeskState) {
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

export function touchItem(
  state: DeskState,
  id: string,
  patch: Partial<TrackerItem>,
  historyText?: string
): DeskState {
  const current = state.items[id] ?? {
    status: "found" as Lifecycle,
    history: [],
  }
  const next: TrackerItem = {
    ...current,
    ...patch,
    history: historyText
      ? [...current.history, { at: new Date().toISOString(), text: historyText }]
      : current.history,
  }
  if (patch.status === "applied" && !next.followUpAt) {
    const follow = new Date()
    follow.setDate(follow.getDate() + 3)
    next.followUpAt = follow.toISOString()
  }
  const stateNext = {
    ...state,
    items: { ...state.items, [id]: next },
  }
  saveDeskState(stateNext)
  return stateNext
}

export function overdueFollowUps(state: DeskState) {
  const now = Date.now()
  return Object.values(state.items).filter((item) => {
    if (!item.followUpAt || item.blacklisted) return false
    if (["paid", "completed", "booked"].includes(item.status)) return false
    return new Date(item.followUpAt).getTime() < now
  }).length
}

export function voteDelta(
  tokens: string[],
  items: Record<string, TrackerItem>,
  titleTokens: string[]
) {
  let delta = 0
  for (const item of Object.values(items)) {
    if (!item.vote) continue
    const weight = item.vote === "useful" ? 3 : -4
    // Approximate: applied globally to matching tokens stored in history text
    if (item.history.some((row) => titleTokens.some((token) => row.text.includes(token)))) {
      delta += weight
    }
  }
  const votes = Object.values(items)
  for (const token of tokens) {
    const hits = votes.filter((item) =>
      item.history.some((row) => row.text.toLowerCase().includes(`token:${token}`))
    )
    for (const hit of hits) {
      if (hit.vote === "useful") delta += 2
      if (hit.vote === "not") delta -= 3
    }
  }
  return Math.max(-12, Math.min(12, delta))
}
