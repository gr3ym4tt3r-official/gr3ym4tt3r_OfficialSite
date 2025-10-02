import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  image?: string
  published?: boolean
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

export function getPostSlugs(): string[] {
  try {
    return readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'))
  } catch (error) {
    return []
  }
}

export function getAllPostsSlugs(): string[] {
  return getPostSlugs()
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const readingTimeResult = readingTime(content)

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'GR3YM4TT3R',
    tags: data.tags || [],
    image: data.image,
    published: data.published !== false,
    content,
    readingTime: readingTimeResult,
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.published)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap(post => post.tags || [])
  return Array.from(new Set(tags)).sort()
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts().filter(post => post.slug !== currentPost.slug)
  
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return allPosts.slice(0, limit)
  }

  // Score posts based on shared tags
  const scoredPosts = allPosts.map(post => {
    const sharedTags = post.tags?.filter(tag => 
      currentPost.tags?.includes(tag)
    ) || []
    return {
      post,
      score: sharedTags.length
    }
  })

  // Sort by score (descending) then by date (descending)
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score
    }
    return a.post.date > b.post.date ? -1 : 1
  })

  return scoredPosts.slice(0, limit).map(item => item.post)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}