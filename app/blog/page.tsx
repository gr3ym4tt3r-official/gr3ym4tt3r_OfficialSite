import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption, Button } from '@/design-system'
import { getAllPostsMeta, formatDateShort } from '@/lib/blog'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, philosophy, and the intersection of ancient wisdom with modern development.',
}

export default function BlogPage() {
  const posts = getAllPostsMeta()

  return (
    <ContainedPageLayout>
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Container size="lg">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Thoughts & Insights
            </DisplayHeading>
            <Lead color="secondary">
              Exploring the intersection of technology, philosophy, and disciplined craftsmanship
            </Lead>
          </Stack>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <Container size="lg">
          {posts.length > 0 ? (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-grey-950/30 border border-grey-800/30 rounded-lg p-8 hover:border-grey-700/50 transition-colors duration-200">
                  <Stack space="base">
                    <div className="flex items-center justify-between">
                      <Caption>
                        {formatDateShort(post.date)} • {post.readingTime.text}
                      </Caption>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-signal-red-500/10 text-signal-red-400 text-xs rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <SectionHeading size="lg">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-signal-red-400 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </SectionHeading>
                    
                    <Text color="secondary" className="line-clamp-2">
                      {post.description}
                    </Text>
                    
                    <div className="pt-4">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-signal-red-500 hover:text-signal-red-400 transition-colors duration-200"
                      >
                        Read Article →
                      </Link>
                    </div>
                  </Stack>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-grey-950/50 rounded-lg border border-grey-800/50 p-12">
                <Stack space="lg">
                  <div className="w-16 h-16 bg-signal-red-500/10 rounded-lg mx-auto flex items-center justify-center mb-6">
                    <Text className="text-signal-red-500 text-2xl">
                      ✍️
                    </Text>
                  </div>
                  
                  <SectionHeading size="lg">
                    No Articles Yet
                  </SectionHeading>
                  
                  <Text color="secondary" className="max-w-lg mx-auto">
                    Blog posts are coming soon. Check back later for insightful content.
                  </Text>
                </Stack>
              </div>
            </div>
          )}
        </Container>
      </section>
    </ContainedPageLayout>
  )
}
