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
import type { AdBusiness, AdChannel } from "@/lib/types"

const BUSINESS_LABEL: Record<AdBusiness, string> = {
  boudoir: "Boudoir",
  headshots: "Headshots",
  onlyfans: "OnlyFans 18+",
}

const PRICE_LABEL: Record<AdChannel["price"], string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Free + paid upgrades",
}

export function AdvertiseCard({ channel }: { channel: AdChannel }) {
  return (
    <Card className="bg-[#1c1814] text-[#f4ede1] ring-white/10">
      <CardHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={channel.price === "free" ? "secondary" : "outline"}>
            {PRICE_LABEL[channel.price]}
          </Badge>
          {channel.businesses.map((business) => (
            <Badge key={business} variant="outline">
              {BUSINESS_LABEL[business]}
            </Badge>
          ))}
          {channel.adultOnly ? <Badge variant="outline">18+</Badge> : null}
          {channel.banRisk ? <Badge variant="outline">Ban risk</Badge> : null}
          <Badge variant="outline">{channel.neighborhood}</Badge>
        </div>
        <CardTitle className="font-heading text-xl">{channel.name}</CardTitle>
        <CardDescription className="text-[#c9b8a0]">
          {channel.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <span className="text-[#c9b8a0]">Best for: </span>
          {channel.bestFor}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Cost to you: </span>
          {channel.cost}
        </p>
        <p>{channel.why}</p>
        <p>{channel.howToApply}</p>
        <p className="text-sm text-[#c9b8a0]">{channel.terms}</p>
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <Button
          nativeButton={false}
          render={<a href={channel.applyUrl} target="_blank" rel="noreferrer" />}
        >
          {channel.applyLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
