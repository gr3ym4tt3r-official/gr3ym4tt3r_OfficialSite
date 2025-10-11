import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ThemeProvider } from '@/design-system/utilities/ThemeProvider'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'
import { PerformanceProvider } from '@/components/PerformanceProvider'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <AnalyticsProvider>
          <div className="min-h-screen flex flex-col bg-grey-950 text-grey-100">
            {/* Skip link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-signal-red-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-signal-red-400"
            >
              Skip to main content
            </a>
            
            <Header />
            
            <main id="main-content" className={`flex-1 ${className}`}>
              {children}
            </main>
            
            <Footer />
          </div>
        </AnalyticsProvider>
      </PerformanceProvider>
    </ThemeProvider>
  )
}

// Convenience component for pages that need full-width content
export function FullWidthPageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <PageLayout className={`${className}`}>
      {children}
    </PageLayout>
  )
}

// Convenience component for pages that need contained content
export function ContainedPageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <PageLayout className={`container mx-auto px-4 py-8 ${className}`}>
      {children}
    </PageLayout>
  )
}