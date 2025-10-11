import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Heading, Text } from '@/design-system'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export const mdxComponents: MDXComponents = {
  // Headings
    h1: ({ children, ...props }) => (
      <Heading as="h1" size="4xl" className="mt-8 mb-4 first:mt-0" {...props}>
        {children}
      </Heading>
    ),
    h2: ({ children, ...props }) => (
      <Heading as="h2" size="3xl" className="mt-8 mb-4" {...props}>
        {children}
      </Heading>
    ),
    h3: ({ children, ...props }) => (
      <Heading as="h3" size="2xl" className="mt-6 mb-3" {...props}>
        {children}
      </Heading>
    ),
    h4: ({ children, ...props }) => (
      <Heading as="h4" size="xl" className="mt-6 mb-3" {...props}>
        {children}
      </Heading>
    ),
    h5: ({ children, ...props }) => (
      <Heading as="h5" size="lg" className="mt-4 mb-2" {...props}>
        {children}
      </Heading>
    ),
    h6: ({ children, ...props }) => (
      <Heading as="h6" size="md" className="mt-4 mb-2" {...props}>
        {children}
      </Heading>
    ),

    // Paragraphs and text
    p: ({ children, ...props }) => (
      <Text className="mb-4 leading-relaxed" {...props}>
        {children}
      </Text>
    ),

    // Links - use Next.js Link for internal links
    a: ({ href, children, ...props }) => {
      // More defensive href checking
      if (!href || typeof href !== 'string') {
        return (
          <span className="text-signal-red-500 cursor-default" {...props}>
            {children}
          </span>
        )
      }
      
      const isExternal = href.startsWith('http') || href.startsWith('mailto:')
      
      if (isExternal) {
        return (
          <a
            href={href}
            className="text-signal-red-500 hover:text-signal-red-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="text-signal-red-500 hover:text-signal-red-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
          {...props}
        >
          {children}
        </Link>
      )
    },

    // Images - use Next.js Image component
    img: ({ src, alt, ...props }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={600}
        className="rounded-lg my-6"
        {...props}
      />
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-signal-red-500 pl-6 italic text-grey-300 bg-grey-900/30 py-4 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Code blocks and inline code
    code: ({ children, className, ...props }) => {
      const isInline = !className?.includes('language-')
      
      if (isInline) {
        return (
          <code
            className="bg-grey-800 text-grey-100 px-2 py-1 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        )
      }

      return (
        <code
          className={`block bg-grey-900 text-grey-100 p-4 rounded-lg overflow-x-auto font-mono text-sm my-4 ${className || ''}`}
          {...props}
        >
          {children}
        </code>
      )
    },

    pre: ({ children, ...props }) => (
      <pre className="my-4 overflow-x-auto" {...props}>
        {children}
      </pre>
    ),

    // Tables
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-grey-800" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="border-b border-grey-700" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th className="px-4 py-3 text-left font-medium text-grey-100" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-grey-300" {...props}>
        {children}
      </td>
    ),

    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-8 border-t border-grey-700" {...props} />
    ),

}
