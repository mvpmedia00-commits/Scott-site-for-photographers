import { actingLeads } from "@/data/acting"
import { advertiseChannels } from "@/data/advertise"
import { adultSeeds } from "@/data/adult-seeds"
import { events } from "@/data/events"
import { fundingLeads } from "@/data/funding"
import { hotels } from "@/data/hotels"
import { houseSitLeads } from "@/data/housesit"
import { jobs } from "@/data/jobs"
import { seeds } from "@/data/seeds"
import { weeklyProspects, type CompanyProspect } from "@/data/prospects"
import { contactFromParts, matchContact } from "@/data/contacts"
import { defaultProfile } from "@/data/profile"
import { catalogScoutEvents } from "@/lib/bot/catalog"
import { runScout } from "@/lib/bot/scan"
import { normalizeTitle, titlesMatch } from "@/lib/bot/time"
import type { PhotoEvent, HotelCollab, PhotoJob, ActingLead, AdChannel, FundingLead, HouseSitLead } from "@/lib/types"
import type { ScoutEvent, SourceStatus } from "@/lib/bot/types"
import { scoreOpportunity, whyScore } from "@/lib/desk/score"
import {
  classifyPipeline,
  detectPressAccess,
  detectSignals,
  formatMoney,
  parseCostCents,
  parseMoneyCents,
} from "@/lib/desk/signals"
import { travelMinutes } from "@/lib/desk/travel"
import { buildPitch, nextActionFor, pitchKindFor } from "@/lib/desk/pitches"
import type {
  DeskPayload,
  HotelTrade,
  Opportunity,
  PitchKind,
  Pipeline,
  PressAccess,
  WatchSearch,
} from "@/lib/desk/types"
import { PIPELINES } from "@/lib/desk/types"

