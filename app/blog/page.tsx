import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
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

      {/* Coming Soon Content */}
      <section className="py-20">
        <Container size="lg" className="text-center">
          <div className="bg-grey-950/50 rounded-lg border border-grey-800/50 p-12">
            <Stack space="lg">
              <div className="w-16 h-16 bg-signal-red-500/10 rounded-lg mx-auto flex items-center justify-center mb-6">
                <Text className="text-signal-red-500 text-2xl">
                  ✍️
                </Text>
              </div>
              
              <SectionHeading size="lg">
                Content In Development
              </SectionHeading>
              
              <Text color="secondary" className="max-w-lg mx-auto">
                The blog is currently under development. Soon, you&apos;ll find thoughtful articles about:
              </Text>
              
              <div className="max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text color="secondary">
                    Modern software development practices
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text color="secondary">
                    Stoic philosophy in technical leadership
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text color="secondary">
                    Building sustainable, maintainable systems
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-signal-red-500 rounded-full flex-shrink-0" />
                  <Text color="secondary">
                    The intersection of fitness and coding
                  </Text>
                </div>
              </div>
              
              <Caption className="pt-4">
                Subscribe to be notified when the first articles are published.
              </Caption>
            </Stack>
          </div>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}