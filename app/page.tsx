import { FullWidthPageLayout } from '@/components/layout'
import { Container, Grid, Stack, Flex, Button, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import Link from 'next/link'
import { ArrowRight, Shield, Target, Zap } from 'lucide-react'

const coreValues = [
  { icon: Shield, label: 'Duty', description: 'Commitment to excellence in every endeavor' },
  { icon: Target, label: 'Precision', description: 'Meticulous attention to detail and execution' },
  { icon: Zap, label: 'Discipline', description: 'Unwavering focus and self-control' },
]

const features = [
  '✅ Next.js 15 with App Router',
  '✅ TypeScript Configuration', 
  '✅ TailwindCSS v4 Custom Theme',
  '✅ Design System Foundation',
  '✅ Accessibility Features',
  '✅ Performance Optimizations'
]

export default function HomePage() {
  return (
    <FullWidthPageLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <Container size="full" className="text-center">
          <Stack space="lg" align="center">
            <div className="max-w-4xl">
              <DisplayHeading size="2xl" className="mb-6 tracking-tight">
                GR3YM4TT3R
              </DisplayHeading>
              <Lead color="secondary" className="mb-8 max-w-3xl mx-auto">
                Modern, masculine, stoic brand. Communicating{' '}
                <span className="text-signal-red-500 font-semibold">strength</span>,{' '}
                <span className="text-signal-red-500 font-semibold">courage</span>, and{' '}
                <span className="text-signal-red-500 font-semibold">discipline</span> through premium design.
              </Lead>
              
              <Flex space="lg" justify="center" wrap={true}>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-4 bg-signal-red-500 text-grey-950 border border-signal-red-500 rounded-lg hover:bg-red-600 hover:shadow-lg hover:shadow-signal-red-500/40 transition-all duration-200 font-medium text-base min-h-12"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-4 bg-transparent text-grey-100 border border-grey-700 rounded-lg hover:bg-grey-800/50 hover:border-signal-red-500 transition-all duration-200 font-medium text-base min-h-12"
                >
                  Learn More
                </Link>
              </Flex>
            </div>
          </Stack>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-grey-900/30">
        <Container size="full">
          <div className="text-center mb-16">
            <SectionHeading size="xl" className="mb-4">
              Core Values
            </SectionHeading>
            <Text color="secondary" className="max-w-2xl mx-auto">
              Built on the foundation of stoic principles and modern excellence
            </Text>
          </div>
          
          <Grid cols={{ sm: 1, md: 3 }} gap="lg">
            {coreValues.map((value) => {
              const IconComponent = value.icon
              return (
                <div 
                  key={value.label}
                  className="text-center p-8 bg-grey-950/50 rounded-lg border border-grey-800/50 hover:border-signal-red-500/30 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-signal-red-500/10 rounded-lg mb-6">
                    <IconComponent className="w-8 h-8 text-signal-red-500" />
                  </div>
                  <SectionHeading size="base" className="mb-3">
                    {value.label}
                  </SectionHeading>
                  <Text color="secondary">
                    {value.description}
                  </Text>
                </div>
              )
            })}
          </Grid>
        </Container>
      </section>

      {/* Project Status Section */}
      <section className="py-20">
        <Container size="full">
          <div className="text-center mb-16">
            <SectionHeading size="xl" className="mb-4">
              Current Status
            </SectionHeading>
            <Text color="secondary">
              Foundation complete, ready for the next phase
            </Text>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-grey-900/30 rounded-lg">
                  <Text color="secondary">
                    {feature}
                  </Text>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 bg-signal-red-500 text-grey-950 border border-signal-red-500 rounded-lg hover:bg-red-600 hover:shadow-lg hover:shadow-signal-red-500/40 transition-all duration-200 font-medium text-sm"
              >
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </FullWidthPageLayout>
  )
}