export const WATCH_SEARCHES: WatchSearch[] = [
  {
    id: "linkedin-jobs",
    name: "LinkedIn Jobs · photographer Chicago",
    url: "https://www.linkedin.com/jobs/search/?keywords=photographer&location=Chicago%2C%20Illinois",
    kind: "jobs",
  },
  {
    id: "indeed",
    name: "Indeed · photographer Chicago",
    url: "https://www.indeed.com/jobs?q=photographer&l=Chicago%2C+IL",
    kind: "jobs",
  },
  {
    id: "ziprecruiter",
    name: "ZipRecruiter · photographer Chicago",
    url: "https://www.ziprecruiter.com/Jobs/Photographer/-in-Chicago,IL",
    kind: "jobs",
  },
  {
    id: "instagram",
    name: "Instagram · public Chicago photo events",
    url: "https://www.instagram.com/explore/search/keyword/?q=chicago%20photography%20event",
    kind: "social",
  },
  {
    id: "x-search",
    name: "X · Chicago photographer hiring",
    url: "https://x.com/search?q=Chicago%20(photographer%20OR%20%22photo%20editor%22)%20(hiring%20OR%20credential)&src=typed_query&f=live",
    kind: "social",
  },
  {
    id: "linkedin-boudoir",
    name: "LinkedIn · boudoir photographer Chicagoland",
    url: "https://www.linkedin.com/jobs/search/?keywords=boudoir%20photographer&location=Chicago%20Metropolitan%20Area",
    kind: "jobs",
  },
  {
    id: "indeed-boudoir",
    name: "Indeed · boudoir photographer Chicago metro",
    url: "https://www.indeed.com/jobs?q=boudoir+photographer&l=Chicago%2C+IL",
    kind: "jobs",
  },
  {
    id: "purpleport",
    name: "PurplePort · Chicago nude / erotic",
    url: "https://purpleport.com/search/?work=photographer&location=Chicago",
    kind: "adult",
  },
  {
    id: "modelmayhem",
    name: "ModelMayhem · Chicago nude photography",
    url: "https://www.modelmayhem.com/browse",
    kind: "adult",
  },
  {
    id: "casting-networks",
    name: "Casting Networks · Chicago male nude / underwear",
    url: "https://www.castingnetworks.com/",
    kind: "adult",
  },
  {
    id: "hook-casting",
    name: "Hook Casting · male adult talent 18+",
    url: "https://www.hookcasting.com/",
    kind: "adult",
  },
  {
    id: "indeed-nude",
    name: "Indeed · nude / erotic photographer Chicago metro",
    url: "https://www.indeed.com/jobs?q=nude+OR+erotic+OR+boudoir+photographer&l=Chicago%2C+IL",
    kind: "adult",
  },
  {
    id: "backstage-chicago",
    name: "Backstage · Chicago nude / underwear / adult",
    url: "https://www.backstage.com/casting/?gender=male&location=Chicago,%20IL",
    kind: "adult",
  },
  {
    id: "ig-boudoir-hiring",
    name: "Instagram · hiring boudoir photographer",
    url: "https://www.instagram.com/explore/search/keyword/?q=hiring%20boudoir%20photographer",
    kind: "social",
  },
  {
    id: "ig-destination-boudoir",
    name: "Instagram · destination boudoir",
    url: "https://www.instagram.com/explore/search/keyword/?q=destination%20boudoir",
    kind: "social",
  },
  {
    id: "ig-model-wanted",
    name: "Instagram · nude model wanted 18+",
    url: "https://www.instagram.com/explore/search/keyword/?q=nude%20model%20wanted%2018%2B",
    kind: "social",
  },
  {
    id: "ig-posedmag",
    name: "Instagram · @posedmag",
    url: "https://www.instagram.com/posedmag/",
    kind: "social",
  },
  {
    id: "x-boudoir-hiring",
    name: "X · boudoir / nude hiring",
    url: "https://x.com/search?q=(boudoir%20OR%20%22fine%20art%20nude%22)%20(hiring%20OR%20%22photographer%20wanted%22%20OR%20destination)&src=typed_query&f=live",
    kind: "social",
  },
  {
    id: "modelmanagement",
    name: "ModelManagement · worldwide paid castings",
    url: "https://www.modelmanagement.com/castings/",
    kind: "adult",
  },
  {
    id: "adultfolio",
    name: "AdultFolio · glamour / adult photographers",
    url: "https://www.adultfolio.com/",
    kind: "adult",
  },
  {
    id: "sexyjobs",
    name: "SexyJobs · nude models paid travel",
    url: "https://www.sexyjobs.com/jobs/nude-modeling",
    kind: "adult",
  },
  {
    id: "posed-mag",
    name: "POSED MAG · photographer application",
    url: "https://posedmag.com/shoot/",
    kind: "adult",
  },
  {
    id: "stayamo",
    name: "Stayamo · worldwide photographer stays",
    url: "https://stayamo.com/influencers",
    kind: "hotel",
  },
  {
    id: "suro",
    name: "SURŌ · worldwide contributor stays",
    url: "https://suroliving.com/contributor-faq/",
    kind: "hotel",
  },
  {
    id: "hotel-creators",
    name: "Hotel Creators · 85+ countries",
    url: "https://thehotelcreators.com/",
    kind: "hotel",
  },
  {
    id: "vayada",
    name: "Vayada · hotel creator marketplace",
    url: "https://vayada.com/creator-benefits",
    kind: "hotel",
  },
  {
    id: "accor-academy",
    name: "ALL Accor Creator Academy",
    url: "https://www.accorcreatoracademy.com/",
    kind: "hotel",
  },
  {
    id: "oyo-frames",
    name: "OYO Frames · hotel photography 800+ cities",
    url: "https://frames.oyorooms.com/",
    kind: "hotel",
  },
  {
    id: "loews-stay",
    name: "Loews Hotels · influencer stay (US)",
    url: "https://www.loewshotels.com/influencer-stay-request",
    kind: "hotel",
  },
  {
    id: "marriott-media",
    name: "Marriott · worldwide media / influencer desks",
    url: "https://news.marriott.com/media-resources",
    kind: "hotel",
  },
  {
    id: "hyatt-comms",
    name: "Hyatt · worldwide communications contacts",
    url: "https://newsroom.hyatt.com/contacts",
    kind: "hotel",
  },
  {
    id: "visitbritain-media",
    name: "VisitBritain Media Centre",
    url: "https://www.visitbritain.com/gb/en/media",
    kind: "hotel",
  },
  {
    id: "tourism-australia-media",
    name: "Tourism Australia media",
    url: "https://www.tourism.australia.com/en/news-and-industry-information.html",
    kind: "hotel",
  },
  {
    id: "backstage-chicago",
    name: "Backstage · Chicago acting / extras",
    url: "https://www.backstage.com/casting/?location=Chicago,%20IL",
    kind: "acting",
  },
  {
    id: "actors-access",
    name: "Actors Access · Chicago market",
    url: "https://www.actorsaccess.com/",
    kind: "acting",
  },
  {
    id: "casting-networks-acting",
    name: "Casting Networks · Chicago",
    url: "https://www.castingnetworks.com/",
    kind: "acting",
  },
  {
    id: "project-casting-il",
    name: "Project Casting · Illinois / One Chicago",
    url: "https://www.projectcasting.com/casting-calls-acting-auditions/illinois/",
    kind: "acting",
  },
  {
    id: "chicagoplays",
    name: "Chicago Plays · League of Chicago Theatres",
    url: "https://www.chicagoplays.com/",
    kind: "acting",
  },
  {
    id: "cine-casting",
    name: "Cine-Casting · extras / stand-ins",
    url: "https://www.cine-casting.com/",
    kind: "acting",
  },
  {
    id: "four-star-casting",
    name: "4 Star Casting · extras",
    url: "https://www.4starcasting.com/",
    kind: "acting",
  },
  {
    id: "compass-bokeh",
    name: "Compass Casting · Bokeh Background",
    url: "https://www.compasscasting.com/bokeh",
    kind: "acting",
  },
  {
    id: "joan-philo",
    name: "Joan Philo Casting · Fire / Med extras",
    url: "https://www.thedarlingseries.com/joan-philo-casting/",
    kind: "acting",
  },
  {
    id: "broadway-sro",
    name: "Broadway in Chicago · rush & lottery",
    url: "https://www.broadwayinchicago.com/best-available-seating/",
    kind: "acting",
  },
  {
    id: "saints-ushers",
    name: "The Saints · usher 150+ venues",
    url: "https://www.saintschicago.org/",
    kind: "acting",
  },
  {
    id: "steppenwolf-usher",
    name: "Steppenwolf · usher volunteering",
    url: "https://www.steppenwolf.org/about-us/work-with-us/ushers-volunteering",
    kind: "acting",
  },
  {
    id: "modelmayhem-headshots",
    name: "ModelMayhem · Chicago photographer wanted",
    url: "https://www.modelmayhem.com/browse",
    kind: "headshots",
  },
  {
    id: "peerspace-chicago",
    name: "Peerspace Chicago · photo-shoot locations",
    url: "https://www.peerspace.com/s/chicago-il/photo-shoot",
    kind: "headshots",
  },
  {
    id: "ig-need-headshots",
    name: "Instagram · Chicago need headshots",
    url: "https://www.instagram.com/explore/search/keyword/?q=chicago%20need%20headshots",
    kind: "headshots",
  },
  {
    id: "ig-actor-headshots",
    name: "Instagram · Chicago actor headshots",
    url: "https://www.instagram.com/explore/search/keyword/?q=chicago%20actor%20headshots",
    kind: "headshots",
  },
  {
    id: "gbp-create",
    name: "Google Business Profile · claim listing",
    url: "https://business.google.com/create",
    kind: "advertise",
  },
  {
    id: "thumbtack-pro",
    name: "Thumbtack Pro · Chicago photography",
    url: "https://www.thumbtack.com/pro",
    kind: "advertise",
  },
  {
    id: "bark-providers",
    name: "Bark · photography providers",
    url: "https://www.bark.com/en/us/for-providers/",
    kind: "advertise",
  },
  {
    id: "yelp-biz",
    name: "Yelp for Business · claim page",
    url: "https://biz.yelp.com/",
    kind: "advertise",
  },
  {
    id: "the-knot-marketplace",
    name: "The Knot · Chicago vendors",
    url: "https://www.theknot.com/marketplace",
    kind: "advertise",
  },
  {
    id: "alignable",
    name: "Alignable · Chicago businesses",
    url: "https://www.alignable.com/",
    kind: "advertise",
  },
  {
    id: "nextdoor-biz",
    name: "Nextdoor Business",
    url: "https://nextdoor.com/for_business/",
    kind: "advertise",
  },
  {
    id: "reddit-chicago-photo",
    name: "Reddit · r/ChicagoPhotography",
    url: "https://www.reddit.com/r/ChicagoPhotography/",
    kind: "advertise",
  },
  {
    id: "reddit-of-promo",
    name: "Reddit · r/OnlyFansPromotions (18+)",
    url: "https://www.reddit.com/r/OnlyFansPromotions/",
    kind: "advertise",
  },
  {
    id: "fetlife",
    name: "FetLife · Chicago groups (18+)",
    url: "https://fetlife.com/",
    kind: "advertise",
  },
  {
    id: "trafficjunky",
    name: "TrafficJunky · adult ads (18+)",
    url: "https://www.trafficjunky.com/",
    kind: "advertise",
  },
  {
    id: "onlyfinder",
    name: "OnlyFinder · paid OF directory (18+)",
    url: "https://onlyfinder.com/",
    kind: "advertise",
  },
  {
    id: "google-ads",
    name: "Google Ads · Chicago photographer keywords",
    url: "https://ads.google.com/",
    kind: "advertise",
  },
  {
    id: "grants-gov",
    name: "Grants.gov · open opportunities",
    url: "https://www.grants.gov/search-grants",
    kind: "grant",
  },
  {
    id: "sam-gov",
    name: "SAM.gov · federal contract opportunities",
    url: "https://sam.gov/",
    kind: "contracts",
  },
  {
    id: "bidbuy",
    name: "BidBuy · Illinois procurement",
    url: "https://www.bidbuy.illinois.gov/",
    kind: "contracts",
  },
  {
    id: "chicago-dps",
    name: "City of Chicago DPS procurement",
    url: "https://www.chicago.gov/city/en/depts/dps.html",
    kind: "contracts",
  },
  {
    id: "mfmp",
    name: "MyFloridaMarketPlace vendor bids",
    url: "https://vendor.myfloridamarketplace.com/",
    kind: "contracts",
  },
  {
    id: "dcase-grants",
    name: "DCASE · Chicago artist grants",
    url: "https://www.chicago.gov/city/en/depts/dca/provdrs/grants.html",
    kind: "grant",
  },
  {
    id: "iac-grants",
    name: "Illinois Arts Council grants",
    url: "https://arts.illinois.gov/",
    kind: "grant",
  },
  {
    id: "florida-arts-grants",
    name: "Florida Division of Arts and Culture grants",
    url: "https://dos.fl.gov/cultural/grants/",
    kind: "grant",
  },
  {
    id: "sba-illinois",
    name: "SBA Illinois District",
    url: "https://www.sba.gov/district/illinois",
    kind: "grant",
  },
  {
    id: "florida-sbdc",
    name: "Florida SBDC Network",
    url: "https://floridasbdc.org/",
    kind: "grant",
  },
  {
    id: "trustedhousesitters",
    name: "TrustedHousesitters · luxury / worldwide",
    url: "https://www.trustedhousesitters.com/house-sitting-assignments/",
    kind: "housesit",
  },
  {
    id: "ths-florida",
    name: "TrustedHousesitters · Florida",
    url: "https://www.trustedhousesitters.com/house-and-pet-sitting-assignments/usa/florida/",
    kind: "housesit",
  },
  {
    id: "ths-illinois",
    name: "TrustedHousesitters · Illinois",
    url: "https://www.trustedhousesitters.com/house-and-pet-sitting-assignments/usa/illinois/",
    kind: "housesit",
  },
  {
    id: "nomador",
    name: "Nomador · European house sits",
    url: "https://www.nomador.com/",
    kind: "housesit",
  },
  {
    id: "caretaker-gazette",
    name: "The Caretaker Gazette",
    url: "https://www.caretaker.org/",
    kind: "housesit",
  },
  {
    id: "coolworks-caretaker",
    name: "CoolWorks · caretaker jobs",
    url: "https://www.coolworks.com/jobs/caretaker",
    kind: "housesit",
  },
]

