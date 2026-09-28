import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Download MVP Media Portraits source" },
}

export default function DownloadPortraitsPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-[#e2b657]">
        Source
      </p>
      <h1 className="mt-2 font-heading text-4xl">MVP Media Portraits</h1>
      <p className="mt-4 leading-7 text-[#c9b8a0]">
        Headshots and portraits site. No 18+ gate. This is a 103 KB zip of the
        Next.js source in <code className="text-[#f4ede1]">portraits-site/</code>.
        Right-click the link and choose Save if the preview pane blocks downloads.
      </p>
      <a
        href="/api/download/portraits"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground"
      >
        Save mvp-media-portraits.zip
      </a>
      <p className="mt-4 text-sm text-[#c9b8a0]">
        Backup links:{" "}
        <a className="underline" href="/mvp-media-portraits.zip" target="_blank" rel="noreferrer">
          /mvp-media-portraits.zip
        </a>
        {" · "}
        <a className="underline" href="/downloads/mvp-media-portraits.zip" target="_blank" rel="noreferrer">
          /downloads/mvp-media-portraits.zip
        </a>
      </p>
    </section>
  )
}
