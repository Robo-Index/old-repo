export const metadata = {
  title: 'ral.skill — AI Submission Assistant | RoboIndex',
  description: 'Claude Code Skill for IEEE RA-L submission guidance with traceable, live-verified advice',
}

const demos = [
  {
    question: '我想投 RAL，该怎么开始？',
    answer: 'RAL 投稿分 5 个阶段：初稿提交 → 等待审稿(~3个月) → Rebuttal(30天) → Final Version(14天内) → 发表/Transfer。你目前在哪个阶段？',
    sources: ['📘 投稿攻略', '📋 IEEE 官网'],
  },
  {
    question: '审稿 3 个月了没消息，要催吗？',
    answer: '3 个月是正常周期。可以礼貌邮件询问编辑，催审不会导致被拒——AE 可能只是太忙忘了。',
    sources: ['💬 社区经验', '📋 IEEE 官网'],
  },
  {
    question: '论文里能放 GitHub 链接吗？',
    answer: '最好不要。有的 AE 不介意，有的会直接 desk reject。可以在正文中写一句话声明代码将开源。',
    sources: ['📘 投稿攻略', '💬 社区经验'],
  },
  {
    question: '今日投稿运势',
    answer: '🔮 大吉！宜：提交初稿、精修图表。忌：重写 Introduction、半夜看审稿意见。幸运审稿人：Reviewer #1',
    sources: ['💬 社区经验'],
  },
]

const features = [
  {
    icon: '🗺️',
    title: '全流程指导',
    desc: '从选题到发表，根据你的阶段给出针对性建议',
  },
  {
    icon: '✍️',
    title: '写作辅助',
    desc: '读取 .tex/.pdf，逐章节分析，给出改写建议',
  },
  {
    icon: '🛡️',
    title: '审稿应对',
    desc: '分类审稿意见，生成 rebuttal 策略',
  },
  {
    icon: '📐',
    title: '格式检查',
    desc: '从 IEEE 官网实时获取最新规范，对照检查',
  },
  {
    icon: '⏱️',
    title: '周期预测',
    desc: '基于社区数据预估审稿时间，提醒关键节点',
  },
  {
    icon: '🔍',
    title: '开源聚合',
    desc: '搜索推荐相关开源项目和论文配套代码',
  },
  {
    icon: '🎲',
    title: '趣味彩蛋',
    desc: '投稿运势、审稿人图鉴、学术冷知识',
  },
]

export default function RalSkillPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium mb-4">
          Claude Code Skill
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text-primary">
          ral.skill
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          IEEE RA-L 投稿 AI 助手
        </p>
        <p className="mt-4 text-text-muted max-w-lg mx-auto text-sm leading-relaxed">
          把投稿经验蒸馏成 AI Skill。每条建议标注出处，官方规则实时验证，让你知道哪些可以放心采纳。
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="https://github.com/fly-pigTH/ral-skill"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-text-primary text-surface-0 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            GitHub →
          </a>
          <a
            href="/guides"
            className="px-5 py-2.5 rounded-xl bg-surface-2 text-text-primary text-sm font-medium hover:bg-surface-2/80 transition-colors"
          >
            查看投稿攻略
          </a>
        </div>
      </div>

      {/* Source Attribution */}
      <div className="mb-16">
        <h2 className="text-center text-sm font-medium text-text-muted uppercase tracking-wide mb-6">
          Three Sources, Fully Traceable
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm font-semibold text-blue-700">IEEE 官网</div>
            <div className="text-xs text-blue-500 mt-1">权威 · 实时验证</div>
          </div>
          <div className="text-center p-5 rounded-2xl bg-violet-50 border border-violet-100">
            <div className="text-2xl mb-2">📘</div>
            <div className="text-sm font-semibold text-violet-700">投稿攻略</div>
            <div className="text-xs text-violet-500 mt-1">Ce Hao 撰写</div>
          </div>
          <div className="text-center p-5 rounded-2xl bg-amber-50 border border-amber-100">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-sm font-semibold text-amber-700">社区经验</div>
            <div className="text-xs text-amber-500 mt-1">脱敏同行讨论</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-6">7 个功能模块</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="p-4 rounded-xl bg-surface-1 border border-border-light">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="text-sm font-medium text-text-primary">{f.title}</div>
              <div className="text-xs text-text-muted mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-6">实际效果</h2>
        <div className="space-y-4">
          {demos.map((d, i) => (
            <div key={i} className="bg-surface-1 rounded-2xl border border-border-light overflow-hidden">
              <div className="bg-surface-2/50 px-5 py-3 border-b border-border-light">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">U</span>
                  <span className="text-sm text-text-primary">{d.question}</span>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">R</span>
                  <div>
                    <p className="text-sm text-text-primary leading-relaxed">{d.answer}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {d.sources.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-text-muted">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Install */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-4">安装</h2>
        <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono">
          <div className="text-gray-400 mb-1"># 全局安装</div>
          <div className="text-emerald-400">git clone https://github.com/fly-pigTH/ral-skill ~/.claude/skills/ral-skill</div>
          <div className="text-gray-400 mt-4 mb-1"># 使用</div>
          <div className="text-emerald-400">/ral-skill</div>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center text-sm text-text-muted">
        <a href="https://github.com/CeHao1" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">@CeHao1</a>
        {' — 社群支持 · '}
        <a href="https://github.com/fly-pigTH" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">@fly-pigTH</a>
        {' — 技术开发'}
      </div>
    </main>
  )
}
