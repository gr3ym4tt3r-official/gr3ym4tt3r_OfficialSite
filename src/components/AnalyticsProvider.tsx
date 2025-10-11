'use client'

import { useEffect, Suspense } from 'react'
import { initializeAnalytics, trackPageView } from '@/lib/analytics'
import { usePathname, useSearchParams } from 'next/navigation'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Small delay to ensure page is loaded
    const timer = setTimeout(() => {
      trackPageView(url)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  )
}
