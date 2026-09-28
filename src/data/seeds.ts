import { chicagoDateTime } from "@/lib/bot/time"
import type { OpportunityContact, Pipeline, PressAccess } from "@/lib/desk/types"
import type { HotelTrade } from "@/lib/desk/types"

export type SeedOpportunity = {
  id: string
  title: string
  pipeline: Pipeline
  moneyLabel: string
  moneyCents: number
  costLabel: string
  costCents: number
  deadline?: string
  startAt?: string
  endAt?: string
  location: string
  neighborhood: string
  url: string
  source: string
  summary: string
  pressAccess: PressAccess
  photographersWelcome: boolean
  contact?: OpportunityContact
  tags: string[]
  hotelTrade?: HotelTrade
}

export const seeds: SeedOpportunity[] = [
  {
    id: "seed-choose-media",
    title: "Choose Chicago media credentials",
    pipeline: "press",
    moneyLabel: "Portfolio",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    deadline: chicagoDateTime("2026-09-22", 17, 0),
    location: "Choose Chicago press desk, downtown",
    neighborhood: "The Loop",
    url: "https://www.choosechicago.com/media/",
    source: "Choose Chicago",
    summary:
      "Standing media accreditation for Chicago tourism, hotel, restaurant, and festival coverage. Closest official press desk if you want hotel and city-campaign access without buying a ticket.",
    pressAccess: "MEDIA_PASS_POSSIBLE",
    photographersWelcome: true,
    contact: {
      name: "Choose Chicago media",
      role: "PR manager",
      company: "Choose Chicago",
      contactUrl: "https://www.choosechicago.com/media/",
    },
    tags: ["press", "tourism", "hotels"],
  },
  {
    id: "seed-mccormick-media",
    title: "McCormick Place photographer / media application",
    pipeline: "press",
    moneyLabel: "Day rate possible",
    moneyCents: 25000,
    costLabel: "$0",
    costCents: 0,
    location: "McCormick Place, 2301 S King Drive",
    neighborhood: "Near South Side",
    url: "https://www.mccormickplace.com/media/",
    source: "McCormick Place",
    summary:
      "Convention-center media page: accreditation, photographer rules, and exhibitor services. This is how you stop buying trade-show tickets and start working them.",
    pressAccess: "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: true,
    contact: {
      name: "McCormick Place media",
      role: "Event producer",
      company: "McCormick Place",
      contactUrl: "https://www.mccormickplace.com/media/",
    },
    tags: ["press", "conventions"],
  },
  {
    id: "seed-aic-press",
    title: "Art Institute of Chicago press credentials",
    pipeline: "press",
    moneyLabel: "Portfolio",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    location: "Art Institute of Chicago, 111 S Michigan Ave",
    neighborhood: "The Loop",
    url: "https://www.artic.edu/press",
    source: "Art Institute of Chicago",
    summary:
      "Museum press office. Lee Miller and photography exhibitions are the excuse to get on the list this month. Credentialed photographers do not pay exhibition tickets for working coverage.",
    pressAccess: "MEDIA_PASS_POSSIBLE",
    photographersWelcome: true,
    contact: {
      name: "AIC media relations",
      role: "PR manager",
      company: "Art Institute of Chicago",
      contactUrl: "https://www.artic.edu/press",
    },
    tags: ["press", "museum"],
  },
  {
    id: "seed-fashion-mart",
    title: "Merchandise Mart / StyleMax photographer coverage",
    pipeline: "fashion",
    moneyLabel: "Portfolio",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    deadline: chicagoDateTime("2026-09-22", 12, 0),
    location: "Merchandise Mart, 222 W Merchandise Mart Plaza",
    neighborhood: "River North",
    url: "https://www.merchandisemart.com/",
    source: "Merchandise Mart",
    summary:
      "Chicago’s fashion trade building. When StyleMax or showroom events post a media/photographer form, this is the credential. Pitch lookbook coverage to showrooms even when a runway show is not listed.",
    pressAccess: "MEDIA_PASS_POSSIBLE",
    photographersWelcome: true,
    contact: {
      name: "Mart marketing / showroom PR",
      role: "PR manager",
      company: "Merchandise Mart",
      contactUrl: "https://www.merchandisemart.com/",
    },
    tags: ["fashion", "press", "models"],
  },
  {
    id: "seed-fgi",
    title: "Fashion Group International Chicago programming",
    pipeline: "fashion",
    moneyLabel: "Leads",
    moneyCents: 0,
    costLabel: "See event",
    costCents: 0,
    startAt: chicagoDateTime("2026-09-25", 18, 0),
    location: "Fashion Group International Chicago",
    neighborhood: "Chicago",
    url: "https://www.fgi.org/",
    source: "FGI",
    summary:
      "The local fashion-industry membership. Mixers put you next to brand PR, stylists, and models. Ask who needs show coverage this season.",
    pressAccess: "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: true,
    contact: {
      name: "FGI Chicago",
      role: "Organizer",
      company: "Fashion Group International",
      contactUrl: "https://www.fgi.org/",
    },
    tags: ["fashion", "networking", "models"],
  },
  {
    id: "seed-dcase",
    title: "DCASE Individual Artists Program",
    pipeline: "grant",
    moneyLabel: "Grant",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    location: "City of Chicago Department of Cultural Affairs",
    neighborhood: "The Loop",
    url: "https://www.chicago.gov/city/en/depts/dca/provdrs/grants.html",
    source: "DCASE",
    summary:
      "City grants for Chicago artists, including photographers. Not a gig this week, but the application is how you fund a project instead of paying for a workshop.",
    pressAccess: "FREE",
    photographersWelcome: true,
    contact: {
      name: "DCASE grants",
      role: "Organizer",
      company: "DCASE",
      contactUrl: "https://www.chicago.gov/city/en/depts/dca/provdrs/grants.html",
    },
    tags: ["grant"],
  },
  {
    id: "seed-dammeyer",
    title: "MoCP Diane Dammeyer Fellowship",
    pipeline: "grant",
    moneyLabel: "Fellowship",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    location: "Museum of Contemporary Photography",
    neighborhood: "South Loop",
    url: "https://www.mocp.org/",
    source: "MoCP",
    summary:
      "The photography museum’s named fellowship. Ask staff at the Filter-week reception how the next cycle is announced.",
    pressAccess: "FREE",
    photographersWelcome: true,
    contact: {
      name: "MoCP staff",
      role: "Photo editor",
      company: "Museum of Contemporary Photography",
      contactUrl: "https://www.mocp.org/about/contact/",
    },
    tags: ["grant", "museum"],
  },
  {
    id: "seed-iac",
    title: "Illinois Arts Council artist grants",
    pipeline: "grant",
    moneyLabel: "Grant",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    location: "Illinois Arts Council, Chicago",
    neighborhood: "The Loop",
    url: "https://arts.illinois.gov/",
    source: "Illinois Arts Council",
    summary:
      "State artist support. Photographers qualify. Check current deadlines before Filter week ends so you are not writing a grant the night before FotoWorks.",
    pressAccess: "FREE",
    photographersWelcome: true,
    contact: {
      name: "IAC programs",
      role: "Organizer",
      company: "Illinois Arts Council",
      contactUrl: "https://arts.illinois.gov/",
    },
    tags: ["grant"],
  },
  {
    id: "seed-cac-call",
    title: "Chicago Artists Coalition calls / residencies",
    pipeline: "contest",
    moneyLabel: "Exhibition",
    moneyCents: 0,
    costLabel: "$0",
    costCents: 0,
    location: "Chicago Artists Coalition, 1431 W Hubbard",
    neighborhood: "West Town",
    url: "https://www.chicagoartistscoalition.org/",
    source: "Chicago Artists Coalition",
    summary:
      "Open calls, residencies, and professional-development that put work in front of Chicago curators. Better than a $54 camera-club walk if you want to get shown.",
    pressAccess: "FREE",
    photographersWelcome: true,
    contact: {
      name: "CAC programs",
      role: "Organizer",
      company: "Chicago Artists Coalition",
      contactUrl: "https://www.chicagoartistscoalition.org/contact",
    },
    tags: ["contest", "exhibition"],
  },
  {
    id: "seed-apa",
    title: "APA Chicago chapter events & job board",
    pipeline: "paid",
    moneyLabel: "Assignments",
    moneyCents: 40000,
    costLabel: "Member / guest",
    costCents: 0,
    location: "APA Chicago",
    neighborhood: "Chicago",
    url: "https://apanational.org/",
    source: "APA",
    summary:
      "Advertising Photographers of America. The job board and chapter mixers are where commercial producers actually look before they post on Indeed.",
    pressAccess: "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: true,
    contact: {
      name: "APA Chicago",
      role: "Organizer",
      company: "APA",
      contactUrl: "https://apanational.org/",
    },
    tags: ["jobs", "commercial"],
  },
]