function overlaps(a: Opportunity, b: Opportunity) {
  if (!a.startAt || !b.startAt || a.id === b.id) return false
  const as = new Date(a.startAt).getTime()
  const ae = new Date(a.endAt || a.startAt).getTime() + 30 * 60 * 1000
  const bs = new Date(b.startAt).getTime()
  const be = new Date(b.endAt || b.startAt).getTime() + 30 * 60 * 1000
  return as < be && bs < ae
}

function finalize(partial: Omit<Opportunity, "score" | "breakdown" | "whyScore" | "conflicts">): Opportunity {
  const scored = scoreOpportunity({
    title: partial.title,
    pipeline: partial.pipeline,
    moneyCents: partial.moneyCents,
    costCents: partial.costCents,
    pressAccess: partial.pressAccess,
    signals: detectSignals(partial.title, partial.summary, partial.tags.join(" ")),
    travelMinutes: partial.travelMinutes,
    deadline: partial.deadline,
    startAt: partial.startAt,
    photographersWelcome: partial.photographersWelcome,
    hotelTrade: partial.hotelTrade,
    confirmedPay: partial.id.startsWith("job-"),
    isProspect: partial.id.startsWith("prospect-"),
  })
  return {
    ...partial,
    score: scored.score,
    breakdown: scored.breakdown,
    whyScore: whyScore(
      {
        title: partial.title,
        pipeline: partial.pipeline,
        moneyCents: partial.moneyCents,
        costCents: partial.costCents,
        pressAccess: partial.pressAccess,
        signals: detectSignals(partial.title, partial.summary),
        travelMinutes: partial.travelMinutes,
        deadline: partial.deadline,
        startAt: partial.startAt,
        photographersWelcome: partial.photographersWelcome,
        hotelTrade: partial.hotelTrade,
      },
      scored.score
    ),
    conflicts: [],
  }
}

