import { distanceScore, hotelDistanceScore } from "@/lib/desk/travel"
import type {
  HotelTrade,
  Pipeline,
  PressAccess,
  ScoreBreakdown,
} from "@/lib/desk/types"
import type { Signals } from "@/lib/desk/signals"

export type ScoreInput = {
  title: string
  pipeline: Pipeline
  moneyCents: number
  costCents: number
  pressAccess: PressAccess
  signals: Signals
  travelMinutes: number
  deadline?: string
  startAt?: string
  photographersWelcome: boolean
  hotelTrade?: HotelTrade
  learningDelta?: number
  confirmedPay?: boolean
  isProspect?: boolean
}

const NOW = () => Date.now()

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function paidWorkPoints(moneyCents: number, hotelTrade?: HotelTrade) {
  if (moneyCents >= 120000) return 40
  if (moneyCents >= 80000) return 38
  if (moneyCents >= 50000) return 36
  if (moneyCents >= 40000) return 30
  if (moneyCents >= 25000) return 24
  if (moneyCents >= 10000) return 16
  if (hotelTrade?.lodging) return hotelTrade.realism === "high" ? 22 : 12
  if (moneyCents > 0) return 8
  return 0
}

function deadlinePoints(deadline?: string, startAt?: string) {
  const stamp = deadline || startAt
  if (!stamp) return 3
  const hours = (new Date(stamp).getTime() - NOW()) / 36e5
  if (Number.isNaN(hours)) return 3
  if (hours < 0) return 0
  if (hours <= 18) return 8
  if (hours <= 72) return 7
  if (hours <= 24 * 7) return 5
  if (hours <= 24 * 21) return 3
  return 2
}

function pressPoints(access: PressAccess, signals: Signals) {
  if (access === "MEDIA_PASS_POSSIBLE") return 12
  if (access === "PHOTOGRAPHER_APPLICATION") return 9
  if (access === "LISTING") return 4
  if (access === "FREE" && signals.networking) return 6
  if (access === "FREE") return 5
  return 0
}

function goalBonus(input: ScoreInput) {
  let bonus = 0
  const chicago = input.travelMinutes <= 50
  if (input.moneyCents >= 50000 && input.costCents === 0 && chicago) bonus += 16
  else if (input.moneyCents >= 25000 && chicago) bonus += 10
  if (input.pressAccess === "MEDIA_PASS_POSSIBLE" && chicago) bonus += 12
  if (input.pipeline === "fashion" && (input.signals.models || input.signals.press)) {
    bonus += 10
  }
  if (input.pipeline === "networking" && (input.signals.models || input.signals.creators)) {
    bonus += 14
  }
  if (input.hotelTrade?.realism === "high") bonus += 10
  if (input.hotelTrade?.realism === "medium") bonus += 6
  if (input.hotelTrade?.meals) bonus += 3
  if (input.hotelTrade?.parking || input.hotelTrade?.credits) bonus += 2
  if (input.pipeline === "review") bonus += 8
  if (input.pipeline === "grant") bonus += 7
  if (input.pipeline === "contracts") bonus += 10
  if (input.pipeline === "contest") bonus += 4
  if (input.pipeline === "adult" && input.moneyCents >= 20000) bonus += 10
  if (input.pipeline === "adult" && input.signals.models) bonus += 4
  if (input.pipeline === "acting") bonus += 10
  if (input.pipeline === "housesit" && input.hotelTrade?.lodging) bonus += 6
  if (input.pipeline === "headshots" && input.moneyCents >= 15000) bonus += 12
  if (input.pipeline === "advertise" && input.costCents === 0) bonus += 8
  if (input.pipeline === "advertise" && input.costCents > 0) bonus += 2
  if (input.signals.salary) bonus += 6
  return Math.min(28, bonus)
}

