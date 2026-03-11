'use client'

export default function TagPill({
  tag,
  active,
  onClick,
}: {
  tag: string
  active?: boolean
  onClick?: () => void
}) {
  const base = 'text-xs px-2.5 py-1 rounded-full transition-all duration-200 font-medium'
  const color = active
    ? 'bg-accent-500 text-white'
    : 'bg-surface-2 text-text-secondary hover:bg-accent-50 hover:text-accent-700'

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${color} cursor-pointer`}>
        {tag}
      </button>
    )
  }

  return <span className={`${base} bg-surface-2 text-text-secondary`}>{tag}</span>
}
