import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for GR3YM4TT3R website and services.',
}

export default function TermsPage() {
  return (
    <ContainedPageLayout>
      <section className="py-16">
        <Container size="sm">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Terms of Service
            </DisplayHeading>
            <Text color="secondary">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            
            <div className="prose prose-invert max-w-none">
              <Text color="primary" className="mb-6">
                These Terms of Service govern your use of the GR3YM4TT3R website and services.
                By accessing our website, you agree to these terms.
              </Text>
              
              <div className="space-y-8">
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    Use of Website
                  </SectionHeading>
                  <Text color="secondary">
                    You may use our website for lawful purposes only. You agree not to use 
                    the website in any way that could damage, disable, or impair the website.
                  </Text>
                </div>
                
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    Intellectual Property
                  </SectionHeading>
                  <Text color="secondary">
                    All content on this website, including text, graphics, logos, and images, 
                    is the property of GR3YM4TT3R and is protected by copyright and other 
                    intellectual property laws.
                  </Text>
                </div>
                
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    Contact Information
                  </SectionHeading>
                  <Text color="secondary">
                    If you have any questions about these Terms of Service, please contact us 
                    at hello@gr3ym4tt3r.com.
                  </Text>
                </div>
              </div>
            </div>
          </Stack>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}