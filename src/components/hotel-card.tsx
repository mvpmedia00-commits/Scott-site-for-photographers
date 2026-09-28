import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { HotelCollab } from "@/lib/types"

export function HotelCard({ hotel }: { hotel: HotelCollab }) {
  return (
    <Card className="bg-[#1c1814] text-[#f4ede1] ring-white/10">
      <CardHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={
              hotel.likelihood === "Already filled" ? "destructive" : "secondary"
            }
          >
            {hotel.likelihood}
          </Badge>
          <Badge variant="outline">{hotel.region}</Badge>
          {hotel.photographerTrack ? (
            <Badge variant="outline">Photographer track</Badge>
          ) : (
            <Badge variant="outline">Influencer / media desk</Badge>
          )}
        </div>
        <CardTitle className="font-heading text-xl">{hotel.name}</CardTitle>
        <CardDescription className="text-[#c9b8a0]">
          {hotel.city}, {hotel.country}
          <span className="mt-1 block">
            {hotel.neighborhood} · {hotel.address}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <span className="text-[#c9b8a0]">Best for: </span>
          {hotel.bestFor}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Room: </span>
          {hotel.room}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Meals: </span>
          {hotel.meals}
        </p>
        <p>{hotel.why}</p>
        <p className="text-[#c9b8a0]">
          <span className="text-[#f4ede1]">They will want: </span>
          {hotel.deliverables}
        </p>
        <p>{hotel.howToApply}</p>
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <Button
          nativeButton={false}
          render={
            <a href={hotel.applyUrl} target="_blank" rel="noreferrer" />
          }
        >
          {hotel.applyLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
