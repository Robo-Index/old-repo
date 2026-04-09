import Link from 'next/link'
import type { Paper } from '@/src/lib/types'
import type { RepoMeta } from '@/src/lib/types'
import TagPill from './TagPill'

function repoName(url: string) {
  return url.replace('https://github.com/', '')
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}y ago`
}

// Common GitHub language colors
const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Jupyter_Notebook: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  MATLAB: '#e16737',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  Lua: '#000080',
  Julia: '#a270ba',
  Shell: '#89e051',
  CMake: '#DA3434',
  Cuda: '#3A4E3A',
  CUDA: '#3A4E3A',
}

export default function ShowcaseCard({ paper, meta }: { paper: Paper; meta?: RepoMeta }) {
  return (
    <article className="bg-surface-1 rounded-2xl border border-border-light p-5 flex flex-col transition-all duration-300 hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <Link href={`/papers/${paper.slug}`} className="group flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-text-primary group-hover:text-accent-600 transition-colors duration-200 leading-snug line-clamp-2">
            {paper.title}
          </h3>
        </Link>
        <span className="shrink-0 text-xs font-medium text-text-muted bg-surface-2 px-2 py-0.5 rounded-full">
          {paper.year}
        </span>
      </div>

      {/* Repo */}
      {paper.repo && (
        <a
          href={paper.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center gap-2 text-xs text-text-muted hover:text-accent-600 transition-colors duration-200 group/repo"
        >
          {meta?.owner_avatar ? (
            <img
              src={meta.owner_avatar}
              alt=""
              width={14}
              height={14}
              className="rounded-full shrink-0"
            />
          ) : (
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          )}
          <span className="truncate group-hover/repo:underline">{repoName(paper.repo)}</span>
        </a>
      )}

      {/* Repo metadata */}
      {meta && (
        <div className="mt-2 flex items-center gap-3 text-xs text-text-muted flex-wrap">
          <span className="inline-flex items-center gap-1" title={`${meta.stars} stars`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {formatStars(meta.stars)}
          </span>
          {meta.language && (
            <span className="inline-flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: LANG_COLORS[meta.language] || '#8b8b8b' }}
              />
              {meta.language}
            </span>
          )}
          {meta.license && meta.license !== 'NOASSERTION' && (
            <span className="px-1.5 py-0.5 bg-surface-2 rounded text-[10px] font-medium">
              {meta.license}
            </span>
          )}
          <span className="inline-flex items-center gap-1" title={`Last pushed: ${meta.pushed_at}`}>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.37.65l2.5 1.5a.75.75 0 10.76-1.3L8.5 7.87V4.75z" />
            </svg>
            {relativeTime(meta.pushed_at)}
          </span>
        </div>
      )}

      {/* Abstract */}
      {paper.abstract && (
        <p className="mt-3 text-xs text-text-secondary leading-relaxed line-clamp-3 flex-1">
          {paper.abstract}
        </p>
      )}

      {/* Tags */}
      {paper.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {paper.tags.slice(0, 4).map(tag => (
            <TagPill key={tag} tag={tag} />
          ))}
          {paper.tags.length > 4 && (
            <span className="text-xs text-text-muted px-1.5 py-0.5">+{paper.tags.length - 4}</span>
          )}
        </div>
      )}

      {/* Footer links */}
      <div className="mt-3 pt-3 border-t border-border-light flex items-center gap-3">
        {paper.arxiv && (
          <a
            href={paper.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-muted hover:text-accent-600 transition-colors duration-200"
          >
            arXiv
          </a>
        )}
        {paper.pdf && (
          <a
            href={paper.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-muted hover:text-accent-600 transition-colors duration-200"
          >
            PDF
          </a>
        )}
        {paper.project_page && (
          <a
            href={paper.project_page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-muted hover:text-accent-600 transition-colors duration-200"
          >
            Project
          </a>
        )}
        <Link
          href={`/papers/${paper.slug}`}
          className="ml-auto text-xs text-accent-500 font-medium hover:text-accent-700 transition-colors duration-200"
        >
          Details &rarr;
        </Link>
      </div>
    </article>
  )
}
