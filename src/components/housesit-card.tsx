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
import type { HouseSitKind, HouseSitLead, HouseSitRegion } from "@/lib/types"

const KIND_LABEL: Record<HouseSitKind, string> = {
  "luxury-sit": "Luxury sit",
  marketplace: "Sit marketplace",
  "paid-caretaker": "Paid caretaker",
}

const REGION_LABEL: Record<HouseSitRegion, string> = {
  worldwide: "Worldwide",
  "united-states": "United States",
  illinois: "Illinois",
  florida: "Florida",
  europe: "Europe",
}

export function HouseSitCard({ lead }: { lead: HouseSitLead }) {
  return (
    <Card className="bg-[#1c1814] text-[#f4ede1] ring-white/10">
      <CardHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={lead.kind === "paid-caretaker" ? "secondary" : "outline"}>
            {KIND_LABEL[lead.kind]}
          </Badge>
          <Badge variant="outline">{REGION_LABEL[lead.region]}</Badge>
          {lead.scamRisk ? <Badge variant="outline">Scam warning</Badge> : null}
          <Badge variant="outline">{lead.neighborhood}</Badge>
        </div>
        <CardTitle className="font-heading text-xl">{lead.name}</CardTitle>
        <CardDescription className="text-[#c9b8a0]">
          {lead.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <span className="text-[#c9b8a0]">Best for: </span>
          {lead.bestFor}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Pay: </span>
          {lead.pay}
        </p>
        <p>
          <span className="text-[#c9b8a0]">Cost to you: </span>
          {lead.cost}
        </p>
        <p>{lead.why}</p>
        <p>{lead.howToApply}</p>
        <p className="text-sm text-[#c9b8a0]">{lead.terms}</p>
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <Button
          nativeButton={false}
          render={<a href={lead.applyUrl} target="_blank" rel="noreferrer" />}
        >
          {lead.applyLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
