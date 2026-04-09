export default function TagCloud({ tags, limit = 40 }: {
  tags: Record<string, number>
  limit?: number
}) {
  const sorted = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)

  function tier(count: number) {
    if (count >= 10) return 'text-base font-semibold bg-accent-100 text-accent-700'
    if (count >= 6) return 'text-sm font-medium bg-accent-50 text-accent-600'
    if (count >= 3) return 'text-xs bg-surface-2 text-text-secondary'
    return 'text-xs bg-surface-2 text-text-muted'
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sorted.map(([tag, count]) => (
        <span
          key={tag}
          className={`px-3 py-1 rounded-full ${tier(count)}`}
        >
          {tag}
          <span className="ml-1 opacity-60">{count}</span>
        </span>
      ))}
    </div>
  )
}
