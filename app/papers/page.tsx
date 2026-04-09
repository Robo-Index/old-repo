import { getAllPapers, getAllTags, getAllVenues } from '@/src/lib/papers'
import PapersPageClient from '@/components/PapersPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Papers | RoboIndex',
}

export default function PapersPage() {
  const papers = getAllPapers()
  const allTags = getAllTags()
  const allVenues = getAllVenues()
  const allYears = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Papers
        </h1>
        <p className="mt-2 text-text-secondary">
          {papers.length} open-source RA-L papers with GitHub repos
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-accent-50 text-accent-600 border border-accent-200">RA-L</span>
          <span className="text-xs text-text-muted">2020–2026 · open-source only</span>
        </div>
      </div>
      <PapersPageClient
        papers={papers}
        allTags={allTags}
        allVenues={allVenues}
        allYears={allYears}
      />
    </main>
  )
}
