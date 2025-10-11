import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, DisplayHeading, Text, Caption } from '@/design-system'
import { getPostBySlug, getAllPostsSlugs, formatDate, getRelatedPosts } from '@/lib/blog'
import { MDXRenderer } from '@/components/MDXRenderer'
import { BlogPostAnalytics } from '@/components/BlogPostAnalytics'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = getPostBySlug(slug)
    
    return {
      title: post.title,
      description: post.description,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author || 'GR3YM4TT3R'],
        images: post.image ? [{ url: post.image }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.image ? [post.image] : undefined,
      },
    }
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostsSlugs()
  return slugs.map(slug => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const post = getPostBySlug(slug)
    const relatedPosts = getRelatedPosts(post)

    if (!post.published) {
      notFound()
    }

    return (
      <ContainedPageLayout>
        <BlogPostAnalytics slug={post.slug} title={post.title} />
        {/* Article Header */}
        <article className="py-16">
          <Container size="base">
            <header className="mb-12">
              <Stack space="lg">
                <div className="flex items-center justify-between">
                  <Caption>
                    {formatDate(post.date)} • {post.readingTime.text}
                  </Caption>
                  <Link
                    href="/blog"
                    className="text-signal-red-500 hover:text-signal-red-400 text-sm transition-colors duration-200"
                  >
                    ← Back to Blog
                  </Link>
                </div>

                <DisplayHeading size="xl" className="text-center">
                  {post.title}
                </DisplayHeading>

                <Text color="secondary" className="text-center text-lg">
                  {post.description}
                </Text>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 justify-center flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-signal-red-500/10 text-signal-red-400 text-sm rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <hr className="border-grey-800" />
              </Stack>
            </header>

            {/* Article Content */}
            <MDXRenderer content={post.content} />

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-grey-800">
              <div className="flex items-center justify-between">
                <Text color="secondary" size="sm">
                  By {post.author}
                </Text>
                <Text color="secondary" size="sm">
                  Published {formatDate(post.date)}
                </Text>
              </div>
            </footer>
          </Container>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-grey-950/30 border-t border-grey-800/50">
            <Container size="lg">
              <Stack space="xl">
                <div className="text-center">
                  <DisplayHeading size="lg">Related Articles</DisplayHeading>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.slug}
                      className="bg-grey-900/50 border border-grey-800/30 rounded-lg p-6 hover:border-grey-700/50 transition-colors duration-200"
                    >
                      <Stack space="sm">
                        <Caption>
                          {formatDate(relatedPost.date)}
                        </Caption>
                        
                        <Text size="lg" weight="medium">
                          <Link
                            href={`/blog/${relatedPost.slug}`}
                            className="hover:text-signal-red-400 transition-colors duration-200"
                          >
                            {relatedPost.title}
                          </Link>
                        </Text>
                        
                        <Text color="secondary" size="sm" className="line-clamp-2">
                          {relatedPost.description}
                        </Text>
                        
                        {relatedPost.tags && relatedPost.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {relatedPost.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-signal-red-500/10 text-signal-red-400 text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Stack>
                    </article>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-signal-red-500 hover:text-signal-red-400 transition-colors duration-200"
                  >
                    View All Articles →
                  </Link>
                </div>
              </Stack>
            </Container>
          </section>
        )}
      </ContainedPageLayout>
    )
  } catch {
    notFound()
  }
}