'use client'

import { useState, useEffect } from 'react'

// Set NEXT_PUBLIC_GOATCOUNTER_ID in your .env.local to enable live visitor stats.
// 1. Create a free account at https://www.goatcounter.com/
// 2. Add to .env.local:  NEXT_PUBLIC_GOATCOUNTER_ID=your-site-id
const GOATCOUNTER_ID = process.env.NEXT_PUBLIC_GOATCOUNTER_ID

export default function VisitorCount() {
  const [count, setCount] = useState<string | null>(null)

  useEffect(() => {
    if (!GOATCOUNTER_ID) return

    fetch(`https://${GOATCOUNTER_ID}.goatcounter.com/counter/TOTAL.json`)
      .then(r => {
        if (!r.ok) throw new Error('non-ok')
        return r.json()
      })
      .then((data: { count?: string }) => {
        if (data.count) setCount(data.count)
      })
      .catch(() => {})
  }, [])

  if (!count) return null

  return (
    <span className="flex items-center gap-1.5">
      <span className="text-border">|</span>
      <span>🌍 {count} visitors</span>
    </span>
  )
}
