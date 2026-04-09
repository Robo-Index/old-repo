import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight text-text-primary">
          RoboIndex
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/papers"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Papers
          </Link>
          <Link
            href="/guides"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Guides
          </Link>
          <Link
            href="/ral-skill"
            className="text-sm text-violet-500 hover:text-violet-600 transition-colors duration-200 font-medium"
          >
            ral.skill
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
