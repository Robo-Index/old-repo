'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Stats, PaperIndex, Paper } from '@/src/lib/types'
import StatCard from './StatCard'
import BarChart from './BarChart'
import YearTimeline from './YearTimeline'
import TagCloud from './TagCloud'
import TagTrendTable from './TagTrendTable'

export default function DashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function fetchData() {
    setLoading(true)
    setError(null)
    Promise.all([
      fetch('/api/stats.json').then(r => { if (!r.ok) throw new Error('Failed to load stats'); return r.json() }),
      fetch('/api/papers.json').then(r => { if (!r.ok) throw new Error('Failed to load papers'); return r.json() }),
    ])
      .then(([s, p]: [Stats, PaperIndex]) => {
        setStats(s)
        setPapers(p.data)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  // Normalize tags: merge case variants
  const normalizedTags = useMemo(() => {
    if (!stats) return {}
    const merged: Record<string, number> = {}
    for (const [tag, count] of Object.entries(stats.tags)) {
      const key = tag.toLowerCase()
      merged[key] = (merged[key] || 0) + count
    }
    return merged
  }, [stats])

  const tagItems = useMemo(
    () => Object.entries(normalizedTags).map(([label, value]) => ({ label, value })),
    [normalizedTags],
  )

  const venueItems = useMemo(
    () => stats ? Object.entries(stats.venues).map(([label, value]) => ({ label, value })) : [],
    [stats],
  )

  const yearsRecord = useMemo(
    () => stats ? Object.fromEntries(Object.entries(stats.years).map(([y, c]) => [y, c])) : {},
    [stats],
  )

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-surface-2 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">{error || 'No data available'}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 text-sm bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  const openSourceRate = stats.total_papers > 0
    ? Math.round((stats.papers_with_repo / stats.total_papers) * 100)
    : 0

  return (
    <div>
      {/* A. Headline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Papers" value={stats.total_papers} />
        <StatCard label="Open-Source Rate" value={`${openSourceRate}%`} />
        <StatCard label="Unique Tags" value={Object.keys(normalizedTags).length} />
        <StatCard label="Venues" value={Object.keys(stats.venues).length} />
      </div>

      {/* B. Publication Timeline */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary">Publication Timeline</h2>
        <p className="mt-1 text-sm text-text-secondary">Papers by year</p>
        <div className="mt-6">
          <YearTimeline years={yearsRecord} />
        </div>
      </section>

      {/* C. Top Research Topics */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary">Top Research Topics</h2>
        <p className="mt-1 text-sm text-text-secondary">Most common tags across papers</p>
        <div className="mt-6">
          <BarChart items={tagItems} maxItems={15} />
        </div>
      </section>

      {/* D. Tag Cloud */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary">Tag Cloud</h2>
        <p className="mt-1 text-sm text-text-secondary">Research topics at a glance</p>
        <div className="mt-6">
          <TagCloud tags={normalizedTags} limit={40} />
        </div>
      </section>

      {/* E. Tag Trend Heatmap */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary">Tag Trends</h2>
        <p className="mt-1 text-sm text-text-secondary">Top tags by year with trend direction</p>
        <div className="mt-6">
          <TagTrendTable papers={papers} />
        </div>
      </section>

      {/* F. Venue Breakdown */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary">Venue Breakdown</h2>
        <p className="mt-1 text-sm text-text-secondary">Papers by conference or journal</p>
        <div className="mt-6">
          <BarChart items={venueItems} />
        </div>
      </section>
    </div>
  )
}
