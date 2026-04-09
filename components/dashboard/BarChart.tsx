export default function BarChart({ items, maxItems = 15 }: {
  items: { label: string; value: number }[]
  maxItems?: number
}) {
  const sorted = [...items].sort((a, b) => b.value - a.value).slice(0, maxItems)
  const max = sorted[0]?.value || 1

  return (
    <div className="space-y-2">
      {sorted.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <span className="w-20 sm:w-28 text-right text-xs sm:text-sm text-text-secondary truncate shrink-0">
            {label}
          </span>
          <div className="flex-1 h-5 sm:h-6 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-400 rounded-full"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="w-6 sm:w-8 text-xs sm:text-sm text-text-muted tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  )
}
