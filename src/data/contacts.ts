import type { OpportunityContact } from "@/lib/desk/types"

export const knownContacts: OpportunityContact[] = [
  {
    name: "Ashley",
    role: "Recruiter",
    company: "Ivory Grove",
    email: "ashley@ivorygrove.com",
    contactUrl: "https://www.ivorygrove.com/jobs/wedding-lead-photographer-(chicago%2C-il)",
  },
  {
    name: "Candid Studios talent team",
    role: "Recruiter",
    company: "Candid Studios",
    contactUrl: "https://careers.candidstudios.net/careers/photographer-chicago",
    linkedin: "https://www.linkedin.com/company/candid-studios",
  },
  {
    name: "Loews influencer desk",
    role: "Hotel marketing",
    company: "Loews Hotels & Co (US portfolio)",
    contactUrl: "https://www.loewshotels.com/influencer-stay-request",
  },
  {
    name: "Viceroy Chicago marketing",
    role: "Hotel marketing",
    company: "Viceroy Chicago",
    email: "chicago@viceroy.com",
    contactUrl: "https://www.viceroyhotelsandresorts.com/chicago/contact",
  },
  {
    name: "Wagstaff PR for Viceroy",
    role: "PR manager",
    company: "Wagstaff Worldwide",
    email: "ViceroyChicago@wagstaffmktg.com",
  },
  {
    name: "Stayamo photographer desk",
    role: "Hotel marketing",
    company: "Stayamo",
    contactUrl: "https://stayamo.com/influencers",
  },
  {
    name: "SURŌ contributor team",
    role: "Hotel marketing",
    company: "SURŌ contributor stays",
    contactUrl: "https://suroliving.com/contributor-faq/",
  },
  {
    name: "Hotel Creators hub",
    role: "Hotel marketing",
    company: "Hotel Creators",
    contactUrl: "https://thehotelcreators.com/",
  },
  {
    name: "Vayada creator marketplace",
    role: "Hotel marketing",
    company: "Vayada creator marketplace",
    contactUrl: "https://vayada.com/creator-benefits",
  },
  {
    name: "ALL Accor Creator Academy",
    role: "Hotel marketing",
    company: "ALL Accor Creator Academy",
    contactUrl: "https://www.accorcreatoracademy.com/",
  },
  {
    name: "OYO Frames",
    role: "Hotel marketing",
    company: "OYO Frames",
    contactUrl: "https://frames.oyorooms.com/",
  },
  {
    name: "Marriott newsroom",
    role: "PR manager",
    company: "Marriott International media & influencer desks",
    email: "newsroom@marriott.com",
    contactUrl: "https://news.marriott.com/media-resources",
  },
  {
    name: "Hyatt corporate communications",
    role: "PR manager",
    company: "Hyatt regional communications",
    contactUrl: "https://newsroom.hyatt.com/contacts",
  },
  {
    name: "VisitBritain media",
    role: "PR manager",
    company: "VisitBritain Media Centre",
    contactUrl: "https://www.visitbritain.com/gb/en/media",
  },
  {
    name: "Tourism Australia media",
    role: "PR manager",
    company: "Tourism Australia media",
    contactUrl: "https://www.tourism.australia.com/en/news-and-industry-information.html",
  },
  {
    name: "Viceroy Hotels & Resorts",
    role: "Hotel marketing",
    company: "Viceroy Hotels & Resorts",
    contactUrl: "https://www.viceroyhotelsandresorts.com/",
  },
  {
    name: "21c Museum Hotels",
    role: "Hotel marketing",
    company: "21c Museum Hotels",
    contactUrl: "https://www.21cmuseumhotels.com/",
  },
  {
    name: "Filter Photo staff",
    role: "Organizer",
    company: "Filter Photo",
    contactUrl: "https://www.filterphoto.org/contact",
  },
  {
    name: "Chicago Headline Club",
    role: "Organizer",
    company: "Chicago Headline Club",
    contactUrl: "https://headlineclub.org/contact/",
  },
  {
    name: "Choose Chicago media",
    role: "PR manager",
    company: "Choose Chicago",
    contactUrl: "https://www.choosechicago.com/media/",
  },
  {
    name: "ASMP Chicago chapter",
    role: "Organizer",
    company: "ASMP Chicago",
    contactUrl: "https://www.asmp.org/chicago/events/",
  },
  {
    name: "Chicago Artists Coalition programs",
    role: "Organizer",
    company: "Chicago Artists Coalition",
    contactUrl: "https://www.chicagoartistscoalition.org/contact",
  },
  {
    name: "MoCP staff",
    role: "Photo editor",
    company: "Museum of Contemporary Photography",
    contactUrl: "https://www.mocp.org/about/contact/",
  },
  {
    name: "Production Paradise / FotoWorks",
    role: "Event producer",
    company: "Chicago FotoWorks",
    contactUrl: "https://www.productionparadise.com/fotoworks",
  },
  {
    name: "Jacob / Purple Boudoir",
    role: "Recruiter",
    company: "Purple Boudoir",
    email: "info@purpleboudoir.com",
    contactUrl: "https://purpleboudoir.com/",
  },
  {
    name: "Jenny Taylor recruiting",
    role: "Recruiter",
    company: "Jenny Taylor Boudoir Photography",
    contactUrl: "https://www.jennytaylorboudoirs.com/job-opportunities/",
  },
  {
    name: "Liz Hansen",
    role: "Recruiter",
    company: "Chicago Boudoir Photography",
    email: "hello@chicago-boudoir.com",
    contactUrl: "https://chicago-boudoir.com/",
  },
  {
    name: "Sri & Jana studio",
    role: "Organizer",
    company: "Sri & Jana Photography",
    contactUrl: "https://www.sriandjanaphotography.com/best-chicago-boudoir-photographer",
  },
  {
    name: "Cine-Casting",
    role: "Casting director",
    company: "Cine-Casting · extras, stand-ins, photo doubles",
    contactUrl: "https://www.cine-casting.com/",
  },
  {
    name: "Joan Philo Casting",
    role: "Casting director",
    company: "Joan Philo Casting · Chicago Fire & Chicago Med extras",
    contactUrl: "https://www.thedarlingseries.com/joan-philo-casting/",
  },
  {
    name: "The Saints volunteer desk",
    role: "Organizer",
    company: "The Saints · usher 150+ Chicagoland venues",
    contactUrl: "https://www.saintschicago.org/",
  },
]

export function matchContact(companyOrTitle: string) {
  const hay = companyOrTitle.toLowerCase()
  return knownContacts.find(
    (contact) =>
      hay.includes(contact.company.toLowerCase().slice(0, 12)) ||
      (contact.email && hay.includes(contact.email.split("@")[0]))
  )
}

export function contactFromParts(
  name: string | undefined,
  company: string,
  email: string | undefined,
  url: string | undefined,
  role: OpportunityContact["role"] = "Organizer"
): OpportunityContact | undefined {
  const known = matchContact(`${name} ${company}`)
  if (known) {
    return {
      ...known,
      email: email || known.email,
      contactUrl: url || known.contactUrl,
    }
  }
  if (!name && !email && !company) return undefined
  return {
    name: name || `${company} team`,
    role,
    company: company || "Chicago",
    email,
    contactUrl: url,
  }
}
