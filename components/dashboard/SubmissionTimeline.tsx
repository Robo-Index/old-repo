'use client'

interface Stage {
  name: string
  name_en?: string
  duration_min: number
  duration_max: number
  source: 'official' | 'guide' | 'community'
  note?: string
}

const sourceLabel: Record<string, string> = {
  official: 'Official',
  guide: 'Guide',
  community: 'Community',
}

export default function SubmissionTimeline({ stages }: { stages: Stage[] }) {
  const totalMax = stages.reduce((s, st) => s + st.duration_max, 0)
  const totalMin = stages.reduce((s, st) => s + st.duration_min, 0)

  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary mb-1">RA-L Submission Timeline</h2>
      <p className="text-sm text-text-muted mb-6">
        Total ~{Math.round(totalMin / 30)}–{Math.round(totalMax / 30)} months · Official guarantee ≤ 6 months
      </p>

      <div className="space-y-2">
        {stages.map((stage, i) => {
          const days = stage.duration_min === stage.duration_max
            ? `${stage.duration_min}d`
            : `${stage.duration_min}–${stage.duration_max}d`

          return (
            <div key={i} className="flex items-center gap-2 sm:gap-4 py-2 border-b border-border-light/40 last:border-0">
              <div className="w-24 sm:w-32 shrink-0 text-right">
                <span className="text-xs sm:text-sm text-text-secondary">{stage.name}</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div
                  className="h-6 rounded bg-accent-400 flex items-center px-2"
                  style={{ width: `${Math.max((stage.duration_max / totalMax) * 100, 15)}%` }}
                >
                  <span className="text-[10px] sm:text-[11px] font-medium text-white whitespace-nowrap">{days}</span>
                </div>
                <span className="text-[10px] text-text-muted hidden sm:inline">{sourceLabel[stage.source]}</span>
                {stage.note && (
                  <span className="text-[10px] font-semibold text-accent-600 bg-accent-500/10 px-1.5 py-0.5 rounded whitespace-nowrap">
                    {stage.note}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border-light text-xs text-text-muted">
        Data from <a href="https://github.com/fly-pigTH/ral-skill" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">ral.skill</a>
      </div>
    </div>
  )
}
