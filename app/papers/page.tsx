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
          {papers.length} robotics research papers with open-source code
        </p>
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
