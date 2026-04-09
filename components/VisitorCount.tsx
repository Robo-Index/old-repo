'use client'

import { useState, useEffect } from 'react'

const GOATCOUNTER_ID = 'roboindex'

export default function VisitorCount() {
  const [count, setCount] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://${GOATCOUNTER_ID}.goatcounter.com/counter/TOTAL.json`)
      .then(r => {
        if (!r.ok) throw new Error('non-ok')
        return r.json()
      })
      .then((data: { count?: string }) => {
        if (data.count && parseInt(data.count.replace(/,/g, '')) > 0) {
          setCount(data.count)
        }
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
