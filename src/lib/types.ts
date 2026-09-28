export type CareerFit = "Get hired" | "Get shown" | "Get connected" | "Skill up"

export type EventKind =
  | "Festival"
  | "Hiring"
  | "Networking"
  | "Exhibition"
  | "Workshop"
  | "Talk"

export type PhotoEvent = {
  id: string
  title: string
  start: string
  end?: string
  time: string
  venue: string
  address: string
  neighborhood: string
  cost: string
  kind: EventKind
  careerFit: CareerFit
  why: string
  howToUse: string
  url: string
  rsvpNote?: string
  soldOut?: boolean
}

export const HOTEL_REGIONS = [
  "Worldwide",
  "Americas",
  "Europe",
  "Asia-Pacific",
  "Middle East & Africa",
] as const

export type HotelRegion = (typeof HOTEL_REGIONS)[number]

export type HotelCollab = {
  id: string
  name: string
  city: string
  country: string
  region: HotelRegion
  neighborhood: string
  address: string
  bestFor: string
  likelihood: "Apply now" | "Direct pitch" | "Marketplace" | "Already filled"
  room: string
  meals: string
  why: string
  deliverables: string
  howToApply: string
  applyUrl: string
  applyLabel: string
  photographerTrack: boolean
}

export const ACTING_KINDS = [
  "audition",
  "extra",
  "sro",
  "headshot-model",
  "headshot-location",
] as const

export type ActingKind = (typeof ACTING_KINDS)[number]

export type ActingLead = {
  id: string
  name: string
  kind: ActingKind
  neighborhood: string
  address: string
  bestFor: string
  pay: string
  cost: string
  why: string
  howToApply: string
  applyUrl: string
  applyLabel: string
}

export type PhotoJob = {
  id: string
  title: string
  employer: string
  type: string
  pay: string
  why: string
  requirements: string[]
  url: string
}

export const AD_BUSINESSES = ["boudoir", "headshots", "onlyfans"] as const

export type AdBusiness = (typeof AD_BUSINESSES)[number]

export const AD_PRICES = ["free", "paid", "freemium"] as const

export type AdPrice = (typeof AD_PRICES)[number]

export type AdChannel = {
  id: string
  name: string
  businesses: AdBusiness[]
  price: AdPrice
  adultOnly: boolean
  banRisk: boolean
  neighborhood: string
  address: string
  bestFor: string
  cost: string
  why: string
  howToApply: string
  applyUrl: string
  applyLabel: string
  terms: string
}

export const FUNDING_REGIONS = ["illinois", "florida", "federal"] as const

export type FundingRegion = (typeof FUNDING_REGIONS)[number]

export const FUNDING_KINDS = [
  "grant",
  "charity",
  "contest",
  "contract",
  "capital",
] as const

export type FundingKind = (typeof FUNDING_KINDS)[number]

export type FundingLead = {
  id: string
  name: string
  region: FundingRegion
  kind: FundingKind
  neighborhood: string
  address: string
  bestFor: string
  award: string
  cost: string
  why: string
  howToApply: string
  applyUrl: string
  applyLabel: string
  terms: string
  scamRisk: boolean
}

export const HOUSE_SIT_REGIONS = [
  "worldwide",
  "united-states",
  "illinois",
  "florida",
  "europe",
] as const

export type HouseSitRegion = (typeof HOUSE_SIT_REGIONS)[number]

export const HOUSE_SIT_KINDS = [
  "luxury-sit",
  "marketplace",
  "paid-caretaker",
] as const

export type HouseSitKind = (typeof HOUSE_SIT_KINDS)[number]

export type HouseSitLead = {
  id: string
  name: string
  region: HouseSitRegion
  kind: HouseSitKind
  neighborhood: string
  address: string
  bestFor: string
  pay: string
  cost: string
  why: string
  howToApply: string
  applyUrl: string
  applyLabel: string
  terms: string
  scamRisk: boolean
}
