import { publicSites } from "@/data/sites"

export function SitesHub({
  eyebrow = "Websites",
  title = "Open a site",
  asPage = false,
}: {
  eyebrow?: string
  title?: string
  asPage?: boolean
}) {
  const Heading = asPage ? "h1" : "h2"
  return (
    <section className="border-b border-white/10 bg-[#100e0c]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[#e2b657]">{eyebrow}</p>
        <Heading className="mt-2 font-heading text-4xl sm:text-5xl">{title}</Heading>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#c9b8a0]">
          Three live sites. Click a card — it is a normal web link. Source zips
          are on{" "}
          <a href="/code" className="underline">
            /code
          </a>
          .
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {publicSites.map((site) => (
            <a
              key={site.slug}
              href={site.href}
              className="flex flex-col rounded-3xl bg-[#1c1814] p-6 ring-1 ring-white/10 transition-colors hover:bg-[#241f1a] hover:ring-[#c4a574]/50"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#c4a574]">
                {site.tag}
              </p>
              <h2 className="mt-3 font-heading text-2xl">{site.name}</h2>
              <p className="mt-3 flex-1 leading-7 text-[#c9b8a0]">{site.blurb}</p>
              <span className="mt-8 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
                {site.cta}
              </span>
              <span className="mt-3 text-xs text-[#c4a574] underline">{site.href}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
