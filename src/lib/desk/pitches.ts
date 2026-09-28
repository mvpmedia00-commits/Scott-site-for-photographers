import { defaultProfile } from "@/data/profile"
import type {
  DeskProfile,
  Opportunity,
  OpportunityContact,
  PitchKind,
  Pipeline,
} from "@/lib/desk/types"

const KIND: Record<Pipeline, PitchKind> = {
  paid: "Freelance Photographer Application",
  press: "Media Credential Request",
  fashion: "Media Credential Request",
  networking: "Portfolio Introduction",
  hotel: "Hotel Content Exchange",
  housesit: "House Sit Application",
  acting: "Acting Audition Submission",
  headshots: "Paid Headshot Pitch",
  advertise: "Listing / Ad Copy",
  contest: "Grant / Contest Entry",
  grant: "Grant / Contest Entry",
  contracts: "Government Contract Bid",
  review: "Portfolio Introduction",
  workshop: "Portfolio Introduction",
  general: "Event Photographer Pitch",
  adult: "Boudoir / Nude Pitch",
}

export function pitchKindFor(pipeline: Pipeline, photoApp: boolean): PitchKind {
  if (pipeline === "adult") return "Boudoir / Nude Pitch"
  if (pipeline === "acting") return "Acting Audition Submission"
  if (pipeline === "headshots") return "Paid Headshot Pitch"
  if (pipeline === "advertise") return "Listing / Ad Copy"
  if (pipeline === "housesit") return "House Sit Application"
  if (pipeline === "contracts") return "Government Contract Bid"
  if (photoApp && (pipeline === "general" || pipeline === "fashion")) {
    return "Event Photographer Pitch"
  }
  return KIND[pipeline]
}

export function nextActionFor(pipeline: Pipeline, press: Opportunity["pressAccess"]) {
  if (pipeline === "paid") return "Apply"
  if (pipeline === "adult") return "Pitch"
  if (pipeline === "hotel") return "Pitch"
  if (pipeline === "housesit") return "Apply"
  if (pipeline === "acting") return "Apply"
  if (pipeline === "headshots") return "Pitch"
  if (pipeline === "advertise" || press === "LISTING") return "List"
  if (pipeline === "contracts") return "Register"
  if (press === "AUDITION") return "Apply"
  if (press === "CLIENT_PITCH") return "Pitch"
  if (press === "MEDIA_PASS_POSSIBLE") return "Request pass"
  if (press === "PHOTOGRAPHER_APPLICATION") return "Apply as photographer"
  if (pipeline === "grant" || pipeline === "contest") return "Start entry"
  if (pipeline === "review") return "Register"
  if (pipeline === "workshop") return "Low priority"
  if (pipeline === "networking") return "RSVP"
  return "Review"
}

function signOff(profile: DeskProfile) {
  const who = profile.name.trim() || "Matthew"
  const lines = [who]
  if (profile.email) lines.push(profile.email)
  if (profile.instagram) lines.push(profile.instagram)
  if (profile.portfolio) lines.push(profile.portfolio)
  return lines.join("\n")
}

