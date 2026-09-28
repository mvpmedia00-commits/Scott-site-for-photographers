export const PHOTO_EMAIL = "mvpmedia00@gmail.com"
export const PHOTO_BRAND = "MVP Media"
export const PHOTO_CITY = "Chicago / Chicagoland"

export const photoHero = {
  src: "/photo/headshot-beard.jpg",
  alt: "Cinematic studio headshot lighting — dark background, sharp catchlights",
}

export const photoOgImage = "/photo/headshot-corporate.jpg"

export const photoSessions = [
  {
    slug: "headshots",
    title: "Corporate headshots",
    blurb:
      "LinkedIn, press, speaker pages, and team grids. Clean light, real expression, a crop that still works at 40 pixels.",
  },
  {
    slug: "branding",
    title: "Personal branding",
    blurb:
      "A short set that looks like your work, not a mall backdrop. Website, pitch deck, and the one photo people actually remember.",
  },
  {
    slug: "portraits",
    title: "Portraits",
    blurb:
      "Studio or location. Directed, not a photo booth. You leave with a gallery you can print, not a folder of almosts.",
  },
  {
    slug: "couples",
    title: "Couples and families",
    blurb:
      "Quiet direction, natural pacing, no fake laughing on command. Chicago parks, homes, and private rooms.",
  },
  {
    slug: "events",
    title: "Events",
    blurb:
      "Keynotes, galas, launches, and rooms where people hire. Coverage that reads as editorial, not party-flash.",
  },
] as const

export const photoProcess = [
  {
    step: "01",
    title: "Brief",
    body: "Where the pictures live — LinkedIn, a site, a press kit, a wall — and who has to recognize you.",
  },
  {
    step: "02",
    title: "Wardrobe",
    body: "Two or three options. I tell you what the camera will punish before you pack it.",
  },
  {
    step: "03",
    title: "Session",
    body: "Guided posing, 30–90 minutes depending on the set. Solo, team, or a small family.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "A curated gallery, color that holds up on a phone and in print, plus a LinkedIn crop if you need one.",
  },
] as const

export const photoFaqs = [
  {
    q: "How long is a headshot session?",
    a: "Most corporate sets are 30–45 minutes. Branding and portrait sets run 60–90. Teams are quoted by headcount.",
  },
  {
    q: "What should I wear?",
    a: "Solid colors, fitted, no tiny logos. Bring a second option. Glasses stay on if you wear them to work.",
  },
  {
    q: "Studio or on site?",
    a: "Both. Offices, hotels, and homes in Chicago and the suburbs. Destination days are quoted in writing.",
  },
  {
    q: "How fast do files come back?",
    a: "Headshot selects in a few days. Full portrait and event galleries on the date we put in the agreement.",
  },
  {
    q: "Do you photograph kids or teens?",
    a: "Family sessions include minors with a parent or guardian on set. The after-dark boudoir studio is a separate 18+ site.",
  },
] as const

export const photoGallery = [
  { src: "/photo/headshot-corporate.jpg", category: "Headshots", alt: "Corporate headshot in natural window light" },
  { src: "/photo/headshot-executive.jpg", category: "Headshots", alt: "Executive portrait by an office window" },
  { src: "/photo/headshot-actor.jpg", category: "Headshots", alt: "Actor-style headshot on a seamless backdrop" },
  { src: "/photo/headshot-beard.jpg", category: "Headshots", alt: "Dramatic studio headshot on black" },
  { src: "/photo/branding-speaker.jpg", category: "Branding", alt: "Personal branding portrait in an office" },
  { src: "/photo/branding-lifestyle.jpg", category: "Branding", alt: "Brand lifestyle still of a working conversation" },
  { src: "/photo/branding-team.jpg", category: "Branding", alt: "Lifestyle portrait of a small group at sunset" },
  { src: "/photo/portrait-studio.jpg", category: "Portraits", alt: "Golden-hour outdoor portrait" },
  { src: "/photo/portrait-close.jpg", category: "Portraits", alt: "Beauty portrait with simple jewelry" },
  { src: "/photo/portrait-outdoor.jpg", category: "Portraits", alt: "Fashion portrait on a dark seamless" },
  { src: "/photo/portrait-couple.jpg", category: "Couples", alt: "Couple celebrating after their ceremony" },
  { src: "/photo/event-stage.jpg", category: "Events", alt: "Audience at a conference in low light" },
  { src: "/photo/chicago-street.jpg", category: "Chicago", alt: "Cloud Gate and Michigan Avenue, Chicago" },
  { src: "/photo/chicago-skyline.jpg", category: "Chicago", alt: "Chicago skyline at dusk looking toward the lake" },
] as const

export type PhotoGalleryCategory = "All" | (typeof photoGallery)[number]["category"]

export const photoGalleryCategories = [
  "All",
  ...Array.from(new Set(photoGallery.map((item) => item.category))),
] as PhotoGalleryCategory[]

export const photoNav = [
  { href: "/", label: "Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const
