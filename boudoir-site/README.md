# MVP Media — Chicago boudoir

Public 18+ studio site for Matthew Phillips / MVP Media.

Boudoir, artistic nude, body paint, and after-dark editorial. Chicago first. Files you control.

## Run

```bash
npm install
npm run dev -- --port 4742 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4742](http://127.0.0.1:4742). Confirm you are 18+ to enter.

## Pages

- `/` — studio home
- `/gallery` — Cloudinary stills with category filters
- `/about` — Matthew Phillips + session prep
- `/contact` and `/booking` — inquiry form opens mail to `mvpmedia00@gmail.com`

Nothing is stored on the server. Everyone photographed needs government ID.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.

Deploy on Vercel by importing this GitHub repo. Optional: set `NEXT_PUBLIC_SITE_URL` to the production domain so sitemap and Open Graph use the right host.