function fromJob(job: PhotoJob): Opportunity {
  const moneyCents = parseMoneyCents(job.pay)
  const contact = matchContact(job.employer)
  const signals = detectSignals(job.title, `${job.why} ${job.pay}`)
  const pipeline: Pipeline = /boudoir|nude|erotic|adult|onlyfans/i.test(
    `${job.title} ${job.why} ${job.employer}`
  )
    ? "adult"
    : "paid"
  const kind =
    pipeline === "adult" ? "Boudoir / Nude Pitch" : pitchKindFor(pipeline, true)
  const pitch = buildPitch(
    job.title,
    pipeline,
    kind,
    contact,
    job.type,
    undefined,
    job.why,
    defaultProfile
  )
  return finalize({
    id: `job-${job.id}`,
    title: job.title,
    pipeline,
    moneyLabel: moneyCents >= 80000 && /w-2/i.test(job.pay) ? "W-2 salary" : formatMoney(moneyCents, job.pay.split("·")[0].trim()),
    moneyCents,
    costLabel: "$0",
    costCents: 0,
    location: job.type,
    neighborhood: /naperville|frankfort|suburb/i.test(job.type)
      ? "Naperville / Frankfort"
      : "Chicagoland",
    travelMinutes: travelMinutes(job.type, job.employer),
    url: job.url,
    source: job.employer,
    sourceUrl: job.url,
    summary: job.why,
    pressAccess: "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: true,
    contact,
    nextAction:
      pipeline === "adult" ? "Apply" : nextActionFor(pipeline, "PHOTOGRAPHER_APPLICATION"),
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: "Rolling hire — apply this week before Filter swallows the calendar.",
    tags: ["job", job.employer.toLowerCase(), signals.salary ? "salary" : "gig"],
  })
}

function hotelTradeFrom(hotel: HotelCollab): HotelTrade {
  const meals = /breakfast|restaurant|food credit|tasting/i.test(`${hotel.meals} ${hotel.why}`)
  const realism =
    hotel.likelihood === "Already filled"
      ? "low"
      : hotel.photographerTrack || hotel.likelihood === "Marketplace"
        ? "high"
        : hotel.likelihood === "Apply now"
          ? "medium"
          : "medium"
  const campaign = hotel.photographerTrack
    ? "Photographer / creator program"
    : hotel.likelihood === "Apply now"
      ? "Influencer stay form"
      : hotel.likelihood === "Already filled"
        ? "Residency already awarded"
        : "Direct UGC / opening-season pitch"
  return {
    lodging:
      hotel.likelihood !== "Already filled" &&
      !/already filled|not an open|not a hosted stay/i.test(hotel.room),
    meals,
    parking: /parking/i.test(`${hotel.why} ${hotel.deliverables}`),
    credits: /credit|restaurant/i.test(`${hotel.meals} ${hotel.why}`),
    realism,
    campaign,
  }
}

function hotelTravelMinutes(hotel: HotelCollab) {
  if (hotel.region === "Worldwide") return 0
  if (hotel.city === "Chicago") return travelMinutes(hotel.neighborhood, hotel.address)
  return travelMinutes(hotel.country, "")
}

function fromHotel(hotel: HotelCollab): Opportunity {
  const trade = hotelTradeFrom(hotel)
  const paidAssignment = /paid assignment/i.test(hotel.room)
  const moneyCents = paidAssignment
    ? 50000
    : trade.lodging
      ? trade.realism === "high"
        ? 45000
        : 30000
      : 0
  const contact = matchContact(hotel.name)
  const pipeline: Pipeline = "hotel"
  const kind = pitchKindFor(pipeline, false)
  const where = `${hotel.city}, ${hotel.country}`
  const pitch = buildPitch(
    hotel.name,
    pipeline,
    kind,
    contact,
    where,
    undefined,
    hotel.why,
    defaultProfile
  )
  return finalize({
    id: `hotel-${hotel.id}`,
    title: `${hotel.name} content stay`,
    pipeline,
    moneyLabel: paidAssignment
      ? "Paid hotel assignments"
      : trade.lodging
        ? hotel.room.split("·")[0].trim()
        : "—",
    moneyCents,
    costLabel: "$0 to pitch",
    costCents: 0,
    location: where,
    neighborhood:
      hotel.region === "Worldwide"
        ? hotel.region
        : hotel.city === "Chicago"
          ? hotel.neighborhood
          : hotel.city,
    travelMinutes: hotelTravelMinutes(hotel),
    url: hotel.applyUrl,
    source: "Hotel scout",
    sourceUrl: hotel.applyUrl,
    summary: `${hotel.why} Campaign type: ${trade.campaign}. Meals ${trade.meals ? "negotiable" : "not included unless you shoot food"}. ${hotel.region} · ${where}.`,
    pressAccess: "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: hotel.photographerTrack,
    contact: contact ?? {
      name: `${hotel.name} marketing`,
      role: "Hotel marketing",
      company: hotel.name,
      contactUrl: hotel.applyUrl,
    },
    nextAction: hotel.likelihood === "Already filled" ? "Ask 2027" : "Pitch",
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder:
      hotel.likelihood === "Already filled"
        ? undefined
        : hotel.region === "Worldwide"
          ? "Apply from home. Request dates on a trip you are already taking so airfare stays yours."
          : "Pitch midweek dates that match occupancy. Do not assume one festival week is the only window.",
    tags: [
      "hotel",
      hotel.region.toLowerCase(),
      hotel.country.toLowerCase(),
      trade.campaign.toLowerCase(),
    ],
    hotelTrade: trade,
  })
}

function actingPitchKind(kind: ActingLead["kind"]): PitchKind {
  if (kind === "extra") return "Extra / Stand-in Registration"
  if (kind === "sro") return "Theater Networking"
  if (kind === "headshot-model" || kind === "headshot-location") return "Paid Headshot Pitch"
  return "Acting Audition Submission"
}

