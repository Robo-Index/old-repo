import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-base sm:text-lg tracking-tight text-text-primary">
          RoboIndex
        </Link>
        <nav className="flex items-center gap-3 sm:gap-8 overflow-x-auto no-scrollbar">
          <Link href="/papers" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            Papers
          </Link>
          <Link href="/guides" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            Guides
          </Link>
          <Link href="/ral-skill" className="text-xs sm:text-sm text-violet-500 hover:text-violet-600 transition-colors font-medium whitespace-nowrap">
            ral.skill
          </Link>
          <Link href="/dashboard" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            Dashboard
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
