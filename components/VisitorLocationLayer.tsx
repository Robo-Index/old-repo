'use client'

import { useState, useEffect } from 'react'

interface IpApiResponse {
  latitude?: number
  longitude?: number
  city?: string
  country_name?: string
  error?: boolean
}

function toSvg(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  }
}

export default function VisitorLocationLayer() {
  const [dot, setDot] = useState<{ x: number; y: number; label: string } | null>(null)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then((data: IpApiResponse) => {
        if (!data.error && data.latitude != null && data.longitude != null) {
          const { x, y } = toSvg(data.latitude, data.longitude)
          setDot({
            x,
            y,
            label: [data.city, data.country_name].filter(Boolean).join(', '),
          })
        }
      })
      .catch(() => {})
  }, [])

  if (!dot) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g>
        <title>You: {dot.label}</title>
        {/* Bright core */}
        <circle cx={dot.x} cy={dot.y} r="3.5" fill="#60a5fa" opacity="0.95" />
        {/* Fast inner ring */}
        <circle
          cx={dot.x} cy={dot.y} r="3.5"
          fill="none" stroke="#60a5fa" strokeWidth="1.5"
          className="visitor-pulse"
        />
        {/* Slower outer ring */}
        <circle
          cx={dot.x} cy={dot.y} r="3.5"
          fill="none" stroke="#93c5fd" strokeWidth="1"
          className="visitor-pulse"
          style={{ animationDelay: '0.6s' }}
        />
      </g>
    </svg>
  )
}
