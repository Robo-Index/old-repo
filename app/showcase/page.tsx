import { getAllPapers, getAllTags } from '@/src/lib/papers'
import { getRepoMetaMap } from '@/src/lib/repos'
import ShowcaseClient from '@/components/ShowcaseClient'
import type { Metadata } from 'next'
import type { RepoMeta } from '@/src/lib/types'

export const metadata: Metadata = {
  title: 'Open-source RA-L Papers | RoboIndex',
  description: 'Discover robotics papers from IEEE RA-L with open-source GitHub repositories.',
}

function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/\/$/, '')
}

export default function ShowcasePage() {
  const allPapers = getAllPapers()
  const papers = allPapers.filter(p => p.repo)
  const allTags = getAllTags()
  const allYears = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)

  // Join repo metadata by normalized URL → keyed by paper slug
  const metaMap = getRepoMetaMap()
  const repoMeta: Record<string, RepoMeta> = {}
  let totalStars = 0

  for (const paper of papers) {
    if (!paper.repo) continue
    const meta = metaMap[normalizeUrl(paper.repo)]
    if (meta) {
      repoMeta[paper.slug] = meta
      totalStars += meta.stars
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold tracking-wide uppercase mb-4">
          Open Source
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text-primary">
          RA-L Paper Showcase
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-2xl mx-auto">
          Robotics papers from IEEE RA-L with open-source code.
          Discover reproducible research.
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{papers.length}</span>
            <span className="text-text-muted">open-source papers</span>
          </div>
          <div className="w-px bg-border-light" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{allPapers.length}</span>
            <span className="text-text-muted">total indexed</span>
          </div>
          <div className="w-px bg-border-light" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{allYears.length}</span>
            <span className="text-text-muted">years covered</span>
          </div>
          {totalStars > 0 && (
            <>
              <div className="w-px bg-border-light" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-text-primary">
                  {totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1).replace(/\.0$/, '')}k` : totalStars}
                </span>
                <span className="text-text-muted">total stars</span>
              </div>
            </>
          )}
        </div>
      </div>

      <ShowcaseClient papers={papers} allTags={allTags} allYears={allYears} repoMeta={repoMeta} />
    </main>
  )
}
