import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
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
        <Container size="sm">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Sitemap
            </DisplayHeading>
            <Text color="secondary">
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
                      <SectionHeading size="base" className="mb-2">
                        {page.label}
                      </SectionHeading>
                      <Text color="secondary">
                        {page.description}
                      </Text>
                      <Caption className="mt-2">
                        {page.href}
                      </Caption>
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