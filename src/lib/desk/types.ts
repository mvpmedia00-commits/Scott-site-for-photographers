export const PIPELINES = [
  "paid",
  "adult",
  "press",
  "fashion",
  "networking",
  "hotel",
  "housesit",
  "acting",
  "headshots",
  "advertise",
  "contest",
  "grant",
  "contracts",
  "review",
  "workshop",
  "general",
] as const

export type Pipeline = (typeof PIPELINES)[number]

export const PIPELINE_LABELS: Record<Pipeline, string> = {
  paid: "Paid Jobs",
  adult: "Boudoir / Nude / Adult",
  press: "Media/Press Passes",
  fashion: "Fashion Shows",
  networking: "Model/Creator Networking",
  hotel: "Hotel Content Stays",
  housesit: "Luxury house sits",
  acting: "Acting / Extra / SRO",
  headshots: "Paid Headshots",
  advertise: "Advertise (free / paid)",
  contest: "Contests / awards",
  grant: "Grants / capital",
  contracts: "Gov contracts",
  review: "Portfolio Reviews",
  workshop: "Workshops",
  general: "General Events",
}

export const LIFECYCLES = [
  "found",
  "qualified",
  "apply",
  "applied",
  "followup",
  "approved",
  "booked",
  "completed",
  "paid",
] as const

export type Lifecycle = (typeof LIFECYCLES)[number]

export const LIFECYCLE_LABELS: Record<Lifecycle, string> = {
  found: "Found",
  qualified: "Qualified",
  apply: "Apply",
  applied: "Applied",
  followup: "Follow-up",
  approved: "Interview/Approved",
  booked: "Booked",
  completed: "Completed",
  paid: "Paid",
}

export type PressAccess =
  | "FREE"
  | "MEDIA_PASS_POSSIBLE"
  | "PAID_TICKET"
  | "PHOTOGRAPHER_APPLICATION"
  | "AUDITION"
  | "CLIENT_PITCH"
  | "LISTING"

export type PitchKind =
  | "Media Credential Request"
  | "Event Photographer Pitch"
  | "Hotel Content Exchange"
  | "Freelance Photographer Application"
  | "Portfolio Introduction"
  | "Company Prospecting"
  | "Grant / Contest Entry"
  | "Boudoir / Nude Pitch"
  | "Adult Talent Application"
  | "Travel Photographer Pitch"
  | "Retreat Booking Inquiry"
  | "Acting Audition Submission"
  | "Extra / Stand-in Registration"
  | "Theater Networking"
  | "Paid Headshot Pitch"
  | "Listing / Ad Copy"
  | "Government Contract Bid"
  | "Capital / Loan Inquiry"
  | "House Sit Application"

export type ContactRole =
  | "Organizer"
  | "PR manager"
  | "Marketing director"
  | "Photo editor"
  | "Event producer"
  | "Hotel marketing"
  | "Casting director"
  | "Recruiter"

export type OpportunityContact = {
  name: string
  role: ContactRole
  company: string
  email?: string
  contactUrl?: string
  linkedin?: string
  lastContactAt?: string
}

export type ScoreBreakdown = {
  paidWork: number
  freeAdmission: number
  pressAccess: number
  networking: number
  celebrity: number
  fashion: number
  distance: number
  deadline: number
  portfolio: number
  photographersWelcome: number
  goalBonus: number
  learning: number
}

export type HotelTrade = {
  lodging: boolean
  meals: boolean
  parking: boolean
  credits: boolean
  realism: "high" | "medium" | "low"
  campaign: string
}

export type Opportunity = {
  id: string
  title: string
  pipeline: Pipeline
  score: number
  breakdown: ScoreBreakdown
  moneyLabel: string
  moneyCents: number
  costLabel: string
  costCents: number
  deadline?: string
  startAt?: string
  endAt?: string
  location: string
  neighborhood: string
  travelMinutes: number
  url: string
  source: string
  sourceUrl: string
  summary: string
  pressAccess: PressAccess
  photographersWelcome: boolean
  contact?: OpportunityContact
  nextAction: string
  pitchKind: PitchKind
  pitchSubject: string
  pitchBody: string
  conflicts: string[]
  reminder?: string
  tags: string[]
  hotelTrade?: HotelTrade
  whyScore: string
}

export type WatchSearch = {
  id: string
  name: string
  url: string
  kind: string
}

export type DeskBrief = {
  headline: string
  applyToday: Opportunity[]
  pressClosing: Opportunity[]
  companiesToPitch: Opportunity[]
  hotelLeads: Opportunity[]
  tonightNetworking: Opportunity[]
  overdueFollowUps: number
}

export type TrackerItem = {
  status: Lifecycle
  vote?: "useful" | "not"
  blacklisted?: boolean
  lastContactAt?: string
  followUpAt?: string
  notes?: string
  moneyOffered?: string
  outcome?: string
  history: { at: string; text: string }[]
}

export type DeskProfile = {
  name: string
  email: string
  instagram: string
  portfolio: string
}

export type SourceStatus = {
  id: string
  name: string
  url: string
  ok: boolean
  found: number
  error?: string
}

export type DeskPayload = {
  scannedAt: string
  sources: SourceStatus[]
  watchSearches: WatchSearch[]
  opportunities: Opportunity[]
  brief: DeskBrief
  pipelineCounts: Record<Pipeline, number>
}
