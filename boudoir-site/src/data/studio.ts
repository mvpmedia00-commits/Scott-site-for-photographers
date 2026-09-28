export const STUDIO_EMAIL = "mvpmedia00@gmail.com"
export const STUDIO_BRAND = "MVP Media"
export const STUDIO_CITY = "Chicago / Chicagoland"
export const CLOUDINARY = "https://res.cloudinary.com/dg4xwrzu9/video/upload"

export function cloudStill(id: string, width = 900) {
  return `${CLOUDINARY}/f_auto,q_auto,w_${width},c_fill/${id}.jpg`
}

export function cloudVideo(id: string, width = 1400) {
  return `${CLOUDINARY}/f_auto,q_auto,w_${width},c_fill,vc_auto/${id}.mp4`
}

export const studioHero = {
  poster: cloudStill(
    "v1771783064/grok-video-9235aa62-6fdd-4f45-bd14-ebb3fd08ae08_vrrjjo",
    1400
  ),
  video: cloudVideo(
    "v1771783064/grok-video-9235aa62-6fdd-4f45-bd14-ebb3fd08ae08_vrrjjo"
  ),
}

export const studioOgImage = cloudStill(
  "v1771784294/grok-video-a77ba723-ed82-47fb-a44c-da394706ef53_zsw8ku",
  1200
)

export const studioSessions = [
  {
    slug: "boudoir",
    title: "Private boudoir",
    blurb:
      "Guided, discreet sessions in studio or a private location. You set the boundaries before a light goes on.",
  },
  {
    slug: "artistic-nude",
    title: "Artistic nude",
    blurb:
      "Fine-art portraiture around form, light, and cinematic mood. 18+ with ID on file.",
  },
  {
    slug: "body-paint",
    title: "Body paint",
    blurb:
      "Paint, texture, and editorial lighting for concept sets that still read as portrait, not costume.",
  },
  {
    slug: "editorial",
    title: "After-dark editorial",
    blurb:
      "Low-light cinematic sets for lookbooks, creator stills, and private commissions.",
  },
  {
    slug: "destination",
    title: "Destination",
    blurb:
      "Chicago first. Travel days when the concept needs a coast, a hotel, or a villa — quoted in writing.",
  },
] as const

export const studioProcess = [
  {
    step: "01",
    title: "Consultation",
    body: "Mood, boundaries, and what the pictures are for. If it is not a fit, I say so.",
  },
  {
    step: "02",
    title: "Planning",
    body: "Wardrobe, location, timeline, and a written usage agreement before the shoot day.",
  },
  {
    step: "03",
    title: "Session",
    body: "Guided posing, premium light, a small set. No walk-ins. No surprise crew.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "A curated gallery, delivered discreetly, with publishing control in your hands.",
  },
] as const

export const studioFaqs = [
  {
    q: "Is this 18+ only?",
    a: "Yes. Every person in front of the camera presents government ID. I do not photograph minors, and I do not accept “looks 18” as proof.",
  },
  {
    q: "Where do you shoot?",
    a: "Chicago and the Chicagoland metro. Destination days are quoted in writing — they are not assumed in a package.",
  },
  {
    q: "What do I need to bring?",
    a: "Government ID, the wardrobe we agreed on, and anything that makes you feel like yourself. I can advise on wardrobe during planning.",
  },
  {
    q: "Who sees the files?",
    a: "You. Delivery is private. Nothing publishes unless you approve it in the usage agreement.",
  },
  {
    q: "How does pricing work?",
    a: "Quoted after consultation. Share a budget if you have one; I will tell you what that range can cover instead of sending a public rate card.",
  },
] as const

export const studioGallery = [
  {
    category: "Boudoir",
    id: "v1771778844/grok-video-b1e546eb-43ae-4c20-9334-53847268f6f0_lj5m91",
  },
  {
    category: "Boudoir",
    id: "v1771780425/grok-video-b6dc0a9c-926f-47cd-bd74-288c65925979_xclx4p",
  },
  {
    category: "Boudoir",
    id: "v1771780675/grok-video-e37a5a66-37c9-4e0a-9efb-7acdf0e92ed1_mlpgmf",
  },
  {
    category: "Artistic nude",
    id: "v1771783064/grok-video-ad3c66dd-7957-4c7b-b49e-afa366007980_fjp7bx",
  },
  {
    category: "Artistic nude",
    id: "v1771783074/grok-video-90ae5076-b9d3-4b9b-a7e0-015658114076_1_b0ucez",
  },
  {
    category: "Artistic nude",
    id: "v1771784294/grok-video-a77ba723-ed82-47fb-a44c-da394706ef53_zsw8ku",
  },
  {
    category: "Editorial",
    id: "v1771788591/grok-video-27858631-03b8-406f-bde2-16ea3742d393_nqtvab",
  },
  {
    category: "Editorial",
    id: "v1771788759/grok-video-98796eaa-50b7-43b8-ad25-7712f95fefb7_1_b29nwo",
  },
  {
    category: "Editorial",
    id: "v1771789106/grok-video-9564afee-04d3-4d2a-af37-8fd002e6a40e_nejhyj",
  },
  {
    category: "Motion",
    id: "v1771789682/grok-video-615b8d45-bf96-464e-a1ec-9af35c32e448_1_zc25xe",
  },
  {
    category: "Motion",
    id: "v1771778842/grok-video-7f5538a0-9516-462e-bc15-c1ff8d65729d_ja5w2s",
  },
  {
    category: "Motion",
    id: "v1771783064/grok-video-9235aa62-6fdd-4f45-bd14-ebb3fd08ae08_vrrjjo",
  },
] as const

export type StudioGalleryCategory =
  | "All"
  | (typeof studioGallery)[number]["category"]

export const studioGalleryCategories = [
  "All",
  ...Array.from(new Set(studioGallery.map((item) => item.category))),
] as StudioGalleryCategory[]

export const studioPrep = [
  {
    title: "What to wear",
    body: "Bring two or three options you already feel like yourself in. Dark, fitted, and texture photograph well. I will edit the pile with you before we start — you do not need a stylist on day one.",
  },
  {
    title: "What to bring",
    body: "Government ID for every person in front of the camera, the wardrobe we agreed on, and anything that settles you (music, a robe, a partner in the waiting room). Hair and makeup are optional and quoted separately.",
  },
  {
    title: "Privacy and delivery",
    body: "Files go to you, not a public feed. I do not post a session unless the usage agreement says so. If you need a private gallery link later, that is a delivery option I set up for you.",
  },
] as const

export const studioNav = [
  { href: "/", label: "Studio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const
