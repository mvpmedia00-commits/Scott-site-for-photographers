export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="h-10 w-64 animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-24 max-w-2xl animate-pulse rounded bg-white/10" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-2xl bg-white/10" />
        <div className="h-48 animate-pulse rounded-2xl bg-white/10" />
      </div>
    </div>
  )
}
