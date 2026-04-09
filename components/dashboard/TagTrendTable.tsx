import type { Paper } from '@/src/lib/types'

export default function TagTrendTable({ papers }: { papers: Paper[] }) {
  // Build tag → year → count matrix
  const matrix: Record<string, Record<number, number>> = {}
  for (const p of papers) {
    for (const rawTag of p.tags) {
      const tag = rawTag.toLowerCase()
      if (!matrix[tag]) matrix[tag] = {}
      matrix[tag][p.year] = (matrix[tag][p.year] || 0) + 1
    }
  }

  // Top 10 tags by total count
  const tagTotals = Object.entries(matrix)
    .map(([tag, yrs]) => ({ tag, total: Object.values(yrs).reduce((s, v) => s + v, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const years = [2022, 2023, 2024, 2025, 2026]

  function heatClass(count: number) {
    if (count >= 7) return 'bg-accent-300 text-accent-900'
    if (count >= 4) return 'bg-accent-200 text-accent-800'
    if (count >= 2) return 'bg-accent-100 text-accent-700'
    if (count >= 1) return 'bg-accent-50 text-accent-600'
    return ''
  }

  function trendArrow(tag: string) {
    const yrs = matrix[tag]
    const latest = yrs[years[years.length - 1]] || 0
    const priorYears = years.slice(0, -1)
    const priorCounts = priorYears.map(y => yrs[y] || 0)
    const priorMean = priorCounts.length > 0
      ? priorCounts.reduce((s, v) => s + v, 0) / priorCounts.length
      : 0
    if (latest > priorMean + 0.5) return '↑'
    if (latest < priorMean - 0.5) return '↓'
    return '—'
  }

  if (tagTotals.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-text-muted">
            <th className="text-left font-medium py-2 pr-4">Tag</th>
            {years.map(y => (
              <th key={y} className="font-medium py-2 px-3 text-center tabular-nums">{y}</th>
            ))}
            <th className="font-medium py-2 pl-3 text-center">Trend</th>
          </tr>
        </thead>
        <tbody>
          {tagTotals.map(({ tag }) => (
            <tr key={tag} className="border-t border-border-light">
              <td className="py-2 pr-4 text-text-secondary">{tag}</td>
              {years.map(y => {
                const count = matrix[tag][y] || 0
                return (
                  <td key={y} className={`py-2 px-3 text-center tabular-nums rounded ${heatClass(count)}`}>
                    {count || ''}
                  </td>
                )
              })}
              <td className="py-2 pl-3 text-center">{trendArrow(tag)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
