'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function VerifyPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Verifying email...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if user is now authenticated after clicking magic link
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          setError('Authentication failed. Please try again.')
          return
        }

        setStatus('Email verified! Redirecting...')
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } catch (err: any) {
        setError(err.message || 'Verification error')
      }
    }

    verifyEmail()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          {error ? '❌ Verification Failed' : '✓ Verifying Email'}
        </h1>
        <p className="text-gray-300 text-lg">
          {error || status}
        </p>
        {error && (
          <button
            onClick={() => router.push('/register')}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
