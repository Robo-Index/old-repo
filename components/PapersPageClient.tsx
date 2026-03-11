'use client'

import { useState, useMemo } from 'react'
import type { Paper } from '@/src/lib/types'
import PaperCard from './PaperCard'
import TagPill from './TagPill'

export default function PapersPageClient({
  papers,
  allTags,
  allVenues,
  allYears,
}: {
  papers: Paper[]
  allTags: string[]
  allVenues: string[]
  allYears: number[]
}) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [selectedVenue, setSelectedVenue] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | ''>('')

  const filtered = useMemo(() => {
    return papers.filter(p => {
      if (query) {
        const q = query.toLowerCase()
        const inTitle = p.title.toLowerCase().includes(q)
        const inAbstract = p.abstract?.toLowerCase().includes(q)
        if (!inTitle && !inAbstract) return false
      }
      if (selectedTags.size > 0) {
        if (!Array.from(selectedTags).every(t => p.tags.includes(t))) return false
      }
      if (selectedVenue && p.venue !== selectedVenue) return false
      if (selectedYear && p.year !== selectedYear) return false
      return true
    })
  }, [papers, query, selectedTags, selectedVenue, selectedYear])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const hasFilters = query || selectedTags.size > 0 || selectedVenue || selectedYear

  return (
    <div>
      <div className="bg-surface-1 rounded-2xl border border-border-light p-6">
        <input
          type="text"
          placeholder="Search papers by title or abstract..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-3 text-sm bg-surface-0 border border-border rounded-xl focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200 placeholder:text-text-muted"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <select
            value={selectedVenue}
            onChange={e => setSelectedVenue(e.target.value)}
            className="text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="">All venues</option>
            {allVenues.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
            className="text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="">All years</option>
            {allYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery('')
                setSelectedTags(new Set())
                setSelectedVenue('')
                setSelectedYear('')
              }}
              className="text-sm px-3 py-2 text-accent-600 hover:text-accent-700 transition-colors duration-200"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              active={selectedTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 text-sm text-text-muted">
        {filtered.length} {filtered.length === 1 ? 'paper' : 'papers'}
        {hasFilters && ' found'}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-text-muted">No papers match your filters.</p>
          <button
            onClick={() => {
              setQuery('')
              setSelectedTags(new Set())
              setSelectedVenue('')
              setSelectedYear('')
            }}
            className="mt-3 text-sm text-accent-600 hover:text-accent-700 transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-4">
          {filtered.map(paper => (
            <PaperCard key={paper.slug} paper={paper} />
          ))}
        </div>
      )}
    </div>
  )
}
