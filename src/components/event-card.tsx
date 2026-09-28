import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PhotoEvent } from "@/lib/types"

function formatRange(event: PhotoEvent) {
  const start = new Date(`${event.start}T12:00:00`)
  const startLabel = start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  if (!event.end) return startLabel
  const end = new Date(`${event.end}T12:00:00`)
  return `${startLabel} – ${end.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}`
}

export function EventCard({ event }: { event: PhotoEvent }) {
  return (
    <Card className="bg-[#1c1814] text-[#f4ede1] ring-white/10">
      <CardHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{event.careerFit}</Badge>
          <Badge variant="outline">{event.kind}</Badge>
          {event.soldOut ? <Badge variant="destructive">Sold out</Badge> : null}
        </div>
        <CardTitle className="font-heading text-xl text-[#f4ede1]">
          {event.title}
        </CardTitle>
        <CardDescription className="text-[#c9b8a0]">
          {formatRange(event)} · {event.time}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[#e8dcc8]">
          {event.venue}
          <br />
          {event.address} · {event.neighborhood}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Cost: </span>
          {event.cost}
        </p>
        <p>{event.why}</p>
        <p className="text-[#c9b8a0]">
          <span className="text-[#f4ede1]">How to use it: </span>
          {event.howToUse}
        </p>
        {event.rsvpNote ? (
          <p className="text-sm text-[#e2b657]">{event.rsvpNote}</p>
        ) : null}
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-[#f4ede1] underline-offset-4 hover:underline"
        >
          Open event details
        </a>
      </CardFooter>
    </Card>
  )
}
