'use client'

import { useEffect } from 'react'
import { trackBlogPostView } from '@/lib/analytics'

interface BlogPostAnalyticsProps {
  slug: string
  title: string
}

export function BlogPostAnalytics({ slug, title }: BlogPostAnalyticsProps) {
  useEffect(() => {
    // Track blog post view on mount
    trackBlogPostView(slug, title)
  }, [slug, title])

  // This component doesn't render anything
  return null
}