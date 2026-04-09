'use client'

import { useState, useEffect } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function VisitorCount() {
  const [count, setCount] = useState<string | null>(null)

  useEffect(() => {
    // Fetch from same-origin cached file (updated hourly by GitHub Actions)
    // Falls back to direct GoatCounter API if the file doesn't exist yet
    const urls = [
      `${BASE}/visitor-count.json`,
      'https://roboindex.goatcounter.com/counter/TOTAL.json',
    ]

    const tryNext = (index: number) => {
      if (index >= urls.length) return
      fetch(urls[index])
        .then(r => {
          if (!r.ok) throw new Error('non-ok')
          return r.json()
        })
        .then((data: { count?: string }) => {
          if (data.count && parseInt(data.count.replace(/,/g, '')) > 0) {
            setCount(data.count)
          }
        })
        .catch(() => tryNext(index + 1))
    }

    tryNext(0)
  }, [])

  if (!count) return null

  return (
    <span className="flex items-center gap-1.5">
      <span className="text-border">|</span>
      <span>🌍 {count} visitors</span>
    </span>
  )
}
