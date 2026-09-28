# South Loop Stay

**Source for MVP Media Portraits:** open [`/download`](/download). That saves `mvp-media-portraits.zip` (103 KB, Next.js source, no age gate). If the preview pane blocks the file, use Save link as on [`/api/download/portraits`](/api/download/portraits).

A Chicago desk for photographers who need paid work first: scored opportunities, press credentials, **worldwide hotel content trades**, and a daily action brief.

It is a Next.js app. Open `/desk` — that is the product. Scout (`/bot`) is the live scanner that feeds it.

## How ranking works

Every result gets a **0–100** score. Paid work dominates. A $500–$830 event-photography day outranks a $60 photo walk. Other factors:

- photographers explicitly welcome
- free admission vs ticket cost
- media/press access
- networking value
- celebrity / keynote rooms
- fashion and model relevance
- minutes from the South Loop (jobs/events) or worldwide apply-from-anywhere (hotel marketplaces)
- deadline urgency
- portfolio value
- hotel trade realism (lodging, meals, parking, credits) — destination stays are not penalized as a long walk

Pipelines keep career work from drowning under casual events:

Paid Jobs · Boudoir / Nude / Adult · Media/Press Passes · Fashion Shows · Model/Creator Networking · Hotel Content Stays · **Luxury house sits** · **Acting / Extra / SRO** · **Paid Headshots** · **Advertise (free / paid)** · **Contests / awards** · **Grants / capital** · **Gov contracts** · Portfolio Reviews · Workshops · General Events

The adult tab is 18+ only: boudoir studios, artistic nude, erotic/creator content, figure-drawing rooms, fetish-week photography, contests, and male talent/casting in the Chicagoland metro (city + suburbs).

**Client portraits** (`/photo`) is the public company site for advertising MVP Media: headshots, personal branding, portraits, couples/families, and events. Same cinematic layout as the boudoir studio, no 18+ gate, booking to `mvpmedia00@gmail.com`. Gallery frames are lighting/direction samples (client galleries stay private).

**Client studio** (`/studio`) is the public boudoir site for MVP Media:

- 18+ gate (session only)
- Chicago / Chicagoland — not New York
- Four nav items (Studio, Gallery, About, Contact) plus a Book consultation button
- Real Cloudinary stills, not Astro blog placeholders
- About includes session prep (wardrobe, ID, privacy) instead of a lorem blog
- Dedicated `/studio/contact` page — email is `mvpmedia00@gmail.com`, not a dead #contact link
- Canonical/OG/sitemap use this app’s URL, not `example.com` or `localhost`
- Booking opens mail to `mvpmedia00@gmail.com` (nothing is stored on the server)

The Vercel preview `boudoir-website-ar9nkylgi-…vercel.app` is SSO-locked. The public Astro site at `https://boudoir-website.vercel.app/` still has the old bugs. This app is the fixed client site.

A **standalone boudoir app** (same pages at `/`, not `/studio`) lives in `boudoir-site/`. That is what should be pushed to `github.com/mvpmedia00-commits/mvp-media-new-boudior` and imported on Vercel.

A **standalone portraits app** (same pages at `/`, not `/photo`) lives in `portraits-site/`. That is what should be pushed to `github.com/mvpmedia00-commits/mvp-media-portraits-new` and imported on Vercel. No 18+ gate. Gallery frames are lighting and direction samples.

This desk app itself belongs at `github.com/mvpmedia00-commits/south-loop-stay` (repo root, not a nested folder). Import that repo on Vercel for the planner, `/desk`, scout cron, `/studio`, and `/photo`.

## What the bot actually searches

Live HTML/JSON-LD/RSS:

Eventbrite (photography, career fairs, fashion, workshops, boudoir, figure drawing, erotic/18+, Naperville, Schaumburg, Evanston, Oak Park, Aurora, Hammond, **auditions, acting, headshots**), Filter Photo, ASMP Chicago, APA, Chicago Artists Coalition, Chicago Headline Club, CreativeMornings, MoCP, Art Institute, Choose Chicago, Palette & Chisel, Google News hiring, boudoir, adult/OnlyFans, destination-boudoir, **worldwide hotel creator stays**, Stayamo/SURŌ/Accor/OYO Frames, tourism-board photographer hosting, **Chicago acting auditions, extras/stand-ins/One Chicago, models/actors paying for headshots, photography-business listing news, OnlyFans promotion (18+), Illinois/Florida grants, government photography contracts, luxury house sitting, and estate caretaker jobs**.

Search URLs you open by hand (those sites block scrapers):

LinkedIn Jobs, Indeed (including boudoir/nude), ZipRecruiter, Instagram (hiring / destination / model-wanted / Chicago need-headshots / @posedmag / @EverythingJennyTaylor), X, Facebook, PurplePort, ModelMayhem, ModelManagement, AdultFolio, SexyJobs, Casting Networks, Hook Casting, Backstage, Actors Access, Cine-Casting, 4 Star, Compass/Bokeh, Joan Philo, Broadway in Chicago rush, The Saints, Peerspace, POSED MAG, **Google Business Profile, Thumbtack, Bark, Yelp, The Knot, Alignable, Nextdoor, r/ChicagoPhotography, r/OnlyFansPromotions, FetLife, TrafficJunky, OnlyFinder, Google Ads, Grants.gov, SAM.gov, BidBuy, Chicago DPS, MyFloridaMarketPlace, DCASE, Illinois Arts Council, Florida arts grants, SBA Illinois, Florida SBDC, TrustedHousesitters, Nomador, Caretaker Gazette, CoolWorks caretaker**.

