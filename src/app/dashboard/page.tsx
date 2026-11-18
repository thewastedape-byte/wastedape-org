'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, authenticated, loading, logout, email } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/login')
    }
  }, [authenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
            <p className="text-slate-400 text-lg">{email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Service Pricing Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Web Development */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
              <div className="bg-blue-600 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Web Development</h3>
                <p className="text-blue-100 text-sm">Custom web applications & sites</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">Custom</span>
                  <p className="text-slate-600">Based on project scope</p>
                </div>
                <ul className="space-y-3 mb-6 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>React, Next.js, TypeScript</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Database design & optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>SEO & performance tuning</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Mobile Development */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
              <div className="bg-purple-600 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Mobile Development</h3>
                <p className="text-purple-100 text-sm">iOS & Android native apps</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">Custom</span>
                  <p className="text-slate-600">Based on platform needs</p>
                </div>
                <ul className="space-y-3 mb-6 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Native & cross-platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>App store optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Push notifications & analytics</span>
                  </li>
                </ul>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition">
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Design Services */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
              <div className="bg-pink-600 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Design Services</h3>
                <p className="text-pink-100 text-sm">UI/UX & branding</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">Custom</span>
                  <p className="text-slate-600">Tailored to your brand</p>
                </div>
                <ul className="space-y-3 mb-6 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Brand identity & guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Figma prototypes & user flows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Responsive design systems</span>
                  </li>
                </ul>
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads & Consultation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guides Download */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Free Resources</h3>
            <p className="text-slate-600 mb-6">Download our guides & case studies</p>
            <div className="space-y-3">
              <a
                href="#"
                className="block bg-slate-100 hover:bg-slate-200 p-4 rounded-lg transition font-medium text-slate-900"
              >
                📄 Web Development Guide
              </a>
              <a
                href="#"
                className="block bg-slate-100 hover:bg-slate-200 p-4 rounded-lg transition font-medium text-slate-900"
              >
                📄 Mobile Strategy Handbook
              </a>
              <a
                href="#"
                className="block bg-slate-100 hover:bg-slate-200 p-4 rounded-lg transition font-medium text-slate-900"
              >
                📄 Design Best Practices
              </a>
            </div>
          </div>

          {/* Book Consultation */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Book a Consultation</h3>
            <p className="text-blue-100 mb-6">Schedule a free 30-minute call with our team</p>
            <button className="w-full bg-white hover:bg-slate-100 text-blue-600 font-semibold py-3 rounded-lg transition">
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
