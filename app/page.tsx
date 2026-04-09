import Link from 'next/link'
import { getAllPapers } from '@/src/lib/papers'

export default function Home() {
  const papers = getAllPapers()
  const withRepo = papers.filter(p => p.repo).length

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-text-primary">
            RoboIndex
          </h1>
          <p className="text-xl text-text-secondary font-light">
            Structured robotics research paper data
          </p>
          <div className="flex justify-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-600 border border-accent-200">
              RA-L
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-text-muted border border-border-light">
              more venues coming soon
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-8 text-sm text-text-muted">
          <span>{papers.length} papers</span>
          <span className="text-border">|</span>
          <span>{withRepo} open-source repos</span>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <Link
            href="/papers"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(217,119,87,0.3)]"
          >
            Browse papers
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