function fromActing(lead: ActingLead): Opportunity {
  const pipeline: Pipeline =
    lead.kind === "headshot-model" || lead.kind === "headshot-location" ? "headshots" : "acting"
  const kind = actingPitchKind(lead.kind)
  const contact = matchContact(lead.name)
  const pressAccess: PressAccess =
    lead.kind === "sro"
      ? /\$\d/.test(lead.cost)
        ? "PAID_TICKET"
        : "FREE"
      : pipeline === "headshots"
        ? "CLIENT_PITCH"
        : "AUDITION"
  const moneyCents = parseMoneyCents(`${lead.pay} ${lead.why}`)
  const costCents = parseCostCents(lead.cost)
  const pitch = buildPitch(
    lead.name,
    pipeline,
    kind,
    contact,
    `${lead.address}, ${lead.neighborhood}`,
    undefined,
    lead.why,
    defaultProfile
  )
  const nextAction =
    lead.kind === "sro" ? "RSVP" : lead.kind === "extra" ? "Register" : nextActionFor(pipeline, pressAccess)
  return finalize({
    id: `acting-${lead.id}`,
    title: lead.name,
    pipeline,
    moneyLabel:
      moneyCents > 0
        ? formatMoney(moneyCents)
        : pipeline === "headshots"
          ? lead.pay.split("·")[0].trim()
          : lead.kind === "sro"
            ? "In the room"
            : lead.pay.split("·")[0].trim(),
    moneyCents: moneyCents || (pipeline === "headshots" ? 25000 : lead.kind === "extra" ? 18000 : 0),
    costLabel: lead.cost.split("·")[0].trim(),
    costCents,
    location: `${lead.address}, ${lead.neighborhood}`,
    neighborhood: lead.neighborhood,
    travelMinutes: travelMinutes(lead.neighborhood, lead.address),
    url: lead.applyUrl,
    source: "Acting scout",
    sourceUrl: lead.applyUrl,
    summary: `${lead.why} ${lead.howToApply}`,
    pressAccess,
    photographersWelcome: pipeline === "headshots",
    contact: contact ?? {
      name: `${lead.name} desk`,
      role: pipeline === "headshots" ? "Recruiter" : "Casting director",
      company: lead.name,
      contactUrl: lead.applyUrl,
    },
    nextAction,
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder:
      pipeline === "headshots"
        ? "Quote a sitting fee. Do not shoot for exposure."
        : lead.kind === "sro"
          ? "This is how you stand in the room with other actors. It is not a paid role."
          : "Submit today. Chicago calls turn over in 24–72 hours.",
    tags: ["acting", lead.kind, lead.neighborhood.toLowerCase()],
  })
}

const BUSINESS_TAG: Record<AdChannel["businesses"][number], string> = {
  boudoir: "boudoir",
  headshots: "headshots-biz",
  onlyfans: "onlyfans",
}

function fromAdvertise(channel: AdChannel): Opportunity {
  const pipeline: Pipeline = "advertise"
  const kind: PitchKind = "Listing / Ad Copy"
  const contact = matchContact(channel.name)
  const pressAccess: PressAccess = "LISTING"
  const costCents = channel.price === "free" ? 0 : parseCostCents(channel.cost)
  const pitch = buildPitch(
    channel.name,
    pipeline,
    kind,
    contact,
    channel.address,
    undefined,
    `${channel.why} ${channel.terms}`,
    defaultProfile
  )
  const nextAction = channel.banRisk
    ? "Skip"
    : channel.price === "paid"
      ? "Budget"
      : "List"
  return finalize({
    id: `advertise-${channel.id}`,
    title: channel.name,
    pipeline,
    moneyLabel: channel.price === "free" ? "Free listing" : channel.price === "freemium" ? "Free + upgrades" : "Paid ads",
    moneyCents: 0,
    costLabel: channel.cost.split("·")[0].trim(),
    costCents,
    location: `${channel.address}, ${channel.neighborhood}`,
    neighborhood: channel.neighborhood,
    travelMinutes: /chicagoland|south loop|chicago (small|professionals|actors|weddings|metro|reddit)/i.test(
      channel.neighborhood
    )
      ? travelMinutes(channel.neighborhood, channel.address)
      : 0,
    url: channel.applyUrl,
    source: "Advertise scout",
    sourceUrl: channel.applyUrl,
    summary: `${channel.why} ${channel.howToApply} ${channel.terms}`,
    pressAccess,
    photographersWelcome: channel.businesses.some(
      (business) => business === "boudoir" || business === "headshots"
    ),
    contact: contact ?? {
      name: `${channel.name} desk`,
      role: "Marketing director",
      company: channel.name,
      contactUrl: channel.applyUrl,
    },
    nextAction,
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: channel.banRisk
      ? "Ban risk — do not funnel OnlyFans through this photography login."
      : channel.adultOnly
        ? "18+ only. Use a dedicated adult account. Nothing posts itself."
        : "List it yourself. This scout does not auto-post or spend ad budget.",
    tags: [
      "advertise",
      channel.price,
      ...channel.businesses.map((business) => BUSINESS_TAG[business]),
      ...(channel.adultOnly ? ["18+"] : []),
      ...(channel.banRisk ? ["ban-risk"] : []),
    ],
  })
}

function fundingPipeline(kind: FundingLead["kind"]): Pipeline {
  if (kind === "contest") return "contest"
  if (kind === "contract") return "contracts"
  return "grant"
}

function fundingPitchKind(kind: FundingLead["kind"]): PitchKind {
  if (kind === "contract") return "Government Contract Bid"
  if (kind === "capital") return "Capital / Loan Inquiry"
  return "Grant / Contest Entry"
}

