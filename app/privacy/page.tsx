import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for GR3YM4TT3R website and services.',
}

export default function PrivacyPage() {
  return (
    <ContainedPageLayout>
      <section className="py-16">
        <Container size="sm">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Privacy Policy
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
                At GR3YM4TT3R, we are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy outlines 
                how we collect, use, and protect your data.
              </Text>
              
              <div className="space-y-8">
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    Information We Collect
                  </SectionHeading>
                  <Text color="secondary">
                    We may collect personal information such as your name, email address, 
                    and any information you provide when contacting us through our website.
                  </Text>
                </div>
                
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    How We Use Your Information
                  </SectionHeading>
                  <Text color="secondary">
                    We use your information to respond to your inquiries, provide services, 
                    and improve our website. We do not sell, trade, or share your personal 
                    information with third parties without your consent.
                  </Text>
                </div>
                
                <div>
                  <SectionHeading size="lg" className="mb-4">
                    Contact Us
                  </SectionHeading>
                  <Text color="secondary">
                    If you have any questions about this Privacy Policy, please contact us 
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