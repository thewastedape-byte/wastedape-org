import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'WastedApe Tech — AI Tools & Automation for Trade Businesses | Veteran Owned',
  description: 'Custom AI tools for marine shops, diesel mechanics, fleet managers, and trade businesses. Boat Buddy AI, Diesel Dude AI, lead generation, AI calling bots. Veteran-owned.',
  keywords: 'AI tools for trades, marine AI software, diesel mechanic software, fleet management AI, AI calling bot, lead generation AI, veteran owned tech company',
  themeColor: '#060608',
  openGraph: {
    title: 'WastedApe Tech — AI Tools & Automation for Trade Businesses | Veteran Owned',
    description: 'Custom AI tools for marine shops, diesel mechanics, fleet managers, and trade businesses. Boat Buddy AI, Diesel Dude AI, lead generation, AI calling bots. Veteran-owned.',
    url: 'https://wastedape.org',
    siteName: 'WastedApe Tech',
    images: [
      {
        url: 'https://wastedape.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WastedApe Tech — AI Tools for Trade Businesses',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WastedApe Tech — AI Tools & Automation for Trade Businesses | Veteran Owned',
    description: 'Custom AI tools for marine shops, diesel mechanics, fleet managers, and trade businesses. Veteran-owned.',
    images: ['https://wastedape.org/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WastedApe Tech',
  url: 'https://wastedape.org',
  description: 'Veteran-owned AI technology company building custom AI tools for trade businesses — marine shops, diesel mechanics, fleet managers, and more.',
  logo: 'https://wastedape.org/logo.svg',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Products & Services',
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        name: 'Boat Buddy AI',
        applicationCategory: 'BusinessApplication',
        url: 'https://boatbuddy.thewastedape.com',
        description: 'AI-powered marine diagnostics assistant',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Diesel Dude AI',
        applicationCategory: 'BusinessApplication',
        url: 'https://diesel-dude-app.onrender.com',
        description: 'AI diesel engine diagnostics for mechanics and fleet shops',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE_HERE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: '#0a0a0a', margin: 0 }}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