export function buildPitch(
  title: string,
  pipeline: Pipeline,
  kind: PitchKind,
  contact: OpportunityContact | undefined,
  location: string,
  startAt: string | undefined,
  summary: string,
  profile: DeskProfile = defaultProfile
) {
  const who = profile.name.trim() || "Matthew"
  const hello = contact?.name && !/team|desk|unknown/i.test(contact.name)
    ? `Hello ${contact.name.split(" ")[0]},`
    : `Hello ${contact?.company || "team"},`
  const when = startAt
    ? new Date(startAt).toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "America/Chicago",
      })
    : "the coming weeks"
  const portfolio = profile.portfolio || "my portfolio (happy to send a 10-image set today)"
  const body = (() => {
    switch (kind) {
      case "Media Credential Request":
        return `${hello}

I am ${who}, a Chicago photographer requesting a media / photographer credential for ${title} (${when}, ${location}).

I would cover the room for publication and for the organizer’s own channels: a tight edit of 25–40 images within 48 hours, captioned, with photographer credit. I am not asking for a guest ticket — I am asking to work.

${summary}

Portfolio: ${portfolio}

If credentials are closed, I can still file a photographer application or second-shooter request.

Thank you,
${signOff(profile)}`
      case "Event Photographer Pitch":
        return `${hello}

I am ${who}, a Chicago photographer available to cover ${title} on ${when}.

Typical event coverage for me is a $500–$830 day: full ceremony/program, details, crowd, and a same-week gallery. If you already have a photographer, I can second-shoot or handle VIP/backstage.

${summary}

Portfolio: ${portfolio}

I can send a one-page estimate today.

${signOff(profile)}`
      case "Hotel Content Exchange":
        return `${hello}

I am ${who}, a photographer proposing a hosted stay${location ? ` (${location})` : ""} in exchange for a real content set — interiors, common spaces, and one restaurant or breakfast story.

I will match dates to your occupancy calendar. Midweek and shoulder season are usually easier to comp than sold-out weekends. If a festival, opening, or media moment is already on your books, I will build the stay around that — I am not locking this to one city or one festival week.

Deliverables I put in writing:
• 30–40 edited stills
• 1 reel + 1 carousel within 7 days
• 6–8 Stories tagging the property
• usage of 10 images on your channels with photographer credit

Meals, parking, or a restaurant credit are part of the ask only if I photograph them. Airfare stays mine unless you invite a press itinerary.

Portfolio: ${portfolio}

${signOff(profile)}`
      case "Freelance Photographer Application":
        return `${hello}

I am ${who}, applying for ${title}. I shoot events and editorial in Chicago and I am looking for paid, repeating work — not a one-off photo walk.

I can work weekends, bring backup bodies, and deliver on deadline. Happy to send a wedding/event or editorial set matched to this role.

${summary}

Portfolio: ${portfolio}

${signOff(profile)}`
      case "Company Prospecting":
        return `${hello}

I am ${who}, a Chicago photographer. I am not waiting for a job post — I work with businesses that need recurring photos (new inventory, events, staff, listings, menus) and I wanted to introduce myself to ${contact?.company || "your team"}.

A monthly retainer or a $500 event day is the usual starting point. I can send a relevant 8-image sample for your industry this week.

${signOff(profile)}`
      case "Grant / Contest Entry":
        return `${hello}

I am ${who}, submitting / requesting guidelines for ${title}.

MVP Media is a photography company (headshots, portraits, boudoir 18+). I can send a project statement, work samples, a simple budget, and a timeline this week. If this cycle requires a 501(c)(3), I will apply with a fiscal sponsor or partner — I will not pretend the LLC is a charity.

${summary}

Portfolio: ${portfolio}

${signOff(profile)}`
      case "Government Contract Bid":
        return `${hello}

I am ${who}, registering / bidding as MVP Media for ${title}.

Photography services: portrait/headshot (NAICS 541921) and commercial/event (NAICS 541922). I can provide a one-page capability statement, insurance certificates, and a UEI/SAM record. I bid only what I can shoot and deliver on the stated timeline.

${summary}

Portfolio: ${portfolio}
Email: ${profile.email || "mvpmedia00@gmail.com"}

This is not submitted until I paste it into the official portal.

${signOff(profile)}`
      case "Capital / Loan Inquiry":
        return `${hello}

I am ${who}, owner of MVP Media (photography). I want a counseling appointment / current-cycle check for ${title} (${location}).

I am not asking for a mystery grant from an ad. I want to know which loan, microloan, or actual open grant I qualify for this quarter, with EIN and a one-page use of funds.

${summary}

${signOff(profile)}`
      case "House Sit Application":
        return `${hello}

I am ${who}, applying to house-sit ${title} (${location}).

I am a responsible live-in sitter: I follow house and pet instructions, I do not throw parties, and I can do a video meet-and-greet this week. I travel with ID. If you want property photos for insurance or a listing, I can do that as a separate, written ask — I am applying to sit, not to turn your home into a content stay.

${summary}

References and profile: ${portfolio}

This is not submitted until I send it on the official board.

${signOff(profile)}`
      case "Boudoir / Nude Pitch":
        return `${hello}

I am ${who}, a Chicagoland photographer. I shoot boudoir, artistic nude, and erotic stills for consenting adults 18+. I want paid, repeating work — studio associate days, creator content, or event coverage — with written usage and ID on file.

I can send an NSFW-safe preview set (faces optional) and a one-page rate sheet. I travel the metro: city, Naperville, Schaumburg, North Shore, and south suburbs.

${summary}

Portfolio: ${portfolio}

${signOff(profile)}`
      case "Adult Talent Application":
        return `${hello}

I am ${who}. I am 18+, US-based, and available in the Chicagoland area as a male talent for adult photo and video (artistic nude, erotic, and explicit as specified). I can provide government ID for 2257, a short availability window, and a body/face set. I can travel if you cover a ticket or day rate that makes the flight make sense.

${summary}

I do not shoot anything involving anyone under 18. Happy to complete your casting form.

${signOff(profile)}`
      case "Travel Photographer Pitch":
        return `${hello}

I am ${who}, a Chicagoland photographer available to travel for paid 18+ stills — boudoir, artistic nude, erotic creator sets, and adult-industry events. I fly with backup bodies, and I keep ID/2257 on file for every person on set.

I want a day rate or studio split in writing. Typical ask is $500–$830/day plus airfare, or a hosted villa/hotel when that is how the production already houses crew. I am not asking for a guest ticket.

${summary}

Portfolio: ${portfolio}

${signOff(profile)}`
      case "Retreat Booking Inquiry":
        return `${hello}

I want to book / waitlist ${title} as a photographer (${when}, ${location}). I am 18+.

Please confirm remaining spots, the current price, what lodging and meals cover, and that flights are extra unless stated. I will pay the deposit once the contract and model-release terms are in writing.

${summary}

${signOff(profile)}`
      case "Acting Audition Submission":
        return `${hello}

I am ${who}, a Chicagoland actor submitting for ${title} (${when}, ${location}).

I can self-tape today. I will bring a current headshot and resume to any in-person call, and I am a local hire — no travel hold. I am not asking you to sign me; I am asking to be seen for this role.

${summary}

Thank you,
${signOff(profile)}`
      case "Extra / Stand-in Registration":
        return `${hello}

I am ${who}, local to Chicagoland, registering for extra / stand-in / photo-double work.

Current photos attached (how I look today). Height, weight, and sizes on the form. I can stand a 12-hour day and I answer availability emails the hour they land. I do not pay casting companies to be background.

${summary}

${signOff(profile)}`
      case "Theater Networking":
        return `${hello}

I am ${who}. I want to usher / rush / lottery ${title} so I am in the room with other actors (${when}, ${location}).

I will follow your dress code and call time. I am not asking for a comp to skip the work — I will do the shift or stand in the rush line.

${summary}

${signOff(profile)}`
      case "Paid Headshot Pitch":
        return `${hello}

I am ${who}, a Chicago photographer (MVP Media). I shoot actor and model headshots plus location stills that actually book the room.

Session fee and selects are quoted in writing. Typical actor/model sitting is a directed set with a gallery and licensed files — not unlimited free edits. Locations: listing galleries or a headshot day in the space.

${summary}

Portfolio: ${portfolio}
Booking: mvpmedia00@gmail.com

${signOff(profile)}`
      case "Listing / Ad Copy":
        return `Paste this yourself. Nothing here posts, boosts, or emails until you do.

${who} — Chicago photographer (MVP Media)
Headshots & portraits: ${portfolio}
Boudoir (18+): ask for the studio link
Booking: ${profile.email || "mvpmedia00@gmail.com"}
${profile.instagram ? `Instagram: ${profile.instagram}` : ""}

Short listing:
Chicago photographer for actor/model headshots, personal branding, and private boudoir. Sessions quoted in writing. South Loop / Chicagoland. 18+ ID on file for adult work.

${summary}

Do not put an OnlyFans URL on the photography Google/Instagram/TikTok accounts. Adult traffic goes on the 18+ logins (Reddit NSFW, X, FetLife, paid adult networks). Instagram and TikTok as OF funnels are a ban, not a strategy.

${signOff(profile)}`
      default:
        return `${hello}

I am ${who}, a Chicago photographer. I would like to introduce my work in connection with ${title} (${when}).

${summary}

Portfolio: ${portfolio}

${signOff(profile)}`
    }
  })()

  const subject =
    kind === "Hotel Content Exchange"
      ? `Photographer content stay — ${who}`
      : kind === "Paid Headshot Pitch"
        ? `Headshot / location stills — ${who}`
        : kind === "Listing / Ad Copy"
          ? `Listing copy — ${who} — ${title}`
        : kind === "House Sit Application"
          ? `House sit application — ${who} — ${title}`
        : kind === "Acting Audition Submission" || kind === "Extra / Stand-in Registration"
          ? `${kind}: ${title}`
          : `${kind}: ${title}`

  return { subject, body }
}
