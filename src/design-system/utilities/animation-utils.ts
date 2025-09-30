'use client';

/**
 * Animation Performance Utilities
 * 
 * Hardware-accelerated transforms, will-change optimization,
 * intersection observer for performance, cleanup utilities
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Performance optimization: Hardware-accelerated CSS properties
export const HARDWARE_ACCELERATED_PROPS = [
  'transform',
  'opacity',
  'filter',
  'backdrop-filter',
] as const;

// Will-change optimization hook
export function useWillChange(properties: string[] = ['transform', 'opacity']) {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const willChangeValue = properties.join(', ');
    element.style.willChange = willChangeValue;
    
    // Cleanup will-change after animation completes
    const cleanup = () => {
      if (element) {
        element.style.willChange = 'auto';
      }
    };
    
    // Listen for animation end events
    element.addEventListener('animationend', cleanup);
    element.addEventListener('transitionend', cleanup);
    
    return () => {
      element.removeEventListener('animationend', cleanup);
      element.removeEventListener('transitionend', cleanup);
      cleanup();
    };
  }, [properties]);
  
  return ref;
}

// Intersection Observer hook for performance
export function useAnimateOnScroll() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true, // Only animate once
    margin: '-50px', // Trigger 50px before entering viewport
  });
  
  return { ref, isInView };
}

// Performance monitoring for animations
export function useAnimationPerformance() {
  const [metrics, setMetrics] = useState({
    frameRate: 60,
    lastFrameTime: 0,
    isPerformant: true,
  });
  
  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measurePerformance = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics({
          frameRate: fps,
          lastFrameTime: currentTime,
          isPerformant: fps >= 55, // Consider performant if >= 55fps
        });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrame = requestAnimationFrame(measurePerformance);
    };
    
    animationFrame = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);
  
  return metrics;
}

// Debounced animation trigger for performance
export function useDebouncedAnimation(delay: number = 100) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const trigger = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);
  };
  
  const reset = () => {
    setShouldAnimate(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return { shouldAnimate, trigger, reset };
}

// Animation cleanup utility
export function useAnimationCleanup() {
  const elementsRef = useRef<Set<HTMLElement>>(new Set());
  
  const addElement = (element: HTMLElement) => {
    elementsRef.current.add(element);
  };
  
  const removeElement = (element: HTMLElement) => {
    elementsRef.current.delete(element);
  };
  
  useEffect(() => {
    return () => {
      // Cleanup all registered elements
      const elements = elementsRef.current;
      elements.forEach(element => {
        if (element) {
          element.style.willChange = 'auto';
          element.style.transform = '';
          element.style.opacity = '';
        }
      });
      elements.clear();
    };
  }, []);
  
  return { addElement, removeElement };
}

// Reduced motion utilities
export function getReducedMotionConfig() {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createReducedMotionVariants(normalVariants: any) {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    },
  };
}

// Animation performance best practices
export const PERFORMANCE_TIPS = {
  // Prefer these CSS properties for animations
  PERFORMANT_PROPERTIES: [
    'transform', 
    'opacity', 
    'filter', 
    'backdrop-filter'
  ],
  
  // Avoid animating these properties
  AVOID_PROPERTIES: [
    'width', 
    'height', 
    'padding', 
    'margin', 
    'border-width',
    'left',
    'top',
    'right',
    'bottom'
  ],
  
  // Optimal timing functions
  OPTIMAL_EASINGS: [
    'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material Design
    'cubic-bezier(0.25, 0.1, 0.25, 1)', // GR3YM4TT3R primary
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth
  ],
  
  // Performance thresholds
  THRESHOLDS: {
    MIN_FPS: 55,
    MAX_ANIMATION_DURATION: 1000,
    MAX_STAGGER_CHILDREN: 10,
  },
} as const;