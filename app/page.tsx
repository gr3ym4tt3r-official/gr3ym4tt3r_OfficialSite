import { FullWidthPageLayout } from '@/components/layout'
import { Container, Grid, Stack, Button, Heading, Text } from '@/design-system'
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
        <Container size="wide" className="text-center">
          <Stack space="lg" align="center">
            <div className="max-w-4xl">
              <Heading variant="display" size="2xl" className="mb-6 tracking-tight">
                GR3YM4TT3R
              </Heading>
              <Text variant="lead" color="muted" className="mb-8 max-w-3xl mx-auto">
                Modern, masculine, stoic brand. Communicating{' '}
                <span className="text-signal-red-500 font-semibold">strength</span>,{' '}
                <span className="text-signal-red-500 font-semibold">courage</span>, and{' '}
                <span className="text-signal-red-500 font-semibold">discipline</span> through premium design.
              </Text>
              
              <Stack direction="horizontal" space="md" justify="center" className="flex-wrap">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </Stack>
            </div>
          </Stack>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-grey-900/30">
        <Container size="wide">
          <div className="text-center mb-16">
            <Heading variant="heading" size="xl" className="mb-4">
              Core Values
            </Heading>
            <Text variant="body" color="muted" className="max-w-2xl mx-auto">
              Built on the foundation of stoic principles and modern excellence
            </Text>
          </div>
          
          <Grid cols={{ base: 1, md: 3 }} gap="lg">
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
                  <Heading variant="heading" size="md" className="mb-3">
                    {value.label}
                  </Heading>
                  <Text variant="body" color="muted">
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
        <Container size="wide">
          <div className="text-center mb-16">
            <Heading variant="heading" size="xl" className="mb-4">
              Current Status
            </Heading>
            <Text variant="body" color="muted">
              Foundation complete, ready for the next phase
            </Text>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-grey-900/30 rounded-lg">
                  <Text variant="body" color="muted">
                    {feature}
                  </Text>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="primary" asChild>
                <Link href="/work">
                  View Our Work
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </FullWidthPageLayout>
  )
}
