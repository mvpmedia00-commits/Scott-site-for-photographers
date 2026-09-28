import {
  extractAsmpEvents,
  extractDatedHeadings,
  extractEventbriteListings,
  extractJsonLdEvents,
  extractRssEvents,
} from "@/lib/bot/parse"
import type { ScoutEvent, SourceStatus } from "@/lib/bot/types"

const USER_AGENT =
  "Mozilla/5.0 (compatible; SouthLoopStayBot/1.0; +https://southloopstay.local)"

export type SourceRun = {
  status: SourceStatus
  events: ScoutEvent[]
}

export const SOURCES = [
  {
    id: "eventbrite-photo",
    name: "Eventbrite · photography",
    url: "https://www.eventbrite.com/d/il--chicago/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-career",
    name: "Eventbrite · media career",
    url: "https://www.eventbrite.com/d/il--chicago/career-fair/",
    parse: (body: string, url: string) =>
      extractEventbriteListings(body, "Eventbrite", url).filter((event) =>
        /media|journal|photo|news/i.test(`${event.title} ${event.summary}`)
      ),
  },
  {
    id: "filter-photo",
    name: "Filter Photo Festival",
    url: "https://www.filterphoto.org/festival-calendar",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Filter Photo", url),
      ...extractDatedHeadings(body, "Filter Photo", url),
    ],
  },
  {
    id: "asmp",
    name: "ASMP Chicago",
    url: "https://www.asmp.org/chicago/events/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "ASMP Chicago", url),
      ...extractAsmpEvents(body, url),
    ],
  },
  {
    id: "cac",
    name: "Chicago Artists Coalition",
    url: "https://www.chicagoartistscoalition.org/upcoming-events/",
    parse: (body: string, url: string) =>
      extractDatedHeadings(body, "Chicago Artists Coalition", url),
  },
  {
    id: "headline-club",
    name: "Chicago Headline Club",
    url: "https://headlineclub.org/",
    parse: (body: string, url: string) =>
      extractDatedHeadings(body, "Chicago Headline Club", url).filter((event) =>
        /career|fair|photo|journal/i.test(event.title)
      ),
  },
  {
    id: "creativemornings",
    name: "CreativeMornings Chicago",
    url: "https://creativemornings.com/cities/chi",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "CreativeMornings", url),
      ...extractDatedHeadings(body, "CreativeMornings", url),
    ],
  },
  {
    id: "eventbrite-fashion",
    name: "Eventbrite · fashion",
    url: "https://www.eventbrite.com/d/il--chicago/fashion/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "Eventbrite", url),
        ...extractEventbriteListings(body, "Eventbrite", url),
      ].filter((event) =>
        /fashion|runway|model|lookbook|couture/i.test(`${event.title} ${event.summary}`)
      ),
  },
  {
    id: "eventbrite-workshop",
    name: "Eventbrite · workshops",
    url: "https://www.eventbrite.com/d/il--chicago/photography-workshop/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "apa",
    name: "APA National events",
    url: "https://apanational.org/events/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "APA", url),
        ...extractDatedHeadings(body, "APA", url),
      ].filter((event) => /chicago|midwest|photo/i.test(`${event.title} ${event.summary}`)),
  },
  {
    id: "mocp",
    name: "Museum of Contemporary Photography",
    url: "https://www.mocp.org/events/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "MoCP", url),
      ...extractDatedHeadings(body, "MoCP", url),
    ],
  },
  {
    id: "aic",
    name: "Art Institute of Chicago",
    url: "https://www.artic.edu/events",
    parse: (body: string, url: string) =>
      extractJsonLdEvents(body, "Art Institute", url).filter((event) =>
        /photo|press|media|lee miller|camera/i.test(`${event.title} ${event.summary}`)
      ),
  },
  {
    id: "choose-chicago",
    name: "Choose Chicago events",
    url: "https://www.choosechicago.com/events/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "Choose Chicago", url),
        ...extractDatedHeadings(body, "Choose Chicago", url),
      ].filter((event) =>
        /photo|fashion|media|press|festival|hotel|food|boudoir|nude|fetish/i.test(`${event.title} ${event.summary}`)
      ),
  },
  {
    id: "eventbrite-boudoir",
    name: "Eventbrite · boudoir / nude / figure",
    url: "https://www.eventbrite.com/d/il--chicago/boudoir/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "Eventbrite", url),
        ...extractEventbriteListings(body, "Eventbrite", url),
      ].filter((event) =>
        /boudoir|nude|erotic|figure|life drawing|glamour|pin-?up|fetish|18\+/i.test(
          `${event.title} ${event.summary}`
        )
      ),
  },
  {
    id: "eventbrite-figure",
    name: "Eventbrite · figure drawing",
    url: "https://www.eventbrite.com/d/il--chicago/figure-drawing/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-naperville",
    name: "Eventbrite · Naperville photography",
    url: "https://www.eventbrite.com/d/il--naperville/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-schaumburg",
    name: "Eventbrite · Schaumburg photography",
    url: "https://www.eventbrite.com/d/il--schaumburg/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-evanston",
    name: "Eventbrite · Evanston photography",
    url: "https://www.eventbrite.com/d/il--evanston/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-oak-park",
    name: "Eventbrite · Oak Park photography",
    url: "https://www.eventbrite.com/d/il--oak-park/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-aurora",
    name: "Eventbrite · Aurora / Fox Valley photography",
    url: "https://www.eventbrite.com/d/il--aurora/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-hammond",
    name: "Eventbrite · Hammond / NWI photography",
    url: "https://www.eventbrite.com/d/in--hammond/photography/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-erotic",
    name: "Eventbrite · erotic / 18+ / fetish",
    url: "https://www.eventbrite.com/d/il--chicago/18+/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "Eventbrite", url),
        ...extractEventbriteListings(body, "Eventbrite", url),
      ].filter((event) =>
        /18\+|erotic|fetish|leather|nude|boudoir|adult|nsfw|onlyfans|pin-?up|glamour/i.test(
          `${event.title} ${event.summary}`
        )
      ),
  },
  {
    id: "palette-chisel",
    name: "Palette & Chisel (nude figure)",
    url: "https://www.paletteandchisel.org/",
    parse: (body: string, url: string) =>
      extractDatedHeadings(body, "Palette & Chisel", url).filter((event) =>
        /figure|nude|portrait|model/i.test(event.title)
      ),
  },
  {
    id: "google-news-jobs",
    name: "Google News · Chicago photographer hiring",
    url: "https://news.google.com/rss/search?q=Chicago+photographer+(job+OR+hiring)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-boudoir",
    name: "Google News · Chicagoland boudoir / nude hiring",
    url: "https://news.google.com/rss/search?q=Chicago+(boudoir+OR+nude+photographer)+hiring&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-adult",
    name: "Google News · Chicagoland adult / OnlyFans photographer",
    url: "https://news.google.com/rss/search?q=Chicago+(OnlyFans+OR+erotic+OR+%22adult+photographer%22)+hiring&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-destination",
    name: "Google News · destination boudoir / nude hiring",
    url: "https://news.google.com/rss/search?q=destination+boudoir+photographer+(hiring+OR+wanted+OR+travel)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-hotel-stays",
    name: "Google News · worldwide hotel creator stays",
    url: "https://news.google.com/rss/search?q=hotel+(photographer+OR+influencer+OR+creator)+(%22hosted+stay%22+OR+%22content+stay%22+OR+collab+OR+residency)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-hotel-marketplaces",
    name: "Google News · Stayamo / SURŌ / Accor / OYO Frames",
    url: "https://news.google.com/rss/search?q=Stayamo+OR+%22SUR%C5%8C%22+OR+%22Accor+Creator%22+OR+%22OYO+Frames%22+photographer&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-tourism-media",
    name: "Google News · tourism board photographer hosting",
    url: "https://news.google.com/rss/search?q=(VisitBritain+OR+%22Tourism+Australia%22+OR+%22Brand+USA%22)+(photographer+OR+media+fam)+hotel&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "eventbrite-auditions",
    name: "Eventbrite · Chicago auditions",
    url: "https://www.eventbrite.com/d/il--chicago/auditions/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "eventbrite-acting",
    name: "Eventbrite · Chicago acting",
    url: "https://www.eventbrite.com/d/il--chicago/acting/",
    parse: (body: string, url: string) =>
      [
        ...extractJsonLdEvents(body, "Eventbrite", url),
        ...extractEventbriteListings(body, "Eventbrite", url),
      ].filter((event) =>
        /act|audition|cast|improv|theatre|theater|scene|monologue/i.test(
          `${event.title} ${event.summary}`
        )
      ),
  },
  {
    id: "eventbrite-headshots",
    name: "Eventbrite · Chicago headshots",
    url: "https://www.eventbrite.com/d/il--chicago/headshots/",
    parse: (body: string, url: string) => [
      ...extractJsonLdEvents(body, "Eventbrite", url),
      ...extractEventbriteListings(body, "Eventbrite", url),
    ],
  },
  {
    id: "google-news-acting",
    name: "Google News · Chicago acting auditions",
    url: "https://news.google.com/rss/search?q=Chicago+(audition+OR+%22casting+call%22+OR+EPA)+actor&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-extras",
    name: "Google News · Chicago extras / stand-ins / One Chicago",
    url: "https://news.google.com/rss/search?q=Chicago+(extras+OR+%22stand-in%22+OR+background)+(casting+OR+%22Chicago+Fire%22+OR+%22Chicago+Med%22+OR+%22Chicago+P.D.%22)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-headshots",
    name: "Google News · Chicago models / actors paying for headshots",
    url: "https://news.google.com/rss/search?q=Chicago+(headshots+OR+digitals)+(model+OR+actor)+photographer&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-photo-ads",
    name: "Google News · advertising a photography business",
    url: "https://news.google.com/rss/search?q=Chicago+(photographer+OR+boudoir+OR+headshots)+(Google+Business+OR+Thumbtack+OR+%22Google+Ads%22+OR+Yelp)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-of-promo",
    name: "Google News · OnlyFans promotion (18+)",
    url: "https://news.google.com/rss/search?q=OnlyFans+(TrafficJunky+OR+OnlyFinder+OR+Reddit+OR+promotion)+-hiring+-photographer&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-il-grants",
    name: "Google News · Illinois small business / arts grants",
    url: "https://news.google.com/rss/search?q=Illinois+(grant+OR+%22small+business%22+OR+DCASE+OR+%22Arts+Council%22)+(photographer+OR+artist+OR+LLC)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-fl-grants",
    name: "Google News · Florida small business / arts grants",
    url: "https://news.google.com/rss/search?q=Florida+(grant+OR+%22small+business%22+OR+%22Division+of+Arts%22)+(photographer+OR+artist+OR+LLC)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-gov-contracts",
    name: "Google News · photography government contracts",
    url: "https://news.google.com/rss/search?q=(SAM.gov+OR+BidBuy+OR+MyFloridaMarketPlace+OR+procurement)+(photographer+OR+photography)+contract&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-housesit",
    name: "Google News · luxury house sitting",
    url: "https://news.google.com/rss/search?q=(%22house+sitting%22+OR+housesit+OR+TrustedHousesitters)+luxury+(villa+OR+estate+OR+mansion)&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
  {
    id: "google-news-caretaker",
    name: "Google News · estate caretaker jobs",
    url: "https://news.google.com/rss/search?q=(%22caretaker%22+OR+%22house+manager%22)+(estate+OR+luxury)+job&hl=en-US&gl=US&ceid=US:en",
    parse: (body: string, url: string) => extractRssEvents(body, "Google News", url),
  },
] as const

export async function fetchSource(
  id: string,
  name: string,
  url: string,
  parse: (body: string, url: string) => ScoutEvent[]
): Promise<SourceRun> {
  try {
    const body = await fetchText(url)
    const events = parse(body, url)
    return {
      status: { id, name, url, ok: true, found: events.length },
      events,
    }
  } catch (error) {
    return {
      status: {
        id,
        name,
        url,
        ok: false,
        found: 0,
        error: error instanceof Error ? error.message : "Fetch failed",
      },
      events: [],
    }
  }
}

export async function fetchText(url: string) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12000)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.text()
  } finally {
    clearTimeout(timer)
  }
}
