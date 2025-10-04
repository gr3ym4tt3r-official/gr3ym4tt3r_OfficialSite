'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from './mdx-components'

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const components = useMDXComponents({})

  return (
    <div className="prose prose-lg prose-invert max-w-none mdx-content">
      <MDXRemote
        source={content}
        components={components}
      />
    </div>
  )
}