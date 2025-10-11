'use client'

import { useEffect } from 'react'
import { loadCriticalResources } from '@/lib/performance'

interface PerformanceProviderProps {
  children: React.ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Load critical resources
    loadCriticalResources()

    // Register service worker in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
    }

    // Cleanup function
    return () => {
      // Any cleanup needed
    }
  }, [])

  return <>{children}</>
}