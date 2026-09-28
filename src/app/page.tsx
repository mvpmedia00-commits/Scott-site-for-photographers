import Link from "next/link"

import { EventCard } from "@/components/event-card"
import { SitesHub } from "@/components/sites-hub"
import { Button } from "@/components/ui/button"
import { events, thisWeekIds } from "@/data/events"
import { hotels } from "@/data/hotels"
import { jobs } from "@/data/jobs"

const weekEvents = thisWeekIds
  .map((id) => events.find((event) => event.id === id))
  .filter((event) => event !== undefined)

export default function HomePage() {
  return (
    <div>
      <SitesHub title="Open a website" />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.28),transparent_42%),linear-gradient(180deg,#1a1410,transparent)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e2b657]">
              Friday, Sept 18, 2026 · Filter Photo starts Wednesday
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] text-[#f4ede1] sm:text-6xl">
              Chicago will put you in rooms with people who hire photographers.
              First, get a bed without paying rack rate.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9b8a0]">
              No downtown hotel publishes a standing “free room and board for
              any photographer” offer. What exists is better if you treat it as
              work: hosted nights in exchange for a real content set, plus a
              week of free festival events that actually move a career.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/desk" />} size="lg">
                Open the opportunity desk
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-[#f4ede1]"
                render={<Link href="/photo" />}
              >
                Headshots & portraits
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-[#f4ede1]"
                render={<Link href="/studio" />}
              >
                Client boudoir site
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-[#f4ede1]"
                render={<Link href="/travel" />}
              >
                Circuit
              </Button>
            </div>
          </div>
          <aside className="rounded-3xl bg-[#1c1814] p-6 ring-1 ring-white/10 sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#c9b8a0]">
              Do these three today
            </p>
            <ol className="mt-4 space-y-4 text-[#e8dcc8]">
              <li>
                <span className="text-[#e2b657]">1. </span>
                Apply to Stayamo as a photographer — worldwide listings, no
                follower minimum.
              </li>
              <li>
                <span className="text-[#e2b657]">2. </span>
                Submit Loews Chicago’s influencer stay form with Sept 23–26 and
                Oct 8–10 as date options.
              </li>
              <li>
                <span className="text-[#e2b657]">3. </span>
                RSVP to the free Chicago Media Career Fair on Oct 9. Bring
                printed resumes. Newsrooms will be in the room.
              </li>
            </ol>
            <Button
              nativeButton={false}
              className="mt-6"
              render={<Link href="/pitch" />}
            >
              Generate the hotel email
            </Button>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
            The hotel question · worldwide
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Room is possible. Board is a negotiation. The map is the whole planet.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
            Stayamo and SURŌ are worldwide photographer tracks, not Chicago
            request forms. Vayada and Hotel Creators add more countries. Accor’s
            creator academy and OYO Frames are chain doors. Loews still has the
            only major US public stay form. Marriott and Hyatt go through
            regional desks. VisitBritain and Tourism Australia house
            photographers who arrive with an assignment. Chicago hotels remain
            on the list because you live there — they are not the scout’s edge.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {hotels.slice(0, 3).map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-2xl bg-[#1c1814] p-5 ring-1 ring-white/10"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#e2b657]">
                {hotel.likelihood} · {hotel.region}
              </p>
              <h3 className="mt-2 font-heading text-2xl">{hotel.name}</h3>
              <p className="mt-1 text-sm text-[#c9b8a0]">
                {hotel.city}, {hotel.country}
              </p>
              <p className="mt-2 text-sm text-[#c9b8a0]">{hotel.room}</p>
              <p className="mt-3 text-sm">{hotel.meals}</p>
            </div>
          ))}
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 border-white/20"
          render={<Link href="/hotels" />}
        >
          All stay options
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
            Acting · extras · paid headshots
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Apply in Chicagoland, then stand in the room.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
            Auditions on Backstage, Actors Access, and the Equity hotline. Extra
            and stand-in days through Cine-Casting, 4 Star, Compass, and Joan
            Philo — never pay a middleman to be background. Rush, lottery, and
            ushering (Broadway in Chicago, Steppenwolf, The Saints) put you next
            to other aspiring actors. Models and location hosts who will pay for
            pictures live on the same scout.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 border-white/20"
          render={<Link href="/acting" />}
        >
          Open the acting scout
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
            Advertise · free and paid
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Where to put the boudoir studio, the headshot company, and OnlyFans.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
            Google Business, Maps, Instagram, Reddit, and Nextdoor are free
            shelves. Google Ads, Thumbtack, Bark, and The Knot cost money.
            OnlyFans belongs on 18+ boards that allow the link — Reddit NSFW, X,
            FetLife, TrafficJunky — not as a secret funnel on the photography
            Instagram. That tab is not “people who pay you for headshots.”
            Listing copy never posts itself.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 border-white/20"
          render={<Link href="/advertise" />}
        >
          Open the advertise scout
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
            Funding · Illinois and Florida
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Grants, charity pots, contests, and government contracts — not a
            Facebook “LLC grant.”
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
            Illinois: DCASE, Arts Council, BidBuy, Chicago procurement, SBA
            Illinois. Florida: Division of Arts, Miami-Dade, MyFloridaMarketPlace,
            city purchasing, Florida SBDC. Federal boards (Grants.gov, SAM.gov)
            sit in both sections. Charity foundations fund nonprofits. The easy
            programs are free counselors and microloans. Applications never send
            themselves.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 border-white/20"
          render={<Link href="/funding" />}
        >
          Open the funding scout
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
            House sitting · luxury homes
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Villas and waterfront houses want a sitter. They almost never want
            to pay you.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#c9b8a0]">
            TrustedHousesitters, Nomador, and Luxury House Sitting are the
            boards. Florida is thick with snowbird homes; Illinois is thinner.
            A sit is occupancy and pet care, not a hotel content trade. Paid
            caretaker jobs live on Caretaker Gazette and household agencies.
            Applications never send themselves.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 border-white/20"
          render={<Link href="/housesit" />}
        >
          Open the house-sit scout
        </Button>
      </section>

      <section className="border-y border-white/10 bg-[#100e0c]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
                This week
              </p>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
                Filter Photo Festival, Sept 23–26
              </h2>
              <p className="mt-3 max-w-2xl text-[#c9b8a0]">
                Headquarters: Columbia College Student Center, 754 S Wabash.
                Most of the career value is free: roaming reviews, artist talks,
                MoCP, Filter Space, the Cultural Center. Paid portfolio reviews
                are $375–$650 if seats remain.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/events" />}
            >
              Full calendar
            </Button>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {weekEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[#c8102e]">
          After festival week
        </p>
        <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
          Two dates that can become a paycheck
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#1c1814] p-6 ring-1 ring-white/10">
            <p className="text-sm text-[#e2b657]">Oct 9 · Free</p>
            <h3 className="mt-2 font-heading text-2xl">
              Chicago Media Career Fair
            </h3>
            <p className="mt-3 text-[#c9b8a0]">
              Impact House, 200 W Madison. Reader, NewsNation, WGN Radio, Windy
              City Times, and others. Resume reviews, mock interviews, free
              headshots, food. RSVP. Print your materials — they will not print
              for you.
            </p>
          </div>
          <div className="rounded-2xl bg-[#1c1814] p-6 ring-1 ring-white/10">
            <p className="text-sm text-[#e2b657]">Nov 4–5 · Paid reviews</p>
            <h3 className="mt-2 font-heading text-2xl">Chicago FotoWorks</h3>
            <p className="mt-3 text-[#c9b8a0]">
              Green Relish Studios, Logan Square. One-to-one meetings with art
              producers and photo editors who commission commercial work.
              Reviewers announced Oct 15.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-heading text-2xl">Jobs you can apply to this weekend</h3>
          <ul className="mt-4 space-y-3 text-[#e8dcc8]">
            {jobs.map((job) => (
              <li key={job.id}>
                <span className="text-[#f4ede1]">{job.title}</span>
                <span className="text-[#c9b8a0]">
                  {" "}
                  · {job.employer} · {job.pay}
                </span>
              </li>
            ))}
          </ul>
          <Button
            nativeButton={false}
            className="mt-6"
            render={<Link href="/jobs" />}
          >
            Job details
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            className="mt-3 ml-0 border-white/20 sm:ml-3"
            render={<Link href="/travel" />}
          >
            Adult travel jobs and retreats
          </Button>
        </div>
      </section>
    </div>
  )
}
