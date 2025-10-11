import { ContainedPageLayout } from '@/components/layout'
import { ContactForm } from '@/components/ContactForm'
import { Container, Grid, Stack, Button, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import { Mail, MessageSquare, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss projects, collaborations, or opportunities.',
}

export default function ContactPage() {
  return (
    <ContainedPageLayout>
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Container size="sm">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Let&apos;s Connect
            </DisplayHeading>
            <Lead color="secondary">
              Ready to build something exceptional? Let&apos;s discuss your project with precision and purpose.
            </Lead>
          </Stack>
        </Container>
      </section>

      <Grid cols={{ sm: 1, lg: 2 }} gap="xl" className="py-12">
        {/* Contact Form */}
        <div className="bg-grey-950/50 rounded-lg border border-grey-800/50 p-8">
          <SectionHeading size="lg" className="mb-6">
            Start a Conversation
          </SectionHeading>
          
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <SectionHeading size="lg" className="mb-6">
              Get in Touch
            </SectionHeading>
            <Text color="secondary" className="mb-8">
              Whether you have a project in mind, want to collaborate, or simply want to connect, 
              I&apos;m always interested in meaningful conversations about technology, philosophy, and building something great.
            </Text>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-signal-red-500/10 rounded-lg">
                  <Mail className="w-5 h-5 text-signal-red-500" />
                </div>
              </div>
              <div>
                <Text className="font-medium mb-1">
                  Email
                </Text>
                <Text color="secondary">
                  hello@gr3ym4tt3r.com
                </Text>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-signal-red-500/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-signal-red-500" />
                </div>
              </div>
              <div>
                <Text className="font-medium mb-1">
                  Response Time
                </Text>
                <Text color="secondary">
                  Within 24 hours
                </Text>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-signal-red-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-signal-red-500" />
                </div>
              </div>
              <div>
                <Text className="font-medium mb-1">
                  Availability
                </Text>
                <Text color="secondary">
                  Open for select projects
                </Text>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-grey-900/30 rounded-lg p-6 mt-8">
            <SectionHeading size="base" className="mb-3">
              Project Collaboration
            </SectionHeading>
            <Text color="secondary" className="mb-4">
              Looking for a technical partner who values quality, precision, and timeless principles? 
              Let&apos;s explore how we can create something exceptional together.
            </Text>
            <a 
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-grey-100 border border-grey-700 rounded-lg hover:bg-grey-800/50 hover:border-signal-red-500 transition-all duration-200 font-medium text-sm"
            >
              View Previous Work
            </a>
          </div>
        </div>
      </Grid>
    </ContainedPageLayout>
  )
}