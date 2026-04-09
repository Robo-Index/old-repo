import Link from 'next/link'
import type { Paper } from '@/src/lib/types'

export default function PaperCard({ paper }: { paper: Paper }) {
  const repoShort = paper.repo?.replace('https://github.com/', '') || ''
  const maxTags = 3

  return (
    <Link href={`/papers/${paper.slug}`} className="block group">
      <article className="bg-surface-1 rounded-2xl border border-border-light p-4 sm:p-5 transition-all duration-200 hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 overflow-hidden">
        {/* Title + year */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-[15px] font-semibold text-text-primary group-hover:text-accent-600 transition-colors leading-snug line-clamp-2">
            {paper.title}
          </h3>
          <span className="shrink-0 text-[10px] sm:text-xs font-mono text-text-muted bg-surface-2 px-1.5 py-0.5 rounded">
            {paper.year}
          </span>
        </div>

        {/* Abstract */}
        {paper.abstract && (
          <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed line-clamp-2 mb-3">
            {paper.abstract}
          </p>
        )}

        {/* Repo */}
        {repoShort && (
          <p className="text-[11px] text-text-muted font-mono truncate mb-2" title={repoShort}>
            {repoShort}
          </p>
        )}

        {/* Tags + links */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {paper.tags.slice(0, maxTags).map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-text-muted">
              {tag}
            </span>
          ))}
          {paper.tags.length > maxTags && (
            <span className="text-[10px] text-text-muted">+{paper.tags.length - maxTags}</span>
          )}
          {paper.arxiv && (
            <span className="text-[10px] text-text-muted font-medium px-1.5 py-0.5 rounded border border-border-light">arXiv</span>
          )}
          {paper.repo && (
            <span className="text-[10px] text-text-muted font-medium px-1.5 py-0.5 rounded border border-border-light">Code</span>
          )}
        </div>
      </article>
    </Link>
  )
}
