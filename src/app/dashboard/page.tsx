'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/register')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome, {user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12 p-8 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Welcome to Wasted Ape</h2>
          <p className="text-gray-300">
            You're now authenticated and can access our exclusive services and content.
          </p>
        </div>

        {/* Service Pricing Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Web Development',
                price: '$2,500 - $5,000',
                description: 'Custom websites and web applications built with modern technologies.',
                features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Secure & Scalable'],
              },
              {
                title: 'Mobile Apps',
                price: '$5,000 - $15,000',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                features: ['User-Friendly', 'Push Notifications', 'Offline Mode', 'App Store Ready'],
              },
              {
                title: 'Consulting',
                price: 'Custom',
                description: 'Expert advice and strategy for your digital transformation journey.',
                features: ['Technical Audit', 'Architecture Design', 'Team Mentoring', 'Growth Strategy'],
              },
            ].map((service, index) => (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-blue-400 text-2xl font-bold mb-3">{service.price}</p>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-center">
                      <span className="text-blue-400 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Book Consultation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Schedule a consultation with our team to discuss your project and get a custom quote.
            </p>
            <a
              href="/maximus/book"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Downloads Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Download Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Web Development Guide',
                description: 'Everything you need to know about modern web development.',
                icon: '📄',
              },
              {
                title: 'Mobile Strategy Guide',
                description: 'How to plan and execute a successful mobile app project.',
                icon: '📱',
              },
            ].map((guide, index) => (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition">
                <div className="text-3xl mb-3">{guide.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-400 mb-4">{guide.description}</p>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition text-sm">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
    >
      Logout
    </button>
  )
}
