import Link from 'next/link'
import { getAllPapers } from '@/src/lib/papers'

const venues = [
  { name: 'RA-L', live: true, color: 'bg-accent-500', text: 'text-white', border: '' },
  { name: 'ICRA', live: false, color: '', text: 'text-blue-500', border: 'border-blue-500' },
  { name: 'IROS', live: false, color: '', text: 'text-emerald-500', border: 'border-emerald-500' },
  { name: 'CoRL', live: false, color: '', text: 'text-violet-500', border: 'border-violet-500' },
  { name: 'RSS', live: false, color: '', text: 'text-rose-500', border: 'border-rose-500' },
  { name: 'TRO', live: false, color: '', text: 'text-amber-500', border: 'border-amber-500' },
]

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
          <div className="flex justify-center flex-wrap gap-2 pt-1">
            {venues.map(v => (
              <span
                key={v.name}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  v.live
                    ? `${v.color} ${v.text} border-transparent`
                    : `${v.text} ${v.border} border-dashed bg-transparent`
                }`}
              >
                {v.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center gap-8 text-sm text-text-muted">
            <span>{papers.length} papers</span>
            <span className="text-border">|</span>
            <span>{withRepo} open-source repos</span>
          </div>
          <p className="text-xs text-text-muted tracking-wide">1 skill for all</p>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <Link
            href="/papers"
            className="venue-gradient-btn inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white rounded-full transition-all duration-200 hover:shadow-lg hover:brightness-110"
          >
            Browse papers
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
