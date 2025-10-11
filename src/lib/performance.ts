/**
 * Performance Optimization Utilities
 * 
 * Tools for optimizing performance, lazy loading, and Core Web Vitals
 */

// Image optimization utilities
export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  sizes?: string
  fill?: boolean
}

// Lazy loading observer for images
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null
  private images: Set<HTMLImageElement> = new Set()

  constructor(options?: IntersectionObserverInit) {
    if (typeof window === 'undefined') return

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            this.loadImage(img)
            this.observer?.unobserve(img)
            this.images.delete(img)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
        ...options,
      }
    )
  }

  observe(img: HTMLImageElement) {
    if (!this.observer) return
    
    this.images.add(img)
    this.observer.observe(img)
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src
    if (src) {
      img.src = src
      img.removeAttribute('data-src')
      img.classList.remove('lazy-loading')
      img.classList.add('lazy-loaded')
    }
  }

  destroy() {
    if (this.observer) {
      this.images.forEach((img) => {
        this.observer?.unobserve(img)
      })
      this.observer.disconnect()
      this.observer = null
      this.images.clear()
    }
  }
}

// Create singleton instance
let lazyLoader: LazyImageLoader | null = null

export function getLazyImageLoader(): LazyImageLoader | null {
  if (typeof window === 'undefined') return null
  
  if (!lazyLoader) {
    lazyLoader = new LazyImageLoader()
  }
  
  return lazyLoader
}

// Resource prefetching utilities
export function prefetchResource(href: string, as: string = 'fetch'): void {
  if (typeof document === 'undefined') return
  
  // Check if already prefetched
  const existing = document.querySelector(`link[href="${href}"]`)
  if (existing) return
  
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return
  
  // Check if already preloaded
  const existing = document.querySelector(`link[href="${href}"][rel="preload"]`)
  if (existing) return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  document.head.appendChild(link)
}

// Critical CSS inlining helper
export function inlineCriticalCSS(css: string): void {
  if (typeof document === 'undefined') return
  
  const style = document.createElement('style')
  style.textContent = css
  style.setAttribute('data-critical', 'true')
  document.head.appendChild(style)
}

// Font optimization utilities
export function preloadFonts(fonts: Array<{ href: string; type?: string }>): void {
  fonts.forEach(({ href, type = 'font/woff2' }) => {
    preloadResource(href, 'font', type)
  })
}

// Bundle splitting helpers
export function loadComponentLazily<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ComponentType<T>
) {
  return React.lazy(importFn)
}

// Performance measurement
export function measureRenderTime(componentName: string) {
  return function<T extends React.ComponentType<any>>(WrappedComponent: T): T {
    const MeasuredComponent = React.forwardRef<any, React.ComponentProps<T>>((props, ref) => {
      const startTime = React.useRef<number>(0)
      
      React.useLayoutEffect(() => {
        startTime.current = performance.now()
      })
      
      React.useEffect(() => {
        const endTime = performance.now()
        const renderTime = endTime - startTime.current
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
        }
        
        // Track to analytics if available
        if (typeof window !== 'undefined' && (window as any).trackEvent) {
          (window as any).trackEvent({
            name: 'component_render_time',
            properties: {
              component: componentName,
              duration: Math.round(renderTime),
            }
          })
        }
      })
      
      return React.createElement(WrappedComponent, { ...props, ref })
    })
    
    MeasuredComponent.displayName = `Measured(${componentName})`
    return MeasuredComponent as unknown as T
  }
}

// Critical resource loading
export function loadCriticalResources(): void {
  // Preload key fonts
  preloadFonts([
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap' },
  ])
  
  // Prefetch likely navigation targets
  prefetchResource('/about')
  prefetchResource('/work')
  prefetchResource('/blog')
  prefetchResource('/contact')
}

// Memory cleanup utilities
export function cleanupEventListeners(element: Element, events: string[]): void {
  events.forEach(event => {
    element.removeEventListener(event, () => {})
  })
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    const now = Date.now()
    
    if (!previous) previous = now
    
    const remaining = wait - (now - previous)
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    const context = this
    const later = () => {
      timeout = null
      func.apply(context, args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Browser capability detection
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

export function supportsAvif(): boolean {
  if (typeof window === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
}

// Service worker registration
export function registerServiceWorker(swPath: string = '/sw.js'): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null)
  }
  
  return navigator.serviceWorker
    .register(swPath)
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration)
      return registration
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
      return null
    })
}

// React imports for the lazy loading function
import React from 'react'