import { getAllGuides } from '@/src/lib/guides'
import type { Guide, GuideSection } from '@/src/lib/guides'
import SourceBadge from '@/components/SourceBadge'

export const metadata = {
  title: 'RAL Submission Guide — RoboIndex',
  description: 'Comprehensive RA-L submission guide with source attribution',
}

function SectionBlock({ section, index }: { section: GuideSection; index: number }) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-bold">
          {index + 1}
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{section.heading}</h3>
      </div>
      <div className="ml-10 space-y-3">
        {section.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
          >
            <div className="mt-0.5 shrink-0">
              {item.source === 'official' && <span className="text-blue-500 text-sm">📋</span>}
              {item.source === 'guide' && <span className="text-violet-500 text-sm">📘</span>}
              {item.source === 'community' && <span className="text-amber-500 text-sm">💬</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary leading-relaxed">{item.text}</p>
              {item.text_en && (
                <p className="text-xs text-text-muted mt-1 leading-relaxed">{item.text_en}</p>
              )}
            </div>
            <div className="shrink-0 mt-0.5">
              <SourceBadge source={item.source} url={item.url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GuideDocument({ guide }: { guide: Guide }) {
  return (
    <section className="bg-surface-1 rounded-2xl border border-border-light overflow-hidden">
      <div className="p-8 pb-0">
        <h2 className="text-xl font-bold text-text-primary">{guide.title}</h2>
        {guide.title_en && (
          <p className="text-sm text-text-muted mt-1">{guide.title_en}</p>
        )}
        <div className="mt-3 mb-6 h-px bg-border-light" />
      </div>
      <div className="px-8 pb-8">
        {guide.sections.map((section, i) => (
          <SectionBlock key={i} section={section} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function GuidesPage() {
  const guides = getAllGuides()

  // Sort: writing first, then format, rebuttal, timeline
  const order = ['writing', 'format', 'rebuttal', 'timeline', 'fun']
  guides.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-accent-500 mb-2">SUBMISSION EXPERIENCE</p>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          RA-L 投稿攻略
        </h1>
        <p className="mt-3 text-text-secondary max-w-xl mx-auto">
          基于 Ce Hao 的投稿攻略、社区讨论和 IEEE 官方信息蒸馏而成。
          每条建议都标注了出处，让你知道哪些可以放心采纳。
        </p>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-text-muted">
          <span className="flex items-center gap-1">📋 <span>IEEE 官方</span></span>
          <span className="flex items-center gap-1">📘 <span>投稿攻略</span></span>
          <span className="flex items-center gap-1">💬 <span>社区经验</span></span>
        </div>
        <div className="mt-3 text-xs text-text-muted">
          作者：<a href="https://github.com/CeHao1" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">Ce Hao</a>
          {' · '}
          AI 增强：<a href="https://github.com/fly-pigTH/ral-skill" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">ral.skill</a>
        </div>
      </div>

      {/* Quick nav */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {guides.map(g => {
          const icons: Record<string, string> = { writing: '✍️', format: '📐', rebuttal: '🛡️', timeline: '⏱️', fun: '🎲' }
          return (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-2 text-text-secondary hover:bg-accent-50 hover:text-accent-600 transition-colors"
            >
              {icons[g.category] || '📄'} {g.title}
            </a>
          )
        })}
      </div>

      {/* Guide documents */}
      <div className="space-y-8">
        {guides.map(guide => (
          <div key={guide.slug} id={guide.slug}>
            <GuideDocument guide={guide} />
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 text-sm text-text-secondary">
          <span>想要 AI 实时辅助？</span>
          <a
            href="https://github.com/fly-pigTH/ral-skill"
            className="font-medium text-accent-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            安装 ral.skill →
          </a>
        </div>
      </div>
    </main>
  )
}
