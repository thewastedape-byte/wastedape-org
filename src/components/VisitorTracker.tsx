'use client'

import { useEffect } from 'react'

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const page = window.location.pathname
        const referrer = document.referrer || null

        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, referrer }),
        })
      } catch (err) {
        // Silently fail — don't disrupt user experience
      }
    }

    trackVisit()
  }, [])

  return null
}