Plus a weekly company-prospect list that does **not** wait for a job post: dealerships, apartments, realtors, restaurants, nightlife, hotels/tourism, fashion, venues, e-commerce, law firms, gyms, salons, modeling agencies, wedding companies, universities, convention centers, museums, galleries, boudoir studios, OnlyFans/creator studios, and 18+ nightlife.

## People, pitches, lifecycle

Each strong row has an organizer / PR / recruiter / hotel-marketing contact when we have one. The desk writes a ready-to-copy pitch (media credential, event photographer, hotel exchange, freelance application, portfolio intro, company prospecting). **Nothing emails anyone until you copy it or click mail.**

Statuses: Found → Qualified → Apply → Applied → Follow-up → Interview/Approved → Booked → Completed → Paid.

Useful / Not useful votes change future ranking. Mute blacklists low-value repeats. Calendar conflicts and travel time are on the row.

## What is actually true about “free room and board”

No hotel currently advertises a standing free room-and-board offer for any photographer who asks. Hosted stays are applications. The scout is **worldwide**, not Chicago-only.

Closest working paths:

1. **Stayamo** — worldwide marketplace that accepts photographers without a follower minimum.
2. **SURŌ** — global contributor program: typically two hotel nights, breakfast only if the property already includes it. Airfare is yours.
3. **Vayada** — free creator/hotel marketplace.
4. **Hotel Creators** — paid €19/month directory of properties in 85+ countries (Europe & Asia first). Not a booked room.
5. **ALL Accor Creator Academy** — AUS/NZ intake now; Accor briefs worldwide after certification.
6. **OYO Frames** — paid hotel photography network in 800+ cities. Not a hosted stay.
7. **Loews Hotels** — public US influencer stay form (Chicago, NYC, Miami, LA, Nashville, and the rest of the portfolio).
8. **Marriott / Hyatt** — regional media and influencer desks. Property decides.
9. **VisitBritain / Tourism Australia** — tourism-board media hosting when you have an assignment.
10. **Direct pitches** — Viceroy (US + Mexico), 21c Museum Hotels (nine US cities), Chicago houses (The Gwen, Pendry). Hosted creators before; no guarantee.
11. **Radisson Blu Aqua (Chicago)** — 2026 photographer-in-residence is already Ronnie Frey.

The hotel scout ranks creator programs, influencer stays, UGC, chain desks, tourism-board collabs, openings, and restaurant launches — not just the phrase “free photographer stay.” Pitches never auto-send.

## Acting, extras, SRO, and paid headshots

Chicagoland-only. Open `/acting` or the desk tabs **Acting / Extra / SRO** and **Paid Headshots**.

- **Auditions** — Backstage, Actors Access, Casting Networks, Project Casting Illinois, Chicago Plays, Equity’s Chicago hotline, Second City.
- **Extra / stand-in** — Cine-Casting, 4 Star Casting, Compass/Bokeh, Joan Philo (Chicago Fire / Med). Do not pay a company to be background.
- **SRO / rush / usher** — Broadway in Chicago’s current cheap-ticket path is rush and lottery (people still call it standing room). Goodman rush, Steppenwolf ushers, and The Saints (150+ venues) put you in the building with other actors. That is networking, not a paid role.
- **Paid headshots** — models/actors hiring a photographer (ModelMayhem, Casting Networks, acting-class showcases, Stewart/Lily’s talent who refresh digitals) and locations that need listing stills (Peerspace hosts, Illinois Film Office, Cinespace-adjacent vendors). Quote a sitting fee. Skip unpaid TFP unless you need the test.

Pitches never auto-send.

## Advertise boudoir, headshots, and OnlyFans

Open `/advertise` or the desk tab **Advertise (free / paid)**. This is not the Paid Headshots tab. Paid Headshots = people who pay you to shoot. Advertise = places to put the businesses in front of strangers.

- **Boudoir + headshots, free** — Google Business Profile, Apple Maps, Bing Places, Instagram, Facebook + Chicago groups, Pinterest, Nextdoor, Alignable, LinkedIn (headshots), Reddit (r/chicago / r/ChicagoPhotography), Craigslist services, YouTube, TikTok SFW photography.
- **Boudoir + headshots, free with upgrades** — ModelMayhem, PurplePort, Backstage resources, Yelp profile.
- **Boudoir + headshots, paid** — Google Ads, Meta Ads, Pinterest Ads, LinkedIn Ads, Thumbtack, Bark, The Knot, WeddingWire.
- **OnlyFans, free (18+)** — Reddit NSFW promo subs, X, FetLife, Bluesky, Fansly extra profile, Beacons/Linktree on a dedicated adult page.
- **OnlyFans, paid (18+)** — TrafficJunky, ExoClick, OnlyFinder, Reddit Ads NSFW, ManyVids boosts. Paid shoutout DMs are listed as scam-heavy.
- **Not a strategy** — Instagram or TikTok as an OnlyFans funnel. Those rows are marked ban risk so you do not have to wonder.

