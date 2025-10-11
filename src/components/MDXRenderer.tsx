'use client'

import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { useEffect, useState } from 'react'

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    async function processMarkdown() {
      const result = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content)
      
      setHtmlContent(result.toString())
    }

    processMarkdown()
  }, [content])

  return (
    <div className="prose prose-lg prose-invert max-w-none mdx-content">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
