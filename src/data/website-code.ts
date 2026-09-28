export type WebsiteCodePack = {
  id: "stay" | "portraits" | "boudoir"
  name: string
  tag: string
  folder: string
  previewHref: string
  zipHref: string
  zipName: string
  github: string
  port: number
  blurb: string
  run: string
  pages: { href: string; label: string }[]
  tree: string[]
}

export const websiteCodePacks: WebsiteCodePack[] = [
  {
    id: "portraits",
    name: "MVP Media Portraits",
    tag: "Public",
    folder: "portraits-site/  ·  also src/app/photo/",
    previewHref: "/photo",
    zipHref: "/api/download/portraits",
    zipName: "mvp-media-portraits.zip",
    github: "https://github.com/mvpmedia00-commits/mvp-media-portraits-new",
    port: 4743,
    blurb:
      "Chicago headshots, branding, portraits, families, and events. No 18+ gate. Standalone app in portraits-site/; same pages at /photo on Stay.",
    run: "cd portraits-site && npm install && npm run dev -- --port 4743 --hostname 127.0.0.1",
    pages: [
      { href: "/photo", label: "Home" },
      { href: "/photo/gallery", label: "Gallery" },
      { href: "/photo/about", label: "About" },
      { href: "/photo/contact", label: "Contact" },
      { href: "/photo/booking", label: "Booking" },
    ],
    tree: [
      "portraits-site/package.json",
      "portraits-site/src/app/page.tsx",
      "portraits-site/src/app/gallery/page.tsx",
      "portraits-site/src/app/about/page.tsx",
      "portraits-site/src/app/contact/page.tsx",
      "portraits-site/src/app/booking/page.tsx",
      "portraits-site/src/data/photo.ts",
      "portraits-site/src/components/photo-gallery.tsx",
      "portraits-site/src/components/photo-booking-form.tsx",
      "src/app/photo/page.tsx",
      "src/app/photo/layout.tsx",
    ],
  },
  {
    id: "stay",
    name: "South Loop Stay",
    tag: "Planner",
    folder: "repo root (this app)",
    previewHref: "/desk",
    zipHref: "/downloads/south-loop-stay.zip",
    zipName: "south-loop-stay.zip",
    github: "https://github.com/mvpmedia00-commits/south-loop-stay",
    port: 4721,
    blurb:
      "Opportunity desk, scout bot, hotel trades, house sits, acting, advertise, and funding. Also hosts the public /photo and /studio routes.",
    run: "npm install && npm run dev -- --port 4721 --hostname 127.0.0.1",
    pages: [
      { href: "/desk", label: "Desk" },
      { href: "/bot", label: "Scout" },
      { href: "/photo", label: "Portraits (mounted)" },
      { href: "/studio", label: "Boudoir (mounted)" },
    ],
    tree: [
      "package.json",
      "next.config.ts",
      "vercel.json",
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "src/app/desk/page.tsx",
      "src/app/bot/page.tsx",
      "src/app/photo/page.tsx",
      "src/app/studio/page.tsx",
      "src/app/api/scout/route.ts",
      "src/lib/desk/assemble.ts",
      "src/lib/bot/scan.ts",
      "src/data/hotels.ts",
      "src/data/studio.ts",
      "src/data/photo.ts",
    ],
  },
  {
    id: "boudoir",
    name: "MVP Media Boudoir",
    tag: "18+",
    folder: "boudoir-site/",
    previewHref: "/studio",
    zipHref: "/downloads/mvp-media-boudoir.zip",
    zipName: "mvp-media-boudoir.zip",
    github: "https://github.com/mvpmedia00-commits/mvp-media-new-boudior",
    port: 4742,
    blurb:
      "Standalone Next.js 18+ studio. Gallery sits behind an age gate. Same pages live at /studio on Stay. Booking mails mvpmedia00@gmail.com.",
    run: "cd boudoir-site && npm install && npm run dev -- --port 4742 --hostname 127.0.0.1",
    pages: [
      { href: "/studio", label: "Home" },
      { href: "/studio/gallery", label: "Gallery" },
      { href: "/studio/about", label: "About" },
      { href: "/studio/contact", label: "Contact" },
      { href: "/studio/booking", label: "Booking" },
    ],
    tree: [
      "boudoir-site/package.json",
      "boudoir-site/src/app/page.tsx",
      "boudoir-site/src/app/gallery/page.tsx",
      "boudoir-site/src/app/about/page.tsx",
      "boudoir-site/src/app/contact/page.tsx",
      "boudoir-site/src/app/booking/page.tsx",
      "boudoir-site/src/data/studio.ts",
      "boudoir-site/src/components/studio-gate.tsx",
      "boudoir-site/src/components/studio-gallery.tsx",
      "boudoir-site/src/components/studio-booking-form.tsx",
    ],
  },
]