Listing / ad copy is ready to paste. **Nothing posts, boosts, or spends until you do.** Keep OF links off the photography Google and Instagram accounts.

## Grants, charity, contests, and government contracts

Open `/funding` or the desk tabs **Grants / capital**, **Contests / awards**, and **Gov contracts**. Illinois and Florida are separate sections; federal boards (Grants.gov, SAM.gov, SBA, NEA) show in both.

- **Illinois grants** — DCASE Individual Artists, Illinois Arts Council, 3Arts, Illinois Humanities, Chicago small-business programs, DCEO.
- **Illinois charity** — Chicago Community Trust, Arts Work Fund, Driehaus. These fund **nonprofits**. A photography LLC needs a fiscal sponsor or partner, not a fake 501(c)(3).
- **Illinois contests** — IPPA, Filter Photo / Chicago open calls.
- **Illinois contracts** — BidBuy, City of Chicago DPS, Cook County procurement.
- **Illinois easy capital** — SBA Illinois District (free counselor), Accion/Opportunity Fund microloans, IFA, WBDC certification. Loans are repaid.
- **Florida grants** — Division of Arts and Culture, Miami-Dade Cultural Affairs, South Arts, Florida Humanities, VISIT FLORIDA trade (partner marketing, not a personal stipend).
- **Florida charity** — Miami Foundation, Community Foundation of Tampa Bay, Palm Beach/Martin community foundation.
- **Florida contests** — Palm Beach Photographic Centre.
- **Florida contracts** — MyFloridaMarketPlace, Miami-Dade, Orlando, Tampa, Jacksonville.
- **Florida easy capital** — Florida SBDC (free advising), SBA South Florida, LiftFund.
- **Federal** — Grants.gov, NEA (usually organizations), SAM.gov (free official UEI), SBA funding-program list, LensCulture/IPA contests.
- **Not a program** — paid “government grant mill” ads. FTC warning is on the row.

**Nothing applies, bids, or registers until you do.** SAM.gov lookalike sites that charge a fee are a scam.

## Luxury house sitting

Open `/housesit` or the desk tab **Luxury house sits**. This is private homes, not the hotel Stay scout.

- **Luxury sits** — TrustedHousesitters (worldwide + Florida + Illinois searches), Nomador (Europe), Luxury House Sitting, HouseSitMatch. Pay is lodging, usually plus pets. Membership is the cost of seeing listings.
- **Sit marketplaces** — HouseCarers, MindMyHouse, HouseSitters America (including Florida), HouseSitters UK, Aussie House Sitters, House Sitters Canada. Hunt luxury with filters; it is not the default.
- **Paid caretaker** — Caretaker Gazette, CoolWorks caretaker, Pavilion Agency, Household Staffing, The Lady (UK). These are jobs with a wage or stipend.
- **Not a program** — “pay a fee to sit a Miami mansion” mills.

A sit is occupancy and care. A photography set inside the house is a separate written ask. **Nothing auto-applies.**

## Run locally

```bash
npm install
npm run dev -- --port 4721 --hostname 127.0.0.1
```

Open the directory at [http://127.0.0.1:4721/sites](http://127.0.0.1:4721/sites). From there:

- South Loop Stay — [http://127.0.0.1:4721/desk](http://127.0.0.1:4721/desk)
- Advertise scout (free + paid) — [http://127.0.0.1:4721/advertise](http://127.0.0.1:4721/advertise)
- Funding scout (IL / FL) — [http://127.0.0.1:4721/funding](http://127.0.0.1:4721/funding)
- House-sit scout (luxury homes) — [http://127.0.0.1:4721/housesit](http://127.0.0.1:4721/housesit)
- MVP Media Portraits — [http://127.0.0.1:4721/photo](http://127.0.0.1:4721/photo)
- MVP Media Boudoir (18+) — [http://127.0.0.1:4721/studio](http://127.0.0.1:4721/studio)

Standalone root-level copies (same pages at `/`) also run at [http://127.0.0.1:4743](http://127.0.0.1:4743) (portraits) and [http://127.0.0.1:4742](http://127.0.0.1:4742) (boudoir).

After deploy, Vercel Cron hits `/api/cron/scout` every 6 hours. Calendar feed: `/api/feed.ics`.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.

## Push to GitHub

This app is meant to live at https://github.com/mvpmedia00-commits/south-loop-stay

From a machine logged into the `mvpmedia00-commits` GitHub account, at the repo root (exclude `boudoir-site/` and `portraits-site/` — those have their own repos):

```bash
git remote add github https://github.com/mvpmedia00-commits/south-loop-stay.git
git push -u github main
```

If the GitHub repo is still empty, copy this tree over a fresh clone and push `main`. Optional production env: `NEXT_PUBLIC_SITE_URL`. Vercel Cron uses `/api/cron/scout`.
