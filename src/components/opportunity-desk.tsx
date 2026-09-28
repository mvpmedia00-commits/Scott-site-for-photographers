"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { defaultProfile } from "@/data/profile"
import { buildPitch } from "@/lib/desk/pitches"
import { learningTokens } from "@/lib/desk/signals"
import {
  loadDeskState,
  overdueFollowUps,
  saveDeskState,
  touchItem,
  voteDelta,
  type DeskState,
} from "@/lib/desk/tracker"
import { travelLabel } from "@/lib/desk/travel"
import type {
  DeskPayload,
  Lifecycle,
  Opportunity,
  Pipeline,
} from "@/lib/desk/types"
import {
  LIFECYCLE_LABELS,
  LIFECYCLES,
  PIPELINE_LABELS,
  PIPELINES,
} from "@/lib/desk/types"
import { cn } from "@/lib/utils"

const PRESS_LABEL: Record<Opportunity["pressAccess"], string> = {
  FREE: "FREE",
  MEDIA_PASS_POSSIBLE: "MEDIA PASS POSSIBLE",
  PAID_TICKET: "PAID TICKET",
  PHOTOGRAPHER_APPLICATION: "PHOTOGRAPHER APPLICATION",
  AUDITION: "AUDITION / APPLY",
  CLIENT_PITCH: "CLIENT PITCH",
  LISTING: "LISTING / ADS",
}

