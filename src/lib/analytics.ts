/**
 * Analytics and Performance Monitoring
 * 
 * Privacy-focused analytics that respects user preferences
 * Built to work with Umami, Plausible, or similar privacy-first analytics
 */

// Analytics configuration
interface AnalyticsConfig {
  enabled: boolean
  provider: 'umami' | 'plausible' | 'none'
  websiteId?: string
  scriptUrl?: string
  respectDNT: boolean // Respect Do Not Track header
  enableWebVitals: boolean
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as any) || 'none',
  websiteId: process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID,
  scriptUrl: process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL,
  respectDNT: true,
  enableWebVitals: true,
}

// Check if analytics is enabled and user hasn't opted out
function canTrack(): boolean {
  if (!defaultConfig.enabled) return false
  
  // Respect Do Not Track header
  if (defaultConfig.respectDNT && typeof navigator !== 'undefined') {
    const dnt = navigator.doNotTrack || (navigator as any).msDoNotTrack || (window as any).doNotTrack
    if (dnt === '1' || dnt === 'yes') return false
  }
  
  // Check for user consent (if implemented)
  if (typeof localStorage !== 'undefined') {
    const consent = localStorage.getItem('analytics-consent')
    if (consent === 'false') return false
  }
  
  return true
}

// Generic event tracking interface
interface TrackingEvent {
  name: string
  properties?: Record<string, any>
}

// Initialize analytics
export function initializeAnalytics(): void {
  if (!canTrack()) return
  
  try {
    switch (defaultConfig.provider) {
      case 'umami':
        initializeUmami()
        break
      case 'plausible':
        initializePlausible()
        break
      default:
        console.log('Analytics: No provider configured')
    }
    
    if (defaultConfig.enableWebVitals) {
      initializeWebVitals()
    }
  } catch (error) {
    console.error('Analytics initialization error:', error)
  }
}

// Umami initialization
function initializeUmami(): void {
  if (!defaultConfig.websiteId || !defaultConfig.scriptUrl) {
    console.warn('Analytics: Umami websiteId or scriptUrl not configured')
    return
  }
  
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = defaultConfig.scriptUrl
  script.setAttribute('data-website-id', defaultConfig.websiteId)
  
  // Add to head
  document.head.appendChild(script)
  
  console.log('Analytics: Umami initialized')
}

// Plausible initialization
function initializePlausible(): void {
  if (!defaultConfig.scriptUrl) {
    console.warn('Analytics: Plausible scriptUrl not configured')
    return
  }
  
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = defaultConfig.scriptUrl
  script.setAttribute('data-domain', window.location.hostname)
  
  document.head.appendChild(script)
  
  console.log('Analytics: Plausible initialized')
}

// Track page view
export function trackPageView(url?: string): void {
  if (!canTrack()) return
  
  const pageUrl = url || window.location.pathname + window.location.search
  
  try {
    switch (defaultConfig.provider) {
      case 'umami':
        // Umami automatically tracks page views
        if ((window as any).umami) {
          (window as any).umami.track('page_view', { url: pageUrl })
        }
        break
      case 'plausible':
        // Plausible automatically tracks page views
        if ((window as any).plausible) {
          (window as any).plausible('pageview', { u: window.location.href })
        }
        break
    }
  } catch (error) {
    console.error('Analytics page view error:', error)
  }
}

// Track custom event
export function trackEvent(event: TrackingEvent): void {
  if (!canTrack()) return
  
  try {
    switch (defaultConfig.provider) {
      case 'umami':
        if ((window as any).umami) {
          (window as any).umami.track(event.name, event.properties)
        }
        break
      case 'plausible':
        if ((window as any).plausible) {
          (window as any).plausible(event.name, { props: event.properties })
        }
        break
    }
    
    console.log('Analytics event tracked:', event)
  } catch (error) {
    console.error('Analytics event tracking error:', error)
  }
}

// Web Vitals monitoring
function initializeWebVitals(): void {
  // Import Web Vitals dynamically to avoid SSR issues
  if (typeof window === 'undefined') return
  
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    function sendToAnalytics(metric: any) {
      const { name, value, delta } = metric
      
      // Track as custom event
      trackEvent({
        name: 'web_vital',
        properties: {
          metric_name: name,
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          delta: Math.round(name === 'CLS' ? delta * 1000 : delta),
        }
      })
      
      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vital - ${name}:`, value)
      }
    }
    
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics) // Replaced FID with INP (Interaction to Next Paint)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }).catch((error) => {
    console.error('Web Vitals initialization error:', error)
  })
}

// Contact form tracking
export function trackContactFormSubmission(success: boolean, errors?: string[]): void {
  trackEvent({
    name: 'contact_form_submission',
    properties: {
      success,
      error_count: errors?.length || 0,
      errors: errors?.join(', ') || null,
    }
  })
}

// Newsletter tracking
export function trackNewsletterSignup(success: boolean, variant?: string): void {
  trackEvent({
    name: 'newsletter_signup',
    properties: {
      success,
      variant: variant || 'default',
    }
  })
}

// Blog post tracking
export function trackBlogPostView(slug: string, title: string): void {
  trackEvent({
    name: 'blog_post_view',
    properties: {
      slug,
      title,
    }
  })
}

// Search tracking
export function trackSearch(query: string, results: number): void {
  trackEvent({
    name: 'search',
    properties: {
      query,
      results,
    }
  })
}

// Download tracking
export function trackDownload(filename: string, type: string): void {
  trackEvent({
    name: 'file_download',
    properties: {
      filename,
      type,
    }
  })
}

// Outbound link tracking
export function trackOutboundClick(url: string, text?: string): void {
  trackEvent({
    name: 'outbound_link_click',
    properties: {
      url,
      text: text || 'Unknown',
    }
  })
}

// User consent management
export function setAnalyticsConsent(consent: boolean): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('analytics-consent', consent.toString())
    
    if (consent && !canTrack()) {
      // Re-initialize analytics if consent was given
      initializeAnalytics()
    }
  }
  
  trackEvent({
    name: 'analytics_consent',
    properties: {
      consent,
    }
  })
}

export function getAnalyticsConsent(): boolean | null {
  if (typeof localStorage === 'undefined') return null
  
  const consent = localStorage.getItem('analytics-consent')
  return consent ? consent === 'true' : null
}

// Performance timing helper
export function measurePerformance(name: string, fn: () => void | Promise<void>): void {
  const start = performance.now()
  
  const finish = () => {
    const duration = performance.now() - start
    trackEvent({
      name: 'performance_measurement',
      properties: {
        operation: name,
        duration: Math.round(duration),
      }
    })
  }
  
  try {
    const result = fn()
    if (result instanceof Promise) {
      result.finally(finish)
    } else {
      finish()
    }
  } catch (error) {
    finish()
    throw error
  }
}