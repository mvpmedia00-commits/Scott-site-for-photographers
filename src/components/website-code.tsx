import Link from "next/link"

import { websiteCodePacks } from "@/data/website-code"

function ZipLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

export function WebsiteCode() {
  const portraits = websiteCodePacks.find((pack) => pack.id === "portraits")
  return (
    <section className="border-b border-white/10 bg-[#100e0c]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[#e2b657]">
          Source
        </p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
          Code: MVP Media Portraits
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#c9b8a0]">
          Headshots site, no age gate. The zip is 103 KB of Next.js source. If
          the preview window blocks the file, open{" "}
          <Link className="underline" href="/download">
            /download
          </Link>{" "}
          and use Save link as.
        </p>
        {portraits ? (
          <ZipLink
            href={portraits.zipHref}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground"
          >
            Save mvp-media-portraits.zip
          </ZipLink>
        ) : null}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {websiteCodePacks.map((pack) => (
            <article
              key={pack.id}
              className="flex flex-col rounded-3xl bg-[#1c1814] p-6 ring-1 ring-white/10"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#c4a574]">
                {pack.tag} · {pack.folder}
              </p>
              <h2 className="mt-3 font-heading text-2xl">{pack.name}</h2>
              <p className="mt-3 leading-7 text-[#c9b8a0]">{pack.blurb}</p>
              <p className="mt-4 font-mono text-xs leading-5 text-[#e8dcc8]">
                {pack.run}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                {pack.pages.map((page) => (
                  <li key={page.href}>
                    <Link className="underline" href={page.href}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/40 p-4 font-mono text-[11px] leading-5 text-[#c9b8a0]">
                {pack.tree.join("\n")}
              </pre>
              <div className="mt-6 flex flex-wrap gap-2">
                <ZipLink
                  href={pack.zipHref}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
                >
                  Save zip
                </ZipLink>
                <Link
                  href={pack.previewHref}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-white/20 px-3 text-sm"
                >
                  Open site
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
