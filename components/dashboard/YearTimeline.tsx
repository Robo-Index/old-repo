export default function YearTimeline({ years }: { years: Record<string, number> }) {
  const entries = Object.entries(years)
    .map(([y, c]) => ({ year: y, count: c }))
    .sort((a, b) => Number(a.year) - Number(b.year))

  const max = Math.max(...entries.map(e => e.count), 1)
  const containerH = 200

  // YoY growth
  const counts = entries.map(e => e.count)
  let growthLabel = ''
  if (counts.length >= 2) {
    const prev = counts[counts.length - 2]
    const curr = counts[counts.length - 1]
    if (prev > 0) {
      const pct = Math.round(((curr - prev) / prev) * 100)
      growthLabel = pct >= 0 ? `+${pct}% YoY` : `${pct}% YoY`
    }
  }

  return (
    <div>
      <div
        className="grid items-end gap-3"
        style={{
          gridTemplateColumns: `repeat(${entries.length}, 1fr)`,
          height: containerH,
        }}
      >
        {entries.map(({ year, count }) => (
          <div key={year} className="flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-xs text-text-muted tabular-nums">{count}</span>
            <div
              className="w-full max-w-[48px] bg-accent-400 rounded-t-md mx-auto"
              style={{ height: `${(count / max) * (containerH - 40)}px` }}
            />
          </div>
        ))}
      </div>
      <div
        className="grid gap-3 mt-2"
        style={{ gridTemplateColumns: `repeat(${entries.length}, 1fr)` }}
      >
        {entries.map(({ year }) => (
          <span key={year} className="text-xs text-text-muted text-center tabular-nums">
            {year}
          </span>
        ))}
      </div>
      {growthLabel && (
        <p className="text-sm text-text-muted mt-3 text-center">{growthLabel}</p>
      )}
    </div>
  )
}