function fromFunding(lead: FundingLead): Opportunity {
  const pipeline = fundingPipeline(lead.kind)
  const kind = fundingPitchKind(lead.kind)
  const contact = matchContact(lead.name)
  const pressAccess: PressAccess =
    lead.kind === "contract" ? "PHOTOGRAPHER_APPLICATION" : "FREE"
  const moneyCents = parseMoneyCents(lead.award)
  const costCents = parseCostCents(lead.cost)
  const pitch = buildPitch(
    lead.name,
    pipeline,
    kind,
    contact,
    `${lead.address}, ${lead.neighborhood}`,
    undefined,
    `${lead.why} ${lead.terms}`,
    defaultProfile
  )
  const nextAction = lead.scamRisk
    ? "Skip"
    : lead.kind === "contract"
      ? "Register"
      : lead.kind === "capital"
        ? "Book counselor"
        : lead.kind === "contest"
          ? "Start entry"
          : "Start entry"
  const travel =
    lead.region === "federal"
      ? 0
      : lead.region === "florida"
        ? travelMinutes(lead.neighborhood, "Florida")
        : travelMinutes(lead.neighborhood, lead.address)
  return finalize({
    id: `funding-${lead.id}`,
    title: lead.name,
    pipeline,
    moneyLabel: lead.award.split("·")[0].trim(),
    moneyCents,
    costLabel: lead.cost.split("·")[0].trim(),
    costCents,
    location: `${lead.address}, ${lead.neighborhood}`,
    neighborhood: lead.neighborhood,
    travelMinutes: travel,
    url: lead.applyUrl,
    source: "Funding scout",
    sourceUrl: lead.applyUrl,
    summary: `${lead.why} ${lead.howToApply} ${lead.terms}`,
    pressAccess,
    photographersWelcome: lead.kind !== "charity" || /photograph/i.test(lead.why),
    contact: contact ?? {
      name: `${lead.name} desk`,
      role: "Organizer",
      company: lead.name,
      contactUrl: lead.applyUrl,
    },
    nextAction,
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: lead.scamRisk
      ? "Do not pay a grant mill. Use the official .gov portals only."
      : lead.kind === "charity"
        ? "Foundations fund nonprofits. Partner or fiscal-sponsor — do not fake a 501(c)(3)."
        : lead.kind === "capital"
          ? "Counselors are free. Loans are repaid. This is not a gift."
          : lead.kind === "contract"
            ? "Register on the official portal. This scout does not bid for you."
            : "Read this cycle’s PDF. Nothing auto-submits.",
    tags: [
      "funding",
      lead.kind,
      lead.region,
      lead.neighborhood.toLowerCase(),
      ...(lead.scamRisk ? ["scam-risk"] : []),
    ],
  })
}

function houseSitTravel(lead: HouseSitLead) {
  if (lead.region === "worldwide") return 0
  if (lead.region === "florida") return travelMinutes(lead.neighborhood, "Florida")
  if (lead.region === "europe") return travelMinutes("europe", "")
  if (lead.region === "illinois") return travelMinutes("chicagoland", lead.address)
  return travelMinutes(lead.neighborhood, lead.address)
}

function fromHouseSit(lead: HouseSitLead): Opportunity {
  const pipeline: Pipeline = "housesit"
  const kind: PitchKind = "House Sit Application"
  const contact = matchContact(lead.name)
  const paid = lead.kind === "paid-caretaker" && !/lodging only/i.test(lead.pay)
  const pressAccess: PressAccess = paid ? "PHOTOGRAPHER_APPLICATION" : "FREE"
  const moneyCents = paid ? parseMoneyCents(lead.pay) || 35000 : 0
  const costCents = parseCostCents(lead.cost)
  const pitch = buildPitch(
    lead.name,
    pipeline,
    kind,
    contact,
    `${lead.address}, ${lead.neighborhood}`,
    undefined,
    `${lead.why} ${lead.terms}`,
    defaultProfile
  )
  const trade: HotelTrade | undefined = paid
    ? undefined
    : {
        lodging: true,
        meals: false,
        parking: false,
        credits: false,
        realism: lead.kind === "luxury-sit" ? "medium" : "low",
        campaign: "House sit · lodging for care (not a hotel content stay)",
      }
  return finalize({
    id: `housesit-${lead.id}`,
    title: lead.name,
    pipeline,
    moneyLabel: paid ? lead.pay.split("·")[0].trim() : "Lodging",
    moneyCents,
    costLabel: lead.cost.split("·")[0].trim(),
    costCents,
    location: `${lead.address}, ${lead.neighborhood}`,
    neighborhood: lead.neighborhood,
    travelMinutes: houseSitTravel(lead),
    url: lead.applyUrl,
    source: "House-sit scout",
    sourceUrl: lead.applyUrl,
    summary: `${lead.why} ${lead.howToApply} ${lead.terms}`,
    pressAccess,
    photographersWelcome: false,
    contact: contact ?? {
      name: `${lead.name} desk`,
      role: "Recruiter",
      company: lead.name,
      contactUrl: lead.applyUrl,
    },
    nextAction: lead.scamRisk ? "Skip" : "Apply",
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: lead.scamRisk
      ? "Do not pay a placement mill. Use TrustedHousesitters or a named agency."
      : paid
        ? "This is employment or a stipend. Ask wage vs housing in writing."
        : "Lodging for care. Not a paycheck. Not a hotel content stay. Nothing auto-applies.",
    tags: [
      "housesit",
      lead.kind,
      lead.region,
      lead.neighborhood.toLowerCase(),
      ...(lead.scamRisk ? ["scam-risk"] : []),
    ],
    hotelTrade: trade,
  })
}

function eventPipeline(event: PhotoEvent): Pipeline {
  if (/fotoworks|roaming review|portfolio review/i.test(event.title)) return "review"
  if (event.kind === "Hiring" || event.careerFit === "Get hired") return "paid"
  if (event.kind === "Workshop") return "workshop"
  if (/fashion|model/.test(`${event.title} ${event.why}`)) return "fashion"
  if (event.kind === "Networking" || event.kind === "Festival") return "networking"
  return "general"
}

function fromCatalogEvent(event: PhotoEvent, startAt: string, endAt: string): Opportunity {
  const pipeline = eventPipeline(event)
  const costCents = parseCostCents(event.cost)
  const moneyCents = pipeline === "paid" && costCents === 0 ? 0 : 0
  const signals = detectSignals(event.title, `${event.why} ${event.cost} ${event.kind}`)
  const pressAccess = detectPressAccess(event.title, event.why, event.cost, signals)
  const contact = matchContact(`${event.venue} ${event.title}`)
  const kind = pitchKindFor(pipeline, pressAccess === "PHOTOGRAPHER_APPLICATION")
  const pitch = buildPitch(
    event.title,
    pipeline,
    kind,
    contact,
    `${event.venue}, ${event.address}`,
    startAt,
    event.why,
    defaultProfile
  )
  const deadline =
    event.rsvpNote || /rsvp|register/i.test(`${event.cost} ${event.howToUse}`)
      ? startAt
      : undefined
  return finalize({
    id: `event-${event.id}-${startAt.slice(0, 10)}`,
    title: event.title,
    pipeline,
    moneyLabel:
      pipeline === "review"
        ? "Portfolio"
        : pipeline === "paid"
          ? "Hiring floor"
          : pipeline === "networking"
            ? "Leads"
            : "—",
    moneyCents,
    costLabel: event.cost.split("·")[0].trim(),
    costCents,
    deadline,
    startAt,
    endAt,
    location: `${event.venue}, ${event.address}`,
    neighborhood: event.neighborhood,
    travelMinutes: travelMinutes(event.neighborhood, event.address),
    url: event.url,
    source: "South Loop catalog",
    sourceUrl: "/events",
    summary: event.why,
    pressAccess,
    photographersWelcome: true,
    contact: contact ?? {
      name: event.venue,
      role: "Organizer",
      company: event.venue,
      contactUrl: event.url,
    },
    nextAction: nextActionFor(pipeline, pressAccess),
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: event.rsvpNote,
    tags: [event.kind.toLowerCase(), event.careerFit.toLowerCase()],
  })
}

