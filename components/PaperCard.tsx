import Link from 'next/link'
import type { Paper } from '@/src/lib/types'
import TagPill from './TagPill'

export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Link href={`/papers/${paper.slug}`} className="block group">
      <article className="bg-surface-1 rounded-2xl border border-border-light p-6 transition-all duration-300 hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-text-primary group-hover:text-accent-600 transition-colors duration-200 leading-snug">
            {paper.title}
          </h3>
          <span className="shrink-0 text-xs font-medium text-text-muted bg-surface-2 px-2.5 py-1 rounded-full">
            {paper.year}
          </span>
        </div>

        <div className="mt-2 text-xs font-medium tracking-wide uppercase text-accent-500">
          {paper.venue}
        </div>

        {paper.abstract && (
          <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-2">
            {paper.abstract}
          </p>
        )}

        {paper.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {paper.tags.map(tag => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}

        {paper.repo && (
          <div className="mt-4 text-xs text-text-muted font-medium">
            {paper.repo.replace('https://github.com/', '')}
          </div>
        )}
      </article>
    </Link>
  )
}
