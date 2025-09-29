import { ContainedPageLayout } from '@/components/layout'
import { Container, Grid, Stack, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import { Code, Coffee, Dumbbell, Mountain } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the philosophy, values, and technical expertise behind GR3YM4TT3R.',
}

const technicalSkills = [
  { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
  { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD', 'Monitoring'] },
  { category: 'Tools', skills: ['Git', 'Figma', 'VS Code', 'Linear'] },
]

const principles = [
  {
    icon: Mountain,
    title: 'Stoic Philosophy',
    description: 'Drawing wisdom from ancient philosophy to navigate modern challenges with clarity and purpose.'
  },
  {
    icon: Dumbbell,
    title: 'Physical Excellence',
    description: 'Maintaining physical fitness as the foundation for mental clarity and professional performance.'
  },
  {
    icon: Code,
    title: 'Technical Mastery',
    description: 'Pursuing continuous improvement in craft through deliberate practice and learning.'
  },
  {
    icon: Coffee,
    title: 'Disciplined Routine',
    description: 'Building success through consistent daily habits and systematic approaches to work.'
  },
]

export default function AboutPage() {
  return (
    <ContainedPageLayout>
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Container size="lg">
          <Stack space="lg">
            <DisplayHeading size="xl">
              About GR3YM4TT3R
            </DisplayHeading>
            <Lead color="secondary">
              Modern masculinity meets stoic philosophy in the pursuit of technical excellence
            </Lead>
          </Stack>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <Container size="full">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeading size="xl" className="mb-8 text-center">
              Philosophy & Approach
            </SectionHeading>
            <div className="prose prose-lg prose-invert max-w-none">
              <Text color="primary" className="text-lg leading-relaxed mb-6">
                GR3YM4TT3R represents the intersection of ancient wisdom and modern technology. 
                We believe that true strength comes not from external validation, but from the 
                disciplined pursuit of excellence in all endeavors.
              </Text>
              <Text color="secondary" className="leading-relaxed mb-6">
                Our approach combines the stoic principles of duty, courage, and precision with 
                cutting-edge technical skills. Every project is approached with the mindset of a 
                craftsman—attention to detail, respect for the process, and an unwavering commitment 
                to quality.
              </Text>
              <Text color="secondary" className="leading-relaxed">
                In a world of shortcuts and surface-level solutions, we choose the path of depth, 
                authenticity, and sustainable excellence. This is not just about building software—
                it&apos;s about building character through code.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-grey-900/30">
        <Container size="full">
          <div className="text-center mb-16">
            <SectionHeading size="xl" className="mb-4">
              Core Principles
            </SectionHeading>
            <Text color="secondary">
              The foundational values that guide every decision and action
            </Text>
          </div>
          
          <Grid cols={{ sm: 1, md: 2 }} gap="lg">
            {principles.map((principle) => {
              const IconComponent = principle.icon
              return (
                <div 
                  key={principle.title}
                  className="p-8 bg-grey-950/50 rounded-lg border border-grey-800/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-signal-red-500/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-signal-red-500" />
                      </div>
                    </div>
                    <div>
                      <SectionHeading size="base" className="mb-3">
                        {principle.title}
                      </SectionHeading>
                      <Text color="secondary">
                        {principle.description}
                      </Text>
                    </div>
                  </div>
                </div>
              )
            })}
          </Grid>
        </Container>
      </section>

      {/* Technical Expertise */}
      <section className="py-20">
        <Container size="full">
          <div className="text-center mb-16">
            <SectionHeading size="xl" className="mb-4">
              Technical Expertise
            </SectionHeading>
            <Text color="secondary">
              Tools and technologies mastered through disciplined practice
            </Text>
          </div>
          
          <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap="lg">
            {technicalSkills.map((category) => (
              <div 
                key={category.category}
                className="p-6 bg-grey-900/30 rounded-lg border border-grey-800/30"
              >
                <SectionHeading size="sm" className="mb-4 text-signal-red-500">
                  {category.category}
                </SectionHeading>
                <Stack space="xs">
                  {category.skills.map((skill) => (
                    <Text key={skill} color="secondary" className="text-sm">
                      {skill}
                    </Text>
                  ))}
                </Stack>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Personal Mission */}
      <section className="py-20 bg-grey-900/30">
        <Container size="sm" className="text-center">
          <Stack space="lg">
            <SectionHeading size="xl">
              The Mission
            </SectionHeading>
            <Lead color="secondary">
              To demonstrate that excellence is not a destination, but a way of traveling—
              combining timeless principles with modern tools to create work that matters.
            </Lead>
            <div className="mt-8">
              <Text color="primary" className="font-medium">
                &quot;You have power over your mind - not outside events. Realize this, and you will find strength.&quot;
              </Text>
              <Caption className="mt-2">
                — Marcus Aurelius
              </Caption>
            </div>
          </Stack>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}