function fromScout(event: ScoutEvent): Opportunity {
  const signals = detectSignals(event.title, `${event.summary} ${event.cost || ""}`)
  const pipeline = classifyPipeline(signals, "general")
  const costCents = parseCostCents(event.cost || event.summary)
  const moneyCents = parseMoneyCents(`${event.title} ${event.summary}`)
  const pressAccess: PressAccess = detectPressAccess(
    event.title,
    event.summary,
    event.cost || "",
    signals
  )
  const contact = matchContact(`${event.source} ${event.title}`)
  const kind = pitchKindFor(pipeline, signals.photoApplication)
  const pitch = buildPitch(
    event.title,
    pipeline,
    kind,
    contact,
    event.location,
    event.startAt,
    event.summary,
    defaultProfile
  )
  return finalize({
    id: event.id,
    title: event.title,
    pipeline,
    moneyLabel:
      moneyCents > 0
        ? formatMoney(moneyCents)
        : pipeline === "networking"
          ? "Leads"
          : pipeline === "acting"
            ? "Role / extra"
            : pipeline === "headshots"
              ? "Client"
            : pipeline === "advertise"
              ? "Listing"
            : pipeline === "grant"
              ? "Grant"
            : pipeline === "contracts"
              ? "Contract"
            : pipeline === "housesit"
              ? "Lodging"
            : pipeline === "contest"
              ? "Award"
          : pipeline === "fashion" || pressAccess === "MEDIA_PASS_POSSIBLE"
            ? "Portfolio"
            : "—",
    moneyCents,
    costLabel: event.cost || (pressAccess === "FREE" ? "$0" : "See listing"),
    costCents,
    startAt: event.startAt,
    endAt: event.endAt,
    deadline: event.startAt,
    location: event.location,
    neighborhood: event.location,
    travelMinutes: travelMinutes(event.location, event.location),
    url: event.url,
    source: event.source,
    sourceUrl: event.sourceUrl,
    summary: event.summary,
    pressAccess,
    photographersWelcome: signals.photographersWelcome,
    contact: contact ?? contactFromParts(
      undefined,
      event.source,
      undefined,
      event.url,
      "Organizer"
    ),
    nextAction: nextActionFor(pipeline, pressAccess),
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    tags: [event.source.toLowerCase(), pipeline],
  })
}

function fromSeed(seed: (typeof seeds)[number]): Opportunity {
  const kind = seed.tags.includes("talent")
    ? "Adult Talent Application"
    : pitchKindFor(seed.pipeline, seed.pressAccess === "PHOTOGRAPHER_APPLICATION")
  const pitch = buildPitch(
    seed.title,
    seed.pipeline,
    kind,
    seed.contact,
    seed.location,
    seed.startAt,
    seed.summary,
    defaultProfile
  )
  return finalize({
    id: seed.id,
    title: seed.title,
    pipeline: seed.pipeline,
    moneyLabel: seed.moneyLabel,
    moneyCents: seed.moneyCents,
    costLabel: seed.costLabel,
    costCents: seed.costCents,
    deadline: seed.deadline,
    startAt: seed.startAt,
    endAt: seed.endAt,
    location: seed.location,
    neighborhood: seed.neighborhood,
    travelMinutes: travelMinutes(seed.neighborhood, seed.location),
    url: seed.url,
    source: seed.source,
    sourceUrl: seed.url,
    summary: seed.summary,
    pressAccess: seed.pressAccess,
    photographersWelcome: seed.photographersWelcome,
    contact: seed.contact,
    nextAction: seed.tags.includes("talent")
      ? "Apply"
      : nextActionFor(seed.pipeline, seed.pressAccess),
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    tags: seed.tags,
    hotelTrade: seed.hotelTrade,
  })
}

function fromProspect(prospect: CompanyProspect): Opportunity {
  const pipeline: Pipeline = /boudoir|adult|nude|erotic|onlyfans|fetish/i.test(
    prospect.industry
  )
    ? "adult"
    : prospect.industry === "Fashion brands"
    ? "fashion"
    : prospect.industry === "Modeling agencies"
      ? "headshots"
    : prospect.industry === "Tourism board"
      ? "press"
      : "paid"
  const kind =
    pipeline === "adult"
      ? ("Boudoir / Nude Pitch" as const)
      : pipeline === "headshots"
        ? ("Paid Headshot Pitch" as const)
        : ("Company Prospecting" as const)
  const pitch = buildPitch(
    `${prospect.company} photography retainer`,
    pipeline,
    kind,
    prospect.contact,
    prospect.neighborhood,
    undefined,
    prospect.why,
    defaultProfile
  )
  return finalize({
    id: prospect.id,
    title: `${prospect.company} — ${prospect.likelyNeed}`,
    pipeline,
    moneyLabel: prospect.moneyLabel,
    moneyCents: prospect.moneyCents,
    costLabel: "$0",
    costCents: 0,
    location: prospect.neighborhood,
    neighborhood: prospect.neighborhood,
    travelMinutes: travelMinutes(prospect.neighborhood),
    url: prospect.url,
    source: "Weekly company scout",
    sourceUrl: prospect.url,
    summary: `${prospect.why} They are not advertising a photographer opening. Pitch ${prospect.likelyNeed}.`,
    pressAccess: pipeline === "press" ? "MEDIA_PASS_POSSIBLE" : pipeline === "headshots" ? "CLIENT_PITCH" : "PHOTOGRAPHER_APPLICATION",
    photographersWelcome: true,
    contact: prospect.contact,
    nextAction: "Pitch",
    pitchKind: kind,
    pitchSubject: pitch.subject,
    pitchBody: pitch.body,
    reminder: "Weekly lead — they do not have to be hiring to need photos.",
    tags: ["prospect", prospect.industry.toLowerCase()],
  })
}

