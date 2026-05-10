import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'WastedApe — AI Tech Solutions',
  description: 'We build and configure AI assistants for your business. Custom setup, remote installation, ongoing support. Get your AI working in hours, not months.',
  themeColor: '#060608',
  openGraph: {
    title: 'WastedApe — AI Tech Solutions',
    description: 'Custom AI assistants built for your business. Marine diagnostics, diesel fleet tools, eBay automation, and more. Setup in hours.',
    url: 'https://www.wastedape.org',
    siteName: 'WastedApe',
    images: [{
      url: 'https://www.wastedape.org/og-image.png',
      width: 1200,
      height: 630,
      alt: 'WastedApe Tech Solutions',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WastedApe — AI Tech Solutions',
    description: 'Custom AI assistants built for your business.',
    images: ['https://www.wastedape.org/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ background: '#0a0a0a', margin: 0 }}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
