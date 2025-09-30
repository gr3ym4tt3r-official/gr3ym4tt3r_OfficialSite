'use client';

import { useState } from 'react';
import { ThemeToggle } from '../../src/design-system/utilities/ThemeProvider';
import { 
  FadeIn, 
  SlideIn, 
  ScaleIn, 
  StaggerContainer,
  KineticText,
  WipeIn,
  SignalGlow,
  HoverAnimation,
  useReducedMotion,
  AnimatedBox
} from '../../src/design-system/components/animations';
import { Button } from '../../src/design-system/components/Button';
import { useAnimationPerformance } from '../../src/design-system/utilities/animation-utils';

export default function AnimationDemo() {
  const [triggerGlow, setTriggerGlow] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const isReducedMotion = useReducedMotion();
  const performance = useAnimationPerformance();

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setTriggerGlow(false);
  };

  const handleTriggerGlow = () => {
    setTriggerGlow(!triggerGlow);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12" key={resetKey}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-display font-bold text-primary">
              Animation System Demo
            </h1>
          </FadeIn>
          <SlideIn direction="right" delay={0.3}>
            <p className="text-lg text-secondary">
              GR3YM4TT3R smooth but aggressive animation system
            </p>
          </SlideIn>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle showLabel />
          <Button onClick={handleReset} size="sm">
            Reset Animations
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <ScaleIn delay={0.5}>
        <div className="bg-secondary p-4 rounded-lg border border-primary">
          <h3 className="text-lg font-semibold text-primary mb-2">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-tertiary">Frame Rate:</span>
              <span className={`ml-2 font-mono ${performance.isPerformant ? 'text-green-500' : 'text-red-500'}`}>
                {performance.frameRate} FPS
              </span>
            </div>
            <div>
              <span className="text-tertiary">Reduced Motion:</span>
              <span className="ml-2 font-mono text-accent">
                {isReducedMotion ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div>
              <span className="text-tertiary">Status:</span>
              <span className={`ml-2 font-mono ${performance.isPerformant ? 'text-green-500' : 'text-red-500'}`}>
                {performance.isPerformant ? 'Optimal' : 'Degraded'}
              </span>
            </div>
          </div>
        </div>
      </ScaleIn>

      {/* Core Animation Primitives */}
      <section className="space-y-6">
        <FadeIn delay={0.7}>
          <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
            Core Animation Primitives
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0.9}>
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center">
              <h3 className="text-lg font-medium text-primary mb-2">FadeIn</h3>
              <p className="text-sm text-secondary">Smooth opacity transition</p>
            </div>
          </FadeIn>

          <SlideIn direction="up" delay={1.0}>
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center">
              <h3 className="text-lg font-medium text-primary mb-2">SlideIn Up</h3>
              <p className="text-sm text-secondary">Vertical slide animation</p>
            </div>
          </SlideIn>

          <SlideIn direction="left" delay={1.1}>
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center">
              <h3 className="text-lg font-medium text-primary mb-2">SlideIn Left</h3>
              <p className="text-sm text-secondary">Horizontal slide animation</p>
            </div>
          </SlideIn>

          <ScaleIn delay={1.2}>
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center">
              <h3 className="text-lg font-medium text-primary mb-2">ScaleIn</h3>
              <p className="text-sm text-secondary">Scale with fade animation</p>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Stagger Container */}
      <section className="space-y-6">
        <SlideIn direction="right" delay={1.4}>
          <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
            Stagger Container
          </h2>
        </SlideIn>

        <StaggerContainer staggerDelay="base" delayChildren={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <AnimatedBox key={i} animation="slideUp" className="bg-tertiary p-4 rounded border border-primary text-center">
                <span className="text-primary font-mono">Item {i + 1}</span>
              </AnimatedBox>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* Signature Brand Animations */}
      <section className="space-y-6">
        <FadeIn delay={1.8}>
          <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
            Signature Brand Animations
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {/* Kinetic Typography */}
          <div className="text-center py-8">
            <KineticText delay={2.0} className="text-5xl font-display font-bold text-accent">
              GR3YM4TT3R
            </KineticText>
            <FadeIn delay={2.5}>
              <p className="text-lg text-secondary mt-4">Kinetic Typography Animation</p>
            </FadeIn>
          </div>

          {/* Wipe Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Discipline', 'Strength', 'Excellence'].map((item, index) => (
              <WipeIn key={item} delay={2.2 + index * 0.1}>
                <div className="bg-accent text-white p-6 rounded-lg text-center">
                  <h3 className="text-xl font-display font-semibold">{item}</h3>
                </div>
              </WipeIn>
            ))}
          </div>

          {/* Signal Glow */}
          <div className="text-center space-y-4">
            <SignalGlow trigger={triggerGlow}>
              <div className="bg-secondary p-6 rounded-lg border border-primary inline-block">
                <h3 className="text-lg font-medium text-primary">Signal Red Glow Effect</h3>
              </div>
            </SignalGlow>
            <Button onClick={handleTriggerGlow}>
              {triggerGlow ? 'Disable' : 'Enable'} Glow
            </Button>
          </div>
        </div>
      </section>

      {/* Hover Animations */}
      <section className="space-y-6">
        <SlideIn direction="up" delay={2.8}>
          <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
            Hover Animations
          </h2>
        </SlideIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HoverAnimation type="button">
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center cursor-pointer">
              <h3 className="text-lg font-medium text-primary">Button Hover</h3>
              <p className="text-sm text-secondary">Scale animation</p>
            </div>
          </HoverAnimation>

          <HoverAnimation type="card">
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center cursor-pointer">
              <h3 className="text-lg font-medium text-primary">Card Hover</h3>
              <p className="text-sm text-secondary">Lift animation</p>
            </div>
          </HoverAnimation>

          <HoverAnimation type="socialIcon">
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center cursor-pointer">
              <h3 className="text-lg font-medium text-primary">Social Hover</h3>
              <p className="text-sm text-secondary">Scale + glow</p>
            </div>
          </HoverAnimation>

          <HoverAnimation type="text">
            <div className="bg-secondary p-6 rounded-lg border border-primary text-center cursor-pointer">
              <h3 className="text-lg font-medium text-primary">Text Hover</h3>
              <p className="text-sm text-secondary">Color transition</p>
            </div>
          </HoverAnimation>
        </div>
      </section>

      {/* Interactive Buttons */}
      <section className="space-y-6">
        <FadeIn delay={3.2}>
          <h2 className="text-2xl font-sans font-semibold text-primary border-b border-primary pb-2">
            Interactive Components
          </h2>
        </FadeIn>

        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="social">Social Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </section>

      {/* Performance Tips */}
      <ScaleIn delay={3.6}>
        <div className="bg-tertiary p-6 rounded-lg border border-primary">
          <h3 className="text-lg font-semibold text-primary mb-4">Animation Performance Tips</h3>
          <ul className="text-sm text-secondary space-y-2">
            <li>• All animations respect `prefers-reduced-motion`</li>
            <li>• Hardware-accelerated transforms (transform, opacity)</li>
            <li>• Will-change optimization for smooth animations</li>
            <li>• Intersection Observer for scroll-based animations</li>
            <li>• Automatic cleanup to prevent memory leaks</li>
            <li>• Frame rate monitoring for performance insights</li>
          </ul>
        </div>
      </ScaleIn>
    </div>
  );
}