function mergeKey(item: Opportunity) {
  const title = normalizeTitle(item.title).slice(0, 48)
  if (
    item.pipeline === "hotel" ||
    item.pipeline === "housesit" ||
    item.pipeline === "acting" ||
    item.pipeline === "headshots" ||
    item.pipeline === "advertise" ||
    item.pipeline === "grant" ||
    item.pipeline === "contest" ||
    item.pipeline === "contracts" ||
    item.pipeline === "adult" ||
    (item.pipeline === "paid" && !item.startAt) ||
    item.pipeline === "workshop"
  ) {
    return `${title}|${item.pipeline}`
  }
  const date = (item.startAt || item.deadline || "").slice(0, 10)
  return `${title}|${date}|${item.pipeline}`
}

function mergeOpportunities(items: Opportunity[]) {
  const byKey = new Map<string, Opportunity>()
  for (const item of items) {
    const key = mergeKey(item)
    const existing = byKey.get(key)
    if (!existing) {
      byKey.set(key, item)
      continue
    }
    const same =
      titlesMatch(existing.title, item.title) || existing.id === item.id
    if (!same) {
      byKey.set(`${key}|${item.id}`, item)
      continue
    }
    const prefer =
      item.moneyCents > existing.moneyCents ||
      (item.source === "South Loop catalog" && existing.source !== "South Loop catalog") ||
      item.score > existing.score
    if (prefer) byKey.set(key, item)
  }
  return [...byKey.values()]
}

function attachConflicts(items: Opportunity[]) {
  return items.map((item) => {
    const hits = items
      .filter((other) => overlaps(item, other) && other.score >= 70 && item.score >= 55)
      .map((other) => other.title)
    return { ...item, conflicts: hits }
  })
}

function isToday(iso?: string) {
  if (!iso) return false
  const a = new Date(iso).toLocaleDateString("en-CA", { timeZone: "America/Chicago" })
  const b = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" })
  return a === b
}

function withinHours(iso: string | undefined, hours: number) {
  if (!iso) return false
  const delta = new Date(iso).getTime() - Date.now()
  return delta >= 0 && delta <= hours * 36e5
}

export function buildBrief(opportunities: Opportunity[], overdueFollowUps = 0): DeskPayload["brief"] {
  const ranked = [...opportunities].sort((a, b) => b.score - a.score)
  const applyToday = ranked
    .filter(
      (item) =>
        (item.pipeline === "paid" || item.nextAction === "Apply" || item.nextAction === "Pitch" || item.nextAction === "List") &&
        (withinHours(item.deadline, 36) || isToday(item.deadline) || item.score >= 92)
    )
    .slice(0, 5)
  const pressClosing = ranked
    .filter(
      (item) =>
        (item.pipeline === "press" || item.pressAccess === "MEDIA_PASS_POSSIBLE") &&
        withinHours(item.deadline || item.startAt, 24 * 8)
    )
    .slice(0, 4)
  const companiesToPitch = ranked
    .filter((item) => item.tags.includes("prospect"))
    .slice(0, 5)
  const hotelLeads = ranked.filter((item) => item.pipeline === "hotel" && item.score >= 70).slice(0, 3)
  const tonightNetworking = ranked
    .filter(
      (item) =>
        (item.pipeline === "networking" || item.pipeline === "fashion" || item.pipeline === "general") &&
        (isToday(item.startAt) || withinHours(item.startAt, 18))
    )
    .slice(0, 3)

  const headline = `${applyToday.length} opportunities to apply for today, ${pressClosing.length} press credentials closing soon, ${companiesToPitch.length} companies worth pitching, ${hotelLeads.length} hotel collaboration lead${hotelLeads.length === 1 ? "" : "s"}, ${overdueFollowUps} follow-ups overdue, and ${tonightNetworking.length ? "tonight’s best networking event is already on the list" : "no must-attend networking tonight"}.`

  return {
    headline,
    applyToday,
    pressClosing,
    companiesToPitch,
    hotelLeads,
    tonightNetworking,
    overdueFollowUps,
  }
}

export async function assembleDesk(options?: { force?: boolean }): Promise<DeskPayload> {
  const scout = await runScout({ force: options?.force })

  const fromEvents: Opportunity[] = []
  for (const event of events) {
    const matches = catalogScoutEvents().filter((item) =>
      titlesMatch(item.title, event.title)
    )
    if (matches.length === 0) continue
    const seen = new Set<string>()
    for (const match of matches) {
      const key = match.startAt.slice(0, 10)
      if (seen.has(key)) continue
      seen.add(key)
      fromEvents.push(fromCatalogEvent(event, match.startAt, match.endAt))
    }
  }

  const live = scout.events
    .filter((event) => event.source !== "South Loop catalog")
    .map(fromScout)

  const assembled = attachConflicts(
    mergeOpportunities([
      ...jobs.map(fromJob),
      ...hotels.map(fromHotel),
      ...houseSitLeads.map(fromHouseSit),
      ...actingLeads.map(fromActing),
      ...advertiseChannels.map(fromAdvertise),
      ...fundingLeads.map(fromFunding),
      ...fromEvents,
      ...live,
      ...seeds.map(fromSeed),
      ...adultSeeds.map(fromSeed),
      ...weeklyProspects().map(fromProspect),
    ]).sort((a, b) => b.score - a.score || (a.startAt || "").localeCompare(b.startAt || ""))
  )

  const pipelineCounts = Object.fromEntries(
    PIPELINES.map((pipeline) => [
      pipeline,
      assembled.filter((item) => item.pipeline === pipeline).length,
    ])
  ) as Record<Pipeline, number>

  return {
    scannedAt: scout.scannedAt,
    sources: scout.sources as SourceStatus[],
    watchSearches: WATCH_SEARCHES,
    opportunities: assembled,
    brief: buildBrief(assembled),
    pipelineCounts,
  }
}
