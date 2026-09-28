# MVP Media — Chicago headshots and portraits

Public company site for Matthew Phillips / MVP Media.

Corporate headshots, personal branding, portraits, couples and families, and events. Chicago first.

## Run

```bash
npm install
npm run dev -- --port 4743 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4743](http://127.0.0.1:4743).

## Pages

- `/` — work home
- `/gallery` — headshots, branding, portraits, couples, events, Chicago
- `/about` — Matthew Phillips
- `/contact` and `/booking` — inquiry form opens mail to `mvpmedia00@gmail.com`

Gallery frames are lighting and direction samples. Client galleries stay private. Nothing is stored on the server.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.

Deploy on Vercel by importing `github.com/mvpmedia00-commits/mvp-media-portraits-new`. Optional: set `NEXT_PUBLIC_SITE_URL` to the production domain so sitemap and Open Graph use the right host.

## Push to GitHub

This folder is the full site. From a machine logged into the `mvpmedia00-commits` GitHub account:

```bash
git init
git remote add origin https://github.com/mvpmedia00-commits/mvp-media-portraits-new.git
git add .
git commit -m "Add MVP Media Chicago headshots and portraits site"
git branch -M main
git push -u origin main
```

If the repo already has a clone, copy these files over the empty tree and push `main`.
