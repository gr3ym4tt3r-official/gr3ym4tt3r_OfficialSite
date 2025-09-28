import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, Text } from '@/design-system'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Site navigation and page structure for GR3YM4TT3R website.',
}

const sitePages = [
  { href: '/', label: 'Home', description: 'Welcome to GR3YM4TT3R' },
  { href: '/about', label: 'About', description: 'Learn about our philosophy and approach' },
  { href: '/work', label: 'Work', description: 'Portfolio and project showcase' },
  { href: '/blog', label: 'Blog', description: 'Thoughts and insights' },
  { href: '/contact', label: 'Contact', description: 'Get in touch with us' },
  { href: '/privacy', label: 'Privacy Policy', description: 'Our privacy policy' },
  { href: '/terms', label: 'Terms of Service', description: 'Terms and conditions' },
]

export default function SitemapPage() {
  return (
    <ContainedPageLayout>
      <section className="py-16">
        <Container size="narrow">
          <Stack space="lg">
            <Heading variant="display" size="xl">
              Sitemap
            </Heading>
            <Text variant="body" color="muted">
              Navigate through all pages and sections of the GR3YM4TT3R website.
            </Text>
            
            <div className="mt-8">
              <div className="space-y-6">
                {sitePages.map((page) => (
                  <div key={page.href} className="p-6 bg-grey-950/50 rounded-lg border border-grey-800/50">
                    <Link 
                      href={page.href}
                      className="block hover:text-signal-red-500 transition-colors duration-200"
                    >
                      <Heading variant="heading" size="md" className="mb-2">
                        {page.label}
                      </Heading>
                      <Text variant="body" color="muted">
                        {page.description}
                      </Text>
                      <Text variant="caption" color="muted" className="mt-2">
                        {page.href}
                      </Text>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Stack>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}