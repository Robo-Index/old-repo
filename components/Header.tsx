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
          <a
            href="/api/papers.json"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  )
}
