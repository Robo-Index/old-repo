import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-text-primary">404</h1>
        <p className="text-text-secondary">This page could not be found.</p>
        <Link
          href="/"
          className="inline-block mt-4 text-sm text-accent-600 hover:text-accent-700 transition-colors duration-200"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
