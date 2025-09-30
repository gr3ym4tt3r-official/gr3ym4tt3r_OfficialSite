'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MotionConfig, Transition, Variants } from 'framer-motion';
import { durations, easings, getReducedMotionVariant } from '../tokens/motion';

interface AnimationContextType {
  isReducedMotion: boolean;
  globalTransition: Transition;
  getVariants: (variants: Variants) => Variants;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
    };

    setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const globalTransition: Transition = {
    duration: isReducedMotion ? durations.instant : durations.base,
    ease: easings.primary,
  };

  const getVariants = (variants: Variants): Variants => {
    if (isReducedMotion) {
      return getReducedMotionVariant(variants);
    }
    return variants;
  };

  const contextValue: AnimationContextType = {
    isReducedMotion,
    globalTransition,
    getVariants,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <MotionConfig
        transition={globalTransition}
        reducedMotion={isReducedMotion ? 'always' : 'never'}
      >
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
}

// Hook to use animation context
export function useAnimation() {
  const context = useContext(AnimationContext);
  
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
}

// Hook to check if animations should be reduced
export function useReducedMotion() {
  const { isReducedMotion } = useAnimation();
  return isReducedMotion;
}

// Hook to get motion-aware variants
export function useMotionVariants(variants: Variants) {
  const { getVariants } = useAnimation();
  return getVariants(variants);
}