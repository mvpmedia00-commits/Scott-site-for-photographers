import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PhotoJob } from "@/lib/types"

export function JobCard({ job }: { job: PhotoJob }) {
  return (
    <Card className="bg-[#1c1814] text-[#f4ede1] ring-white/10">
      <CardHeader>
        <CardTitle className="font-heading text-xl">{job.title}</CardTitle>
        <CardDescription className="text-[#c9b8a0]">
          {job.employer} · {job.type}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <span className="text-[#c9b8a0]">Pay: </span>
          {job.pay}
        </p>
        <p>{job.why}</p>
        <ul className="list-disc space-y-1 pl-5 text-[#c9b8a0]">
          {job.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <Button
          nativeButton={false}
          render={<a href={job.url} target="_blank" rel="noreferrer" />}
        >
          Open listing
        </Button>
      </CardFooter>
    </Card>
  )
}
