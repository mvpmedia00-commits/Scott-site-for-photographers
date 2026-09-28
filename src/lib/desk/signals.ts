import type { Pipeline, PressAccess } from "@/lib/desk/types"

export type Signals = {
  paidWork: boolean
  job: boolean
  gig: boolean
  salary: boolean
  free: boolean
  ticketed: boolean
  press: boolean
  mediaPass: boolean
  photoApplication: boolean
  networking: boolean
  celebrity: boolean
  fashion: boolean
  models: boolean
  creators: boolean
  hotel: boolean
  housesit: boolean
  acting: boolean
  headshot: boolean
  advertise: boolean
  contest: boolean
  grant: boolean
  contract: boolean
  review: boolean
  workshop: boolean
  photographersWelcome: boolean
  recurringWalk: boolean
  adult: boolean
}

const JOB =
  /hiring|job fair|career fair|staff photographer|we're hiring|now hiring|apply now|w-2|1099|per hour|\/hr|salary|photographer wanted|seeking (a )?photographer/i
const GIG =
  /event photographer|wedding photographer|second shooter|associate photographer|day rate|photographer wanted|staff photographer/i
const PRESS =
  /press pass|media pass|media credential|accreditation|credential deadline|press contact|press room|for media|media kit/i
const PHOTO_APP =
  /photographer application|call for photographers|official photographer|shoot the event|cover the (show|event)|credential(s)? for photographers/i
const FASHION = /fashion|runway|couture|stylemax|apparel|lookbook|campaign/i
const MODELS = /model call|modeling|models? |creator night|influencer mixer|casting/i
const HOTEL =
  /hotel|stayamo|sur[oō]|vayada|accor|oyo frames|loews|marriott|hyatt|visitbritain|tourism australia|hotel creators|influencer stay|creator stay|ugc|comp room|hosted stay|content stay|tourism board|media centre|creator academy/i
const HOUSE_SIT =
  /house.?sit|housesit|house sitting|pet sitting assignment|trustedhousesitters|nomador|mindmyhouse|housecarers|caretaker gazette|estate caretaker|luxury house sit|housesitmatch|house manager|household staffing/i
const ACTING =
  /audition|acting job|actor wanted|actors wanted|self-tape|callback|equity principal|\bepa\b|\becc\b|casting call|background extra|stand-?in|photo double|atmosphere artist|one chicago|chicago fire extras|chicago med extras|chicago p\.?d\.? extras|joan philo|cine-casting|bokeh background/i
const SRO =
  /standing room|broadway in chicago|rush ticket|ticket lottery|\busher\b|the saints|steppenwolf usher/i
const HEADSHOT =
  /headshot|model digitals|comp card|photographer wanted|need(s)? (new )?headshots|paying for (headshots|digitals)|listing photos|peerspace|film office location|studio rental photo/i
const ADVERTISE =
  /google business|gbp listing|apple business connect|bing places|yelp (business|ads|for business)|thumbtack|bark\.com|nextdoor|alignable|google ads|meta ads|facebook ads|instagram ads|pinterest ads|linkedin ads|campaign manager|onlyfinder|trafficjunky|exoclick|advertise (your )?(boudoir|headshot|photography|onlyfans)|business listing|local seo|craigslist chicago services|linktree|beacons\.ai|r\/onlyfanspromotions|fetlife groups|weddingwire|the knot|paid shoutout|ban risk/i
const CONTEST = /contest|call for entry|open call|competition|award|juried/i
const GRANT = /grant|fellowship|residency|individual artist|dceo|sbdc|microloan|sba |grants\.gov|nea |humanities/i
const CONTRACT =
  /sam\.gov|bidbuy|procurement|request for (proposal|quote)|\brfq\b|\brfp\b|vendor registration|myfloridamarketplace|eprocurement|government contract|gov contract|capability statement|naics 54192/i
const REVIEW = /portfolio review|roaming review|fotoworks|reviewer/i
const WORKSHOP = /workshop|class|masterclass|intensive|photo walk|meetup/i
const CELEB = /celebrity|keynote|headliner|famous|a-list|red carpet/i
const WELCOME =
  /photographer|photography|photojournal|asmp|apa |filter photo|press photographer|visual journalist|creator program/i
const WALK = /photo walk|photography group|meetup|camera club/i
const ADULT =
  /boudoir|nude|erotic|adult content|onlyfans|justforfans|fetish|glamour nude|artistic nude|figure drawing|life drawing|life model|pin-?up|implied nude|topless|nsfw|18\+|xxx|porn|adult film|adult performer|male talent|casting couch/i

export function hay(title: string, summary = "", extra = "") {
  return `${title} ${summary} ${extra}`.toLowerCase()
}