export function scoreOpportunity(input: ScoreInput): {
  score: number
  breakdown: ScoreBreakdown
} {
  const breakdown: ScoreBreakdown = {
    paidWork: paidWorkPoints(input.moneyCents, input.hotelTrade),
    freeAdmission: input.costCents === 0 ? 8 : input.costCents <= 1500 ? 4 : 1,
    pressAccess: pressPoints(input.pressAccess, input.signals),
    networking: input.signals.networking || input.signals.job ? (input.signals.models ? 8 : 5) : 2,
    celebrity: input.signals.celebrity ? 5 : 0,
    fashion: input.signals.fashion || input.signals.models ? (input.pipeline === "fashion" ? 9 : 6) : 0,
    distance: input.hotelTrade
      ? hotelDistanceScore(input.travelMinutes)
      : distanceScore(input.travelMinutes),
    deadline: deadlinePoints(input.deadline, input.startAt),
    portfolio:
      input.pipeline === "review" || input.pressAccess === "MEDIA_PASS_POSSIBLE"
        ? 8
        : input.signals.gig || input.hotelTrade || input.pipeline === "headshots"
          ? 7
          : input.pipeline === "acting"
            ? 6
          : input.pipeline === "advertise"
            ? 5
          : input.pipeline === "grant" || input.pipeline === "contracts"
            ? 6
          : input.pipeline === "workshop"
            ? 5
            : 4,
    photographersWelcome: input.photographersWelcome ? 6 : 1,
    goalBonus: 0,
    learning: clamp(input.learningDelta ?? 0, -12, 12),
  }
  breakdown.goalBonus = goalBonus(input)

  let total =
    breakdown.paidWork +
    breakdown.freeAdmission +
    breakdown.pressAccess +
    breakdown.networking +
    breakdown.celebrity +
    breakdown.fashion +
    breakdown.distance +
    breakdown.deadline +
    breakdown.portfolio +
    breakdown.photographersWelcome +
    breakdown.goalBonus +
    breakdown.learning

  if (
    input.confirmedPay &&
    input.moneyCents >= 50000 &&
    input.costCents === 0
  ) {
    total = Math.max(total, 94)
  }
  if (input.signals.salary) total = Math.max(total, 97)
  if (input.signals.gig && input.moneyCents >= 80000) total = Math.max(total, 96)
  if (input.pressAccess === "MEDIA_PASS_POSSIBLE" && input.signals.fashion) {
    total = Math.max(total, 90)
  }
  if (input.hotelTrade?.realism === "high" && input.hotelTrade.lodging) {
    total = Math.min(Math.max(total, 84), 87)
  } else if (input.hotelTrade) {
    total = Math.min(total, 78)
  }
  if (input.isProspect) {
    total = Math.min(total, 82)
  }
  if (
    !input.startAt &&
    !input.deadline &&
    !input.signals.job &&
    !input.signals.gig &&
    !input.signals.salary &&
    !input.hotelTrade &&
    !input.isProspect
  ) {
    total = Math.min(total, 83)
  }
  if (
    input.pipeline === "networking" &&
    (input.signals.models || input.signals.creators) &&
    input.costCents === 0
  ) {
    total = Math.max(total, 76)
  }
  if (input.pipeline === "workshop" && input.costCents > 0 && input.moneyCents === 0) {
    total = clamp(total, 38, 48)
  }
  if (input.pipeline === "acting" && input.costCents > 0 && input.moneyCents === 0) {
    total = clamp(total, 52, 72)
  }
  if (input.pipeline === "headshots") {
    total = Math.min(Math.max(total, 70), 88)
  }
  if (input.pipeline === "advertise") {
    if (/ban risk/i.test(input.title)) {
      total = clamp(total, 18, 32)
    } else if (input.signals.job || input.signals.gig) {
      total = clamp(total, 40, 58)
    } else if (input.costCents === 0) {
      total = Math.min(Math.max(total, 60), 74)
    } else {
      total = Math.min(Math.max(total, 48), 66)
    }
  }
  if (input.pipeline === "grant") {
    if (/scam|grant mill/i.test(input.title)) {
      total = clamp(total, 12, 24)
    } else {
      total = Math.min(Math.max(total, 54), 72)
    }
  }
  if (input.pipeline === "contracts") {
    total = Math.min(Math.max(total, 62), 80)
  }
  if (input.pipeline === "contest") {
    total = Math.min(Math.max(total, 48), 64)
  }
  if (input.pipeline === "housesit") {
    if (/scam|mill/i.test(input.title)) {
      total = clamp(total, 12, 24)
    } else if (input.moneyCents > 0) {
      total = Math.min(Math.max(total, 68), 82)
    } else {
      total = Math.min(Math.max(total, 58), 74)
    }
  }
  if (input.pipeline === "adult" && input.costCents > 0 && input.moneyCents === 0) {
    total = clamp(total, 48, 62)
  }
  if (input.pipeline === "adult" && !input.confirmedPay) {
    total = Math.min(total, input.photographersWelcome ? 85 : 88)
  }
  if (input.signals.recurringWalk && !input.signals.adult) total = Math.min(total, 44)

  return { score: clamp(Math.round(total), 1, 99), breakdown }
}

export function whyScore(input: ScoreInput, score: number) {
  const bits: string[] = []
  if (input.moneyCents >= 50000) {
    bits.push(`Paid work (~$${Math.round(input.moneyCents / 100)}) beats unpaid walks`)
  }
  if (input.costCents === 0) bits.push("No ticket cost")
  else bits.push(`Costs $${Math.round(input.costCents / 100)} to attend`)
  if (input.pressAccess === "MEDIA_PASS_POSSIBLE") bits.push("Media credential path")
  if (input.photographersWelcome) bits.push("Photographers are explicitly welcome")
  if (input.hotelTrade?.lodging && input.pipeline !== "housesit") bits.push(`Hotel trade: ${input.hotelTrade.campaign}`)
  if (input.pipeline === "housesit") {
    bits.push(input.moneyCents > 0 ? "Paid caretaker / estate job" : "House sit · lodging for care")
  }
  if (input.pipeline === "acting") bits.push("Chicagoland acting / extra / SRO")
  if (input.pipeline === "headshots") bits.push("Someone may pay for headshots")
  if (input.pipeline === "advertise") {
    bits.push(input.costCents === 0 ? "Free place to list the business" : "Paid ads / leads — you set the cap")
  }
  if (input.pipeline === "grant") bits.push("Grant / capital program")
  if (input.pipeline === "contracts") bits.push("Government contract board")
  if (input.pipeline === "contest") bits.push("Contest / award")
  if (input.signals.models) bits.push("Models / brands in the room")
  if (input.signals.adult) bits.push("18+ nude / boudoir / adult")
  if (input.hotelTrade && input.travelMinutes === 0) {
    bits.push("Worldwide — apply from anywhere")
  } else if (input.travelMinutes >= 120) {
    bits.push(`${Math.round(input.travelMinutes / 60)}h from Chicago`)
  } else {
    bits.push(`${input.travelMinutes} min from South Loop`)
  }
  return `${score}/100 · ${bits.slice(0, 3).join(" · ")}`
}
