'use client';

import { useState } from 'react';
import { 
  // Layout
  Container, Grid, Stack, Flex,
  // Typography
  Heading, Text, DisplayHeading, SectionHeading,
  // Forms
  Input, FormButton, Select,
  // Feedback
  Alert,
  // Navigation
  Tabs,
  // Animations
  FadeIn, SlideIn, StaggerContainer,
  // Theme
  ThemeToggle
} from '../../src/design-system';

export default function ComponentsDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  const demoTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📊',
      content: (
        <Stack space="lg">
          <Text size="lg">
            Welcome to the GR3YM4TT3R Design System component showcase. 
            This demonstrates all core components with smooth animations and 
            accessibility features.
          </Text>
          <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg" stagger>
            <FadeIn delay={0.1}>
              <div className="bg-secondary p-6 rounded-lg border border-primary">
                <SectionHeading size="base">Performance First</SectionHeading>
                <Text color="secondary" className="mt-2">
                  All components use hardware-accelerated animations and respect user preferences.
                </Text>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-secondary p-6 rounded-lg border border-primary">
                <SectionHeading size="base">Accessible</SectionHeading>
                <Text color="secondary" className="mt-2">
                  WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation.
                </Text>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-secondary p-6 rounded-lg border border-primary">
                <SectionHeading size="base">Brand Aligned</SectionHeading>
                <Text color="secondary" className="mt-2">
                  Follows the &ldquo;smooth but aggressive&rdquo; motion philosophy with signal red accents.
                </Text>
              </div>
            </FadeIn>
          </Grid>
        </Stack>
      ),
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: '📝',
      content: (
        <Stack space="xl">
          <div>
            <SectionHeading size="lg">Form Components</SectionHeading>
            <Text color="secondary" className="mt-2">
              Interactive form elements with validation and smooth animations.
            </Text>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Grid cols={{ sm: 1, md: 2 }} gap="lg">
              <Input
                id="name"
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </Grid>
            
            <Select
              id="country"
              label="Country"
              options={countryOptions}
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              placeholder="Select your country"
              required
            />
            
            <Flex justify="end" space="base">
              <FormButton
                type="button"
                variant="secondary"
                onClick={() => setFormData({ name: '', email: '', country: '' })}
              >
                Reset
              </FormButton>
              <FormButton
                type="submit"
                loading={loading}
                loadingText="Submitting..."
              >
                Submit Form
              </FormButton>
            </Flex>
          </form>
          
          {showAlert && (
            <Alert
              variant="success"
              title="Form Submitted!"
              dismissible
              onDismiss={() => setShowAlert(false)}
            >
              Your form has been successfully submitted. Thank you for trying out our components!
            </Alert>
          )}
        </Stack>
      ),
    },
    {
      id: 'layout',
      label: 'Layout',
      icon: '🏗️',
      content: (
        <Stack space="xl">
          <div>
            <SectionHeading size="lg">Layout Components</SectionHeading>
            <Text color="secondary" className="mt-2">
              Flexible layout systems with responsive design and animations.
            </Text>
          </div>
          
          <div className="space-y-8">
            <div>
              <Text weight="semibold" className="mb-4">Grid System</Text>
              <Grid cols={{ sm: 2, md: 4 }} gap="base" animation="fade">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="bg-accent/20 p-4 rounded text-center">
                    <Text size="sm">Grid {i + 1}</Text>
                  </div>
                ))}
              </Grid>
            </div>
            
            <div>
              <Text weight="semibold" className="mb-4">Stack Layout</Text>
              <Stack space="base">
                <div className="bg-secondary p-4 rounded border border-primary">
                  <Text>Stack Item 1</Text>
                </div>
                <div className="bg-secondary p-4 rounded border border-primary">
                  <Text>Stack Item 2</Text>
                </div>
                <div className="bg-secondary p-4 rounded border border-primary">
                  <Text>Stack Item 3</Text>
                </div>
              </Stack>
            </div>
            
            <div>
              <Text weight="semibold" className="mb-4">Flex Layout</Text>
              <Flex justify="between" align="center" className="bg-tertiary p-4 rounded">
                <Text>Left Content</Text>
                <Text>Center Content</Text>
                <Text>Right Content</Text>
              </Flex>
            </div>
          </div>
        </Stack>
      ),
    },
    {
      id: 'typography',
      label: 'Typography',
      icon: '🔤',
      content: (
        <Stack space="xl">
          <div>
            <SectionHeading size="lg">Typography Scale</SectionHeading>
            <Text color="secondary" className="mt-2">
              Modular typography system with Inter for UI and Cinzel for display text.
            </Text>
          </div>
          
          <div className="space-y-6">
            <div>
              <Text weight="semibold" className="mb-4">Display Typography (Cinzel)</Text>
              <Stack space="base">
                <DisplayHeading size="2xl">Display 2XL Heading</DisplayHeading>
                <DisplayHeading size="xl">Display XL Heading</DisplayHeading>
                <DisplayHeading size="lg">Display LG Heading</DisplayHeading>
              </Stack>
            </div>
            
            <div>
              <Text weight="semibold" className="mb-4">Section Typography (Inter)</Text>
              <Stack space="base">
                <SectionHeading size="2xl">Section 2XL Heading</SectionHeading>
                <SectionHeading size="xl">Section XL Heading</SectionHeading>
                <SectionHeading size="lg">Section LG Heading</SectionHeading>
              </Stack>
            </div>
            
            <div>
              <Text weight="semibold" className="mb-4">Body Text</Text>
              <Stack space="base">
                <Text size="xl">Extra large body text for lead paragraphs and important content.</Text>
                <Text size="lg">Large body text for emphasis and highlighted content.</Text>
                <Text size="base">Base body text for standard content and paragraphs.</Text>
                <Text size="sm">Small body text for captions and secondary content.</Text>
                <Text size="xs">Extra small text for fine print and metadata.</Text>
              </Stack>
            </div>
          </div>
        </Stack>
      ),
    },
  ];

  return (
    <Container>
      <div className="py-8 space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <FadeIn>
              <DisplayHeading size="xl">Component Library</DisplayHeading>
            </FadeIn>
            <SlideIn direction="right" delay={0.2}>
              <Text size="lg" color="secondary" className="mt-2">
                Complete showcase of the GR3YM4TT3R Design System
              </Text>
            </SlideIn>
          </div>
          <ThemeToggle showLabel />
        </div>

        {/* Main Content */}
        <div>
          <Tabs
            tabs={demoTabs}
            defaultTab="overview"
            variant="underline"
            size="base"
          />
        </div>

        {/* Animation Showcase */}
        <SlideIn direction="up" delay={0.5}>
          <div className="bg-tertiary p-8 rounded-lg border border-primary">
            <SectionHeading size="lg" className="mb-6">Animation Showcase</SectionHeading>
            
            <StaggerContainer staggerDelay="base" delayChildren={0.1}>
              <Grid cols={{ sm: 2, md: 4 }} gap="lg">
                {['Fade In', 'Slide Up', 'Scale In', 'Wipe In'].map((animation, index) => (
                  <SlideIn key={animation} direction="up" delay={index * 0.1}>
                    <div className="bg-secondary p-6 rounded-lg border border-primary text-center">
                      <Text weight="medium">{animation}</Text>
                      <Text size="sm" color="secondary" className="mt-1">
                        Animation #{index + 1}
                      </Text>
                    </div>
                  </SlideIn>
                ))}
              </Grid>
            </StaggerContainer>
          </div>
        </SlideIn>
      </div>
    </Container>
  );
}