export function detectSignals(title: string, summary = "", extra = ""): Signals {
  const text = hay(title, summary, extra)
  const job = JOB.test(text)
  const gig = GIG.test(text)
  const press = PRESS.test(text)
  const photoApplication = PHOTO_APP.test(text)
  const fashion = FASHION.test(text)
  const workshop = WORKSHOP.test(text)
  const review = REVIEW.test(text)
  const grant = GRANT.test(text)
  const contest = CONTEST.test(text) && !grant
  const contract = CONTRACT.test(text)
  const hotel = HOTEL.test(text)
  const housesit = HOUSE_SIT.test(text)
  const acting = ACTING.test(text) || SRO.test(text)
  const headshot = HEADSHOT.test(text)
  const advertise = ADVERTISE.test(text)
  const models = MODELS.test(text)
  const free = /\bfree\b|no cost|comp(ed|limentary)|\$0/.test(text)
  const ticketed = /\$\d+|ticket|paid registration|early-bird/.test(text) && !free
  return {
    paidWork: job || gig || /\$\d{3,}/.test(text),
    job,
    gig,
    salary: /w-2|full-time|salary/.test(text),
    free,
    ticketed,
    press,
    mediaPass: press || /media career|newsroom|headline club/.test(text),
    photoApplication,
    networking: /network|mixer|reception|fair|roundtable|creator/.test(text),
    celebrity: CELEB.test(text),
    fashion,
    models,
    creators: /creator|ugc|influencer/.test(text),
    hotel,
    housesit,
    acting,
    headshot,
    advertise,
    contest,
    grant,
    contract,
    review,
    workshop,
    photographersWelcome:
      WELCOME.test(text) ||
      job ||
      gig ||
      press ||
      photoApplication ||
      ADULT.test(text) ||
      headshot ||
      grant ||
      contract,
    recurringWalk: WALK.test(text) && !job && !press && !review && !ADULT.test(text),
    adult: ADULT.test(text),
  }
}

export function classifyPipeline(signals: Signals, fallback: Pipeline = "general"): Pipeline {
  if (signals.advertise && !signals.job && !signals.gig) return "advertise"
  if (signals.adult) return "adult"
  if (signals.headshot) return "headshots"
  if (signals.acting) return "acting"
  if (signals.contract && !signals.job) return "contracts"
  if (signals.housesit) return "housesit"
  if (signals.job || (signals.gig && signals.paidWork && !signals.workshop)) return "paid"
  if (signals.hotel) return "hotel"
  if (signals.grant) return "grant"
  if (signals.contest) return "contest"
  if (signals.review) return "review"
  if (signals.press || signals.mediaPass || signals.photoApplication) {
    if (signals.fashion) return "fashion"
    return "press"
  }
  if (signals.fashion && (signals.models || !signals.workshop)) return "fashion"
  if (signals.models || signals.creators) return "networking"
  if (signals.workshop || signals.recurringWalk) return "workshop"
  if (signals.networking) return "networking"
  return fallback
}

export function detectPressAccess(
  title: string,
  summary: string,
  costLabel: string,
  signals: Signals
): PressAccess {
  if (signals.advertise) return "LISTING"
  if (signals.contract) return "PHOTOGRAPHER_APPLICATION"
  if (signals.photoApplication) return "PHOTOGRAPHER_APPLICATION"
  if (signals.headshot) return "CLIENT_PITCH"
  if (signals.acting) return "AUDITION"
  if (signals.press || signals.mediaPass) return "MEDIA_PASS_POSSIBLE"
  if (signals.free || /free/i.test(costLabel) || costLabel === "$0") return "FREE"
  if (signals.ticketed || /\$\d+/.test(costLabel)) return "PAID_TICKET"
  if (signals.job || signals.gig) return "PHOTOGRAPHER_APPLICATION"
  return /free/i.test(`${title} ${summary}`) ? "FREE" : "PAID_TICKET"
}

export function parseMoneyCents(text: string): number {
  if (!text) return 0
  const eightHour = text.match(
    /\$\s*([\d,]+)\s*(?:first hour|\/\s*first)/i
  )
  if (eightHour) {
    // Candid-style $250 first / $100 second / $80 after ≈ $830 / 8hr
    if (/250/.test(text) && /100/.test(text) && /80/.test(text)) return 83000
  }
  if (/\$\s*100\s*\/\s*hour/i.test(text) || /\$100\/hour/i.test(text)) return 80000
  if (/\$400/.test(text) && /full day|secondary/i.test(text)) return 40000
  if (/w-2|full-time employee/i.test(text)) return 120000
  const day = text.match(/\$\s*([\d,]+)\s*(?:\/\s*)?(?:day|gig|event)/i)
  if (day) return Number(day[1].replace(/,/g, "")) * 100
  const hour = text.match(/\$\s*([\d,]+)\s*(?:\/\s*hr|an hour|per hour)/i)
  if (hour) return Number(hour[1].replace(/,/g, "")) * 800
  const plain = text.match(/\$\s*([\d,]+)/)
  if (plain) {
    const n = Number(plain[1].replace(/,/g, ""))
    if (n >= 20 && n <= 20000) return n * 100
  }
  if (/\b2 nights?\b/i.test(text)) return 40000
  if (/\b3 nights?\b/i.test(text)) return 55000
  return 0
}

export function parseCostCents(text: string): number {
  if (!text) return 0
  if (/\bfree\b|\$0|no cost|comp/i.test(text) && !/non-members/.test(text)) return 0
  const member = text.match(/\$(\d+)\s*non-members/i)
  if (member) return Number(member[1]) * 100
  const paid = text.match(/\$\s*([\d,]+(?:\.\d{2})?)/)
  if (paid) {
    const n = Number(paid[1].replace(/,/g, ""))
    if (n > 0 && n < 5000) return Math.round(n * 100)
  }
  if (/ticketed|paid registration/i.test(text)) return 2500
  return 0
}

export function formatMoney(cents: number, fallback = "—") {
  if (cents <= 0) return fallback
  return `$${Math.round(cents / 100).toLocaleString("en-US")}`
}

export function learningTokens(title: string, pipeline: Pipeline) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)
  return [...new Set([pipeline, ...words.slice(0, 8)])]
}
