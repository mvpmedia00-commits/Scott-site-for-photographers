# The three websites — source code

This repo holds **three Next.js sites**. Download the zips from `/code` (or `public/downloads/`) or copy the folders below.

| Site | Source folder | Zip | Live route here | Standalone port |
| --- | --- | --- | --- | --- |
| South Loop Stay | repo root | `public/downloads/south-loop-stay.zip` | `/desk` | 4721 |
| MVP Media Portraits | `portraits-site/` | `public/downloads/mvp-media-portraits.zip` | `/photo` | 4743 |
| MVP Media Boudoir (18+) | `boudoir-site/` | `public/downloads/mvp-media-boudoir.zip` | `/studio` | 4742 |

## Run each unzipped app

```bash
# Stay
npm install
npm run dev -- --port 4721 --hostname 127.0.0.1

# Portraits
cd portraits-site
npm install
npm run dev -- --port 4743 --hostname 127.0.0.1

# Boudoir
cd boudoir-site
npm install
npm run dev -- --port 4742 --hostname 127.0.0.1
```

Stack for all three: Next.js, TypeScript, Tailwind CSS, shadcn/ui. Booking forms open mail to `mvpmedia00@gmail.com`. Nothing is stored on the server.

GitHub targets (push from a machine logged into that account):

- Stay → `github.com/mvpmedia00-commits/south-loop-stay`
- Portraits → `github.com/mvpmedia00-commits/mvp-media-portraits-new`
- Boudoir → `github.com/mvpmedia00-commits/mvp-media-new-boudior`
