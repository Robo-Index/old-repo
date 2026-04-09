export const metadata = {
  title: 'Contribute — RoboIndex',
  description: 'Help grow RoboIndex — share submission experiences, improve ral.skill, report issues',
}

const ways = [
  {
    title: 'Share Submission Experience',
    desc: 'Contribute your RA-L / ICRA / IROS submission experience to help future researchers.',
    steps: [
      'Write your experience (anonymize personal info)',
      'Submit via GitHub Issue or PR to the guides/ directory',
      'We\'ll review and add it to the Guides page',
    ],
    link: 'https://github.com/fly-pigTH/RoboIndex.github.io/issues/new?title=Submission+Experience&labels=guide',
    linkLabel: 'Share experience →',
  },
  {
    title: 'Improve ral.skill',
    desc: 'Help improve the AI submission assistant — better prompts, more knowledge, new features.',
    steps: [
      'Check the knowledge/ directory for areas to improve',
      'Add new tips, fix outdated info, or improve prompt templates',
      'Submit a PR to the ral-skill repo',
    ],
    link: 'https://github.com/fly-pigTH/ral-skill',
    linkLabel: 'ral-skill repo →',
  },
  {
    title: 'Report Issues & Feedback',
    desc: 'Found a bug? Have a suggestion? We\'d love to hear from you.',
    steps: [
      'Website issues → RoboIndex repo',
      'Skill issues → ral-skill repo',
      'Feature requests welcome!',
    ],
    link: 'https://github.com/fly-pigTH/RoboIndex.github.io/issues',
    linkLabel: 'Open an issue →',
  },
]

const team = [
  {
    name: 'Ce Hao (郝策)',
    github: 'CeHao1',
    role: 'Community & Knowledge',
    desc: 'RA-L submission guide author, community organizer',
  },
  {
    name: 'Yinglei Zhu',
    github: 'fly-pigTH',
    role: 'Technical Development',
    desc: 'RoboIndex platform, ral.skill development, data pipeline',
  },
]

export default function ContributePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Contribute</h1>
        <p className="mt-2 text-text-secondary">
          RoboIndex is open-source and community-driven. Here's how you can help.
        </p>
      </div>

      {/* Ways to contribute */}
      <div className="space-y-6 mb-16">
        {ways.map((w, i) => (
          <div key={i} className="bg-surface-1 border border-border-light rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">{w.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{w.desc}</p>
            <ol className="space-y-2 mb-5">
              {w.steps.map((step, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-text-primary">
                  <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {j + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={w.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
            >
              {w.linkLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.map(t => (
            <div key={t.github} className="bg-surface-1 border border-border-light rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://github.com/${t.github}.png?size=80`}
                  alt={t.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                  <a
                    href={`https://github.com/${t.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-500 hover:underline"
                  >
                    @{t.github}
                  </a>
                </div>
              </div>
              <div className="text-xs font-medium text-accent-600 mb-1">{t.role}</div>
              <div className="text-xs text-text-muted">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="text-center pt-8 border-t border-border-light">
        <p className="text-sm text-text-muted">
          <a href="https://github.com/fly-pigTH/RoboIndex.github.io" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">RoboIndex</a>
          {' · '}
          <a href="https://github.com/fly-pigTH/ral-skill" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">ral.skill</a>
          {' · MIT License'}
        </p>
      </div>
    </main>
  )
}
