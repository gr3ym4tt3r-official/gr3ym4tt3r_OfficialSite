import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

// Google Fonts - Free fonts as specified in PRD
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GR3YM4TT3R | Modern Masculine Stoic Brand',
    template: '%s | GR3YM4TT3R'
  },
  description: 'Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion. Communicating strength, courage, and discipline through premium design.',
  keywords: ['strength', 'courage', 'discipline', 'stoic', 'masculine', 'tactical', 'training', 'engineering'],
  authors: [{ name: 'GR3YM4TT3R' }],
  creator: 'GR3YM4TT3R',
  publisher: 'GR3YM4TT3R',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gr3ym4tt3r.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gr3ym4tt3r.com',
    siteName: 'GR3YM4TT3R',
    title: 'GR3YM4TT3R | Modern Masculine Stoic Brand',
    description: 'Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GR3YM4TT3R | Modern Masculine Stoic Brand',
    description: 'Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion.',
    creator: '@gr3ym4tt3r',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen">
          {/* Micro-grain texture overlay as specified in PRD */}
          <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCBpbj0ibm9pc2UiIHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] z-0" />
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
