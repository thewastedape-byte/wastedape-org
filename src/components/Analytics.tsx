'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const API_URL = 'https://gemini-marine-api.onrender.com'

export default function Analytics() {
  const pathname = usePathname()
  useEffect(() => {
    fetch(`${API_URL}/api/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: `wastedape-org${pathname}` }),
    }).catch(() => {})
  }, [pathname])
  return null
}