export function OpportunityDesk() {
  const [data, setData] = useState<DeskPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [pipeline, setPipeline] = useState<"all" | Pipeline>("all")
  const [state, setState] = useState<DeskState>(() =>
    typeof window === "undefined"
      ? { profile: defaultProfile, items: {} }
      : loadDeskState()
  )
  const [selected, setSelected] = useState<Opportunity | null>(null)
  const [copied, setCopied] = useState<"pitch" | "feed" | null>(null)
  const [showMuted, setShowMuted] = useState(false)

  const scan = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/desk${force ? "?force=1" : ""}`, {
        cache: "no-store",
      })
      if (!response.ok) throw new Error(`Desk scan failed (${response.status})`)
      setData((await response.json()) as DeskPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Desk scan failed")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const kickoff = window.setTimeout(() => {
      void scan(true)
    }, 0)
    return () => window.clearTimeout(kickoff)
  }, [scan])

  const rows = useMemo(() => {
    if (!data) return []
    return data.opportunities
      .map((item) => {
        const tracker = state.items[item.id]
        const tokens = learningTokens(item.title, item.pipeline)
        const learning = voteDelta(tokens, state.items, tokens)
        return {
          ...item,
          score: Math.max(1, Math.min(99, item.score + learning)),
          tracker,
        }
      })
      .filter((item) => {
        if (item.tracker?.blacklisted && !showMuted) return false
        if (pipeline !== "all" && item.pipeline !== pipeline) return false
        return true
      })
      .sort((a, b) => b.score - a.score)
  }, [data, pipeline, showMuted, state.items])

  const overdue = overdueFollowUps(state)

  function update(id: string, patch: Parameters<typeof touchItem>[2], history?: string) {
    setState((current) => touchItem(current, id, patch, history))
  }

  async function copyPitch(item: Opportunity) {
    const rebuilt = buildPitch(
      item.title,
      item.pipeline,
      item.pitchKind,
      item.contact,
      item.location,
      item.startAt,
      item.summary,
      state.profile
    )
    await navigator.clipboard.writeText(`Subject: ${rebuilt.subject}\n\n${rebuilt.body}`)
    setCopied("pitch")
    window.setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="mt-10 space-y-8">
      <Brief data={data} overdue={overdue} loading={loading} />

      <div className="flex flex-col gap-4 rounded-3xl bg-[#1c1814] p-5 ring-1 ring-white/10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9b8a0]">
            {loading ? "Scoring worldwide" : error ? "Scan error" : "Ranked for Matthew"}
          </p>
          <p className="mt-1 text-sm text-[#e8dcc8]">
            {data
              ? `${data.opportunities.length} opportunities · last pass ${new Date(data.scannedAt).toLocaleTimeString("en-US", { timeZone: "America/Chicago" })} CT`
              : "Pulling jobs, press desks, hotels, and live listings"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void scan(true)} disabled={loading}>
            {loading ? "Scoring…" : "Rescan sources"}
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            className="border-white/20"
            render={<Link href="/bot" />}
          >
            Scout feed
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-[#c8102e]/40 bg-[#c8102e]/10 px-5 py-4">
          {error}. Catalog jobs, hotels, and seeds still load on retry.
        </div>
      ) : null}

      <ProfileBar
        state={state}
        onChange={(profile) => {
          const next = { ...state, profile }
          saveDeskState(next)
          setState(next)
        }}
      />

      <div className="flex flex-wrap gap-2">
        <PipelineChip
          active={pipeline === "all"}
          onClick={() => setPipeline("all")}
          label={`All · ${data?.opportunities.length ?? 0}`}
        />
        {PIPELINES.map((id) => (
          <PipelineChip
            key={id}
            active={pipeline === id}
            onClick={() => setPipeline(id)}
            label={`${PIPELINE_LABELS[id]} · ${data?.pipelineCounts[id] ?? 0}`}
          />
        ))}
      </div>

      {pipeline === "adult" ? (
        <p className="rounded-2xl border border-[#c8102e]/40 bg-[#c8102e]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          18+ only. This tab mixes boudoir studios, artistic nude, erotic/creator
          sets, figure rooms, fetish-week coverage, contests, and male talent
          calls across the Chicagoland metro (city, North Shore, west/south
          suburbs, Hammond). Figure sessions are often drawing-only — ask before
          a camera. Adult film work is labeled as talent, not boudoir. Everyone
          on set must be 18+ with ID.
        </p>
      ) : null}

      {pipeline === "hotel" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Hotel content stays are worldwide. Ranked rows include Stayamo, SURŌ,
          Vayada, Hotel Creators, Accor, OYO Frames, Loews, Marriott, Hyatt, and
          tourism-board media hosting — plus Chicago properties because you live
          there. Distance is not scored as a South Loop walk for global
          marketplaces. No standing free room-and-board. Pitches never auto-send.
        </p>
      ) : null}

      {pipeline === "housesit" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Luxury house sitting is lodging for care, usually pets — not a salary
          and not a hotel content stay. TrustedHousesitters, Nomador, Luxury
          House Sitting. Florida is dense; Illinois is thinner. Paid caretaker /
          house-manager work is Caretaker Gazette and staffing agencies.
          Placement mills that charge a fee are a skip. Nothing auto-applies.
        </p>
      ) : null}

      {pipeline === "acting" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Chicagoland acting scout. Apply on Backstage, Actors Access, Casting
          Networks, and the Equity hotline. Extra and stand-in days: Cine-Casting,
          4 Star, Compass/Bokeh, Joan Philo (Fire/Med). Do not pay a company to
          be background. SRO here means Broadway in Chicago rush/lottery plus
          ushering (Steppenwolf, The Saints) so you stand in the room with other
          aspiring actors. Pitches never auto-send.
        </p>
      ) : null}

      {pipeline === "headshots" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Paid headshots only. Models and actors who need digitals, plus
          locations (Peerspace hosts, film-office sites, stages) that will pay
          for listing stills. Quote a sitting fee. Point them at the portraits
          site. Skip unpaid TFP unless you need the test. Everyone in an 18+
          brief must show ID.
        </p>
      ) : null}

      {pipeline === "advertise" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Advertise the businesses — not clients who pay you (that is Paid
          Headshots). Free shelves first: Google Business, Maps, Instagram,
          Reddit, Nextdoor. Paid: Google/Meta ads, Thumbtack, Bark, The Knot.
          OnlyFans belongs on 18+ boards that allow the link (Reddit NSFW, X,
          FetLife, TrafficJunky). Instagram/TikTok as OF funnels are ban risk.
          Listing copy never auto-posts.
        </p>
      ) : null}

      {pipeline === "grant" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Grants and capital for the company. Illinois (DCASE, IAC, DCEO, SBA
          Illinois) and Florida (Division of Arts, Miami-Dade, SBDC, SBA South
          Florida) plus federal Grants.gov / NEA. Charity rows need a nonprofit
          partner. Microloans are debt. Grant-mill fees are a skip. Nothing
          auto-submits.
        </p>
      ) : null}

      {pipeline === "contracts" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Government contracts. Illinois: BidBuy, Chicago DPS, Cook County.
          Florida: MyFloridaMarketPlace, Miami-Dade, Orlando, Tampa,
          Jacksonville. Federal: SAM.gov (free on the official site). NAICS
          541921 / 541922. Register, then bid. This desk does not file the bid.
        </p>
      ) : null}

      {pipeline === "contest" ? (
        <p className="rounded-2xl border border-[#e2b657]/30 bg-[#e2b657]/10 px-5 py-4 text-sm leading-7 text-[#e8dcc8]">
          Contests and awards. A clip, not payroll. Illinois: IPPA, Filter Photo.
          Florida: Palm Beach Photographic Centre. National: LensCulture / IPA.
          Entry fees are marketing spend.
        </p>
      ) : null}

      <label className="flex items-center gap-2 text-sm text-[#c9b8a0]">
        <input
          type="checkbox"
          checked={showMuted}
          onChange={(event) => setShowMuted(event.target.checked)}
        />
        Show muted / low-value repeats
      </label>

      {loading && !data ? (
        <div className="space-y-3">
          <div className="h-16 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-16 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-16 animate-pulse rounded-2xl bg-white/10" />
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-[#c9b8a0]">
          Nothing in this pipeline. Mute fewer listings or rescan.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-2xl ring-1 ring-white/10 lg:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-[#1c1814] text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">
                <tr>
                  <th className="px-4 py-3 font-medium">Opportunity</th>
                  <th className="px-3 py-3 font-medium">Score</th>
                  <th className="px-3 py-3 font-medium">Money</th>
                  <th className="px-3 py-3 font-medium">Cost</th>
                  <th className="px-3 py-3 font-medium">Deadline</th>
                  <th className="px-3 py-3 font-medium">Contact</th>
                  <th className="px-3 py-3 font-medium">Next action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t border-white/10 hover:bg-white/5"
                    onClick={() => setSelected(row)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#f4ede1]">{row.title}</p>
                      <p className="mt-1 text-xs text-[#c9b8a0]">
                        {PIPELINE_LABELS[row.pipeline]} · {PRESS_LABEL[row.pressAccess]} ·{" "}
                        {travelLabel(row.travelMinutes)}
                        {row.conflicts.length ? " · calendar conflict" : ""}
                      </p>
                    </td>
                    <td className={cn("px-3 py-3 font-heading text-xl", scoreColor(row.score))}>
                      {row.score}
                    </td>
                    <td className="px-3 py-3">{row.moneyLabel}</td>
                    <td className="px-3 py-3">{row.costLabel}</td>
                    <td className="px-3 py-3">{formatWhen(row.deadline || row.startAt)}</td>
                    <td className="px-3 py-3">
                      {row.contact ? `${roleShort(row.contact.role)}` : "—"}
                      <span className="block text-xs text-[#c9b8a0]">
                        {row.contact?.name.split(" ")[0] || "—"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={row.score >= 85 ? "secondary" : "outline"}>
                        {row.tracker?.status
                          ? LIFECYCLE_LABELS[row.tracker.status]
                          : row.nextAction}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 lg:hidden">
            {rows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => setSelected(row)}
                className="rounded-2xl bg-[#1c1814] p-4 text-left ring-1 ring-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-heading text-xl">{row.title}</p>
                  <span className={cn("font-heading text-2xl", scoreColor(row.score))}>
                    {row.score}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#c9b8a0]">
                  {row.moneyLabel} · cost {row.costLabel} · {formatWhen(row.deadline || row.startAt)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">
                  {row.nextAction} · {PRESS_LABEL[row.pressAccess]}
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      {data ? <WatchList searches={data.watchSearches} sources={data.sources} /> : null}

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto bg-[#1c1814] sm:max-w-lg"
        >
          {selected ? (
            <Detail
              item={rows.find((row) => row.id === selected.id) ?? selected}
              tracker={state.items[selected.id]}
              copied={copied === "pitch"}
              onCopy={() => void copyPitch(selected)}
              onStatus={(status) =>
                update(selected.id, { status }, `status:${status}`)
              }
              onVote={(vote) =>
                update(
                  selected.id,
                  { vote },
                  `vote:${vote} ${learningTokens(selected.title, selected.pipeline)
                    .map((token) => `token:${token}`)
                    .join(" ")}`
                )
              }
              onMute={() =>
                update(
                  selected.id,
                  { blacklisted: !state.items[selected.id]?.blacklisted },
                  "mute-toggle"
                )
              }
              onFollowUp={(followUpAt) => update(selected.id, { followUpAt }, "follow-up set")}
              onNote={(notes) => update(selected.id, { notes })}
              onMarkSent={() =>
                update(
                  selected.id,
                  {
                    status: "applied",
                    lastContactAt: new Date().toISOString(),
                  },
                  "pitch copied — marked applied after your send"
                )
              }
            />
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function Brief({
  data,
  overdue,
  loading,
}: {
  data: DeskPayload | null
  overdue: number
  loading: boolean
}) {
  if (loading && !data) {
    return <div className="h-36 animate-pulse rounded-3xl bg-white/10" />
  }
  if (!data) return null
  const { brief } = data
  const cards = [
    { n: brief.applyToday.length, label: "apply today" },
    { n: brief.pressClosing.length, label: "press closing soon" },
    { n: brief.companiesToPitch.length, label: "companies to pitch" },
    { n: brief.hotelLeads.length, label: "hotel collab leads" },
    { n: overdue, label: "follow-ups overdue" },
    { n: brief.tonightNetworking.length, label: "tonight’s networking" },
  ]
  return (
    <section className="rounded-3xl bg-[#1c1814] p-5 ring-1 ring-white/10 sm:p-7">
      <p className="text-xs uppercase tracking-[0.2em] text-[#e2b657]">Daily action brief</p>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-[#e8dcc8]">{brief.headline}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-black/25 px-3 py-3">
            <p className="font-heading text-3xl text-[#f4ede1]">{card.n}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProfileBar({
  state,
  onChange,
}: {
  state: DeskState
  onChange: (profile: DeskState["profile"]) => void
}) {
  const field =
    "h-9 w-full rounded-lg border border-white/15 bg-black/20 px-3 text-sm text-[#f4ede1]"
  return (
    <details className="rounded-2xl ring-1 ring-white/10">
      <summary className="cursor-pointer px-4 py-3 text-sm text-[#c9b8a0]">
        Pitch as {state.profile.name || "Matthew"} · {state.profile.email} · never auto-send
      </summary>
      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          className={field}
          value={state.profile.name}
          placeholder="Name"
          onChange={(event) => onChange({ ...state.profile, name: event.target.value })}
        />
        <input
          className={field}
          value={state.profile.email}
          placeholder="Email"
          onChange={(event) => onChange({ ...state.profile, email: event.target.value })}
        />
        <input
          className={field}
          value={state.profile.instagram}
          placeholder="@instagram"
          onChange={(event) => onChange({ ...state.profile, instagram: event.target.value })}
        />
        <input
          className={field}
          value={state.profile.portfolio}
          placeholder="Portfolio URL"
          onChange={(event) => onChange({ ...state.profile, portfolio: event.target.value })}
        />
      </div>
    </details>
  )
}

function PipelineChip({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm",
        active ? "bg-[#f4ede1] text-[#14110e]" : "bg-white/5 text-[#e8dcc8] hover:bg-white/10"
      )}
    >
      {label}
    </button>
  )
}

function Detail({
  item,
  tracker,
  copied,
  onCopy,
  onStatus,
  onVote,
  onMute,
  onFollowUp,
  onNote,
  onMarkSent,
}: {
  item: Opportunity
  tracker?: DeskState["items"][string]
  copied: boolean
  onCopy: () => void
  onStatus: (status: Lifecycle) => void
  onVote: (vote: "useful" | "not") => void
  onMute: () => void
  onFollowUp: (iso: string) => void
  onNote: (notes: string) => void
  onMarkSent: () => void
}) {
  const pitch = buildPitch(
    item.title,
    item.pipeline,
    item.pitchKind,
    item.contact,
    item.location,
    item.startAt,
    item.summary,
    loadDeskState().profile
  )
  const mailto = item.contact?.email
    ? `mailto:${item.contact.email}?subject=${encodeURIComponent(pitch.subject)}&body=${encodeURIComponent(pitch.body)}`
    : item.url

  return (
    <div className="space-y-5 p-2 pb-10">
      <SheetHeader>
        <SheetTitle className="font-heading text-2xl text-[#f4ede1]">
          {item.title}
        </SheetTitle>
      </SheetHeader>
      <div className="flex flex-wrap gap-1.5">
        <Badge>{item.score}</Badge>
        <Badge variant="outline">{PIPELINE_LABELS[item.pipeline]}</Badge>
        <Badge variant="secondary">{PRESS_LABEL[item.pressAccess]}</Badge>
        {item.photographersWelcome ? (
          <Badge variant="outline">Photographers welcome</Badge>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-[#c9b8a0]">{item.whyScore}</p>
      <p className="text-sm leading-6 text-[#e8dcc8]">{item.summary}</p>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <Fact label="Money" value={item.moneyLabel} />
        <Fact label="Cost" value={item.costLabel} />
        <Fact label="Deadline" value={formatWhen(item.deadline)} />
        <Fact label="When" value={formatWhen(item.startAt)} />
        <Fact label="Travel" value={travelLabel(item.travelMinutes)} />
        <Fact label="Source" value={item.source} />
      </dl>
      {item.hotelTrade ? (
        <p className="text-sm text-[#c9b8a0]">
          Hotel trade realism {item.hotelTrade.realism}: lodging{" "}
          {item.hotelTrade.lodging ? "yes" : "no"}, meals{" "}
          {item.hotelTrade.meals ? "negotiable" : "no"}, parking{" "}
          {item.hotelTrade.parking ? "yes" : "no"}, credits{" "}
          {item.hotelTrade.credits ? "yes" : "no"}. {item.hotelTrade.campaign}.
        </p>
      ) : null}
      {item.conflicts.length ? (
        <p className="rounded-xl border border-[#e2b657]/40 px-3 py-2 text-sm text-[#e2b657]">
          Calendar conflict: {item.conflicts.slice(0, 3).join(" · ")}
        </p>
      ) : null}
      {item.contact ? (
        <div className="rounded-2xl bg-black/25 p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">Contact</p>
          <p className="mt-1 text-[#f4ede1]">
            {item.contact.name} · {item.contact.role}
          </p>
          <p className="text-[#c9b8a0]">{item.contact.company}</p>
          {item.contact.email ? <p>{item.contact.email}</p> : null}
          {item.contact.linkedin ? (
            <a className="underline" href={item.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {tracker?.lastContactAt ? (
            <p className="mt-2 text-xs text-[#c9b8a0]">
              Last contact {formatWhen(tracker.lastContactAt)}
            </p>
          ) : null}
        </div>
      ) : null}

      <label className="block text-sm">
        <span className="text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">Lifecycle</span>
        <select
          className="mt-1 h-9 w-full rounded-lg border border-white/15 bg-black/20 px-2"
          value={tracker?.status ?? "found"}
          onChange={(event) => onStatus(event.target.value as Lifecycle)}
        >
          {LIFECYCLES.map((status) => (
            <option key={status} value={status}>
              {LIFECYCLE_LABELS[status]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">Follow up</span>
        <input
          type="date"
          className="mt-1 h-9 w-full rounded-lg border border-white/15 bg-black/20 px-2"
          value={tracker?.followUpAt?.slice(0, 10) ?? ""}
          onChange={(event) =>
            onFollowUp(event.target.value ? `${event.target.value}T12:00:00-05:00` : "")
          }
        />
      </label>
      <label className="block text-sm">
        <span className="text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">Notes / outcome</span>
        <textarea
          className="mt-1 min-h-20 w-full rounded-lg border border-white/15 bg-black/20 p-2"
          value={tracker?.notes ?? ""}
          onChange={(event) => onNote(event.target.value)}
        />
      </label>

      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#c9b8a0]">
          {item.pitchKind} · copy, then send yourself
        </p>
        <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-black/30 p-3 text-xs leading-5 text-[#e8dcc8]">
          {`Subject: ${pitch.subject}\n\n${pitch.body}`}
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onCopy}>{copied ? "Copied pitch" : "Copy pitch"}</Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="border-white/20"
          render={<a href={mailto} target={item.contact?.email ? undefined : "_blank"} rel="noreferrer" />}
        >
          Open mail / listing
        </Button>
        <Button variant="secondary" onClick={onMarkSent}>
          I sent this
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={tracker?.vote === "useful" ? "default" : "outline"}
          className="border-white/20"
          onClick={() => onVote("useful")}
        >
          Useful
        </Button>
        <Button
          variant={tracker?.vote === "not" ? "default" : "outline"}
          className="border-white/20"
          onClick={() => onVote("not")}
        >
          Not useful
        </Button>
        <Button variant="ghost" onClick={onMute}>
          {tracker?.blacklisted ? "Unmute" : "Mute this / blacklist"}
        </Button>
      </div>
      <a className="text-sm underline" href={item.url} target="_blank" rel="noreferrer">
        Open original listing
      </a>
    </div>
  )
}

function WatchList({
  searches,
  sources,
}: {
  searches: DeskPayload["watchSearches"]
  sources: DeskPayload["sources"]
}) {
  return (
    <section>
      <h2 className="font-heading text-2xl">Sources Scout actually hit</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#1c1814] p-4 ring-1 ring-white/10"
          >
            <p>{source.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">
              {source.ok ? `${source.found} hits` : source.error}
            </p>
          </a>
        ))}
      </div>
      <h3 className="mt-8 font-heading text-xl">Boards that block scrapers — open by hand</h3>
      <p className="mt-2 max-w-3xl text-sm text-[#c9b8a0]">
        LinkedIn, Indeed, Instagram, X, PurplePort, ModelMayhem, ModelManagement,
        AdultFolio, SexyJobs, POSED MAG, and Casting Networks block scrapers.
        Scout keeps the search URLs current — Chicagoland jobs and events,
        acting/extra/SRO boards (Backstage, Actors Access, Cine-Casting, The
        Saints), paid headshot leads (ModelMayhem, Peerspace, Instagram),
        worldwide hotel stays, plus destination boudoir and 18+ talent boards.
        Advertise-scout URLs (Google Business, Thumbtack, Reddit promo, FetLife,
        TrafficJunky, OnlyFinder) are here too — open them by hand, never auto-post.
        Funding boards (Grants.gov, SAM.gov, BidBuy, Chicago DPS, MyFloridaMarketPlace,
        DCASE, IAC, Florida arts, SBA Illinois, Florida SBDC) also do not scrape.
        House-sit boards (TrustedHousesitters, Nomador, Caretaker Gazette) are
        the same — open by hand, never auto-apply.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {searches.map((search) => (
          <Button
            key={search.id}
            nativeButton={false}
            variant="outline"
            className="border-white/20"
            render={<a href={search.url} target="_blank" rel="noreferrer" />}
          >
            {search.name}
          </Button>
        ))}
      </div>
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-[#c9b8a0]">{label}</dt>
      <dd className="mt-1">{value || "—"}</dd>
    </div>
  )
}

function formatWhen(iso?: string) {
  if (!iso) return "Open"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Open"
  const chicagoDay = date.toLocaleDateString("en-CA", { timeZone: "America/Chicago" })
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" })
  if (chicagoDay === today) return "Today"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/Chicago",
  })
}

function scoreColor(score: number) {
  if (score >= 90) return "text-[#e2b657]"
  if (score >= 75) return "text-[#f4ede1]"
  return "text-[#c9b8a0]"
}

function roleShort(role: string) {
  if (/producer/i.test(role)) return "Producer"
  if (/cast/i.test(role)) return "Casting"
  if (/pr/i.test(role)) return "PR manager"
  if (/recruit/i.test(role)) return "Recruiter"
  if (/hotel/i.test(role)) return "Marketing"
  if (/organizer/i.test(role)) return "Organizer"
  return role
}
