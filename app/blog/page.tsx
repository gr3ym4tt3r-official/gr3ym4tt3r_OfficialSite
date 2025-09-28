import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, Text } from '@/design-system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, philosophy, and the intersection of ancient wisdom with modern development.',
}

export default function BlogPage() {
  return (
    <ContainedPageLayout>
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Container size="narrow">
          <Stack space="lg">
            <Heading variant="display" size="xl">
              Thoughts & Insights
            </Heading>
            <Text variant="lead" color="muted">
              Exploring the intersection of technology, philosophy, and disciplined craftsmanship
            </Text>
          </Stack>
        </Container>
      </section>

      {/* Coming Soon Content */}
      <section className="py-20">
        <Container size="narrow" className="text-center">
          <div className="bg-grey-950/50 rounded-lg border border-grey-800/50 p-12">
            <Stack space="lg">
              <div className="w-16 h-16 bg-signal-red-500/10 rounded-lg mx-auto flex items-center justify-center mb-6">
                <Text variant="heading" className="text-signal-red-500 text-2xl">
                  ✍️
                </Text>
              </div>
              
              <Heading variant="heading" size="lg">
                Content In Development
              </Heading>
              
              <Text variant="body" color="muted" className="max-w-lg mx-auto">
                The blog is currently under development. Soon, you'll find thoughtful articles about:
              </Text>
              
              <div className="max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text variant="body" color="muted">
                    Modern software development practices
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text variant="body" color="muted">
                    Stoic philosophy in technical leadership
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text variant="body" color="muted">
                    Building sustainable, maintainable systems
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text variant="body" color="muted">
                    The intersection of fitness and coding
                  </Text>
                </div>
              </div>
              
              <Text variant="caption" color="muted" className="pt-4">
                Subscribe to be notified when the first articles are published.
              </Text>
            </Stack>
          </div>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}