/**
 * GR3YM4TT3R Motion System
 * 
 * "Smooth but aggressive" - fast start, clean settle
 * Respects prefers-reduced-motion for accessibility
 */

// Easing curves - aggressive start, smooth settle
export const easings = {
  // Primary easing - fast start, clean settle
  primary: [0.25, 0.1, 0.25, 1],
  
  // Specific motion characteristics
  swiftOut: [0.4, 0.0, 0.2, 1],      // Quick exit
  swiftIn: [0.4, 0.0, 1, 1],         // Quick entrance  
  aggressive: [0.6, 0.0, 0.2, 1],    // More aggressive start
  smooth: [0.25, 0.46, 0.45, 0.94],  // Smooth throughout
  
  // Standard curves for reference
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
} as const;

// Duration scale (in seconds)
export const durations = {
  instant: 0.1,   // 100ms - micro interactions
  fast: 0.2,      // 200ms - quick transitions
  base: 0.3,      // 300ms - standard transitions
  slow: 0.5,      // 500ms - deliberate movements
  slower: 0.7,    // 700ms - prominent changes
  crawl: 1.0,     // 1s - major state changes
} as const;

// Stagger timing for sequential animations
export const stagger = {
  fast: 0.05,     // 50ms between items
  base: 0.1,      // 100ms between items  
  slow: 0.15,     // 150ms between items
  slower: 0.2,    // 200ms between items
} as const;

// Common animation variants for Framer Motion
export const animations = {
  // Fade animations
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Scale animations (for buttons, cards)
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: durations.fast,
        ease: easings.swiftOut,
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: durations.base,
        ease: easings.aggressive,
      },
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: durations.base,
        ease: easings.aggressive,
      },
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: durations.base,
        ease: easings.aggressive,
      },
    },
    exit: { 
      opacity: 0, 
      x: -15,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: durations.base,
        ease: easings.aggressive,
      },
    },
    exit: { 
      opacity: 0, 
      x: 15,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  // Wipe animation (for Growth category cards)
  wipe: {
    initial: { opacity: 0, scaleX: 0, transformOrigin: 'left' },
    animate: { 
      opacity: 1, 
      scaleX: 1,
      transition: {
        duration: durations.slow,
        ease: easings.aggressive,
      },
    },
    exit: { 
      opacity: 0, 
      scaleX: 0,
      transition: {
        duration: durations.fast,
        ease: easings.swiftIn,
      },
    },
  },
  
  // Signal red glow (for social icons, buttons)
  glow: {
    initial: { 
      boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)',
      scale: 1,
    },
    animate: { 
      boxShadow: '0 0 20px 2px rgba(239, 68, 68, 0.3)',
      scale: 1.05,
      transition: {
        duration: durations.fast,
        ease: easings.swiftOut,
      },
    },
    exit: { 
      boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)',
      scale: 1,
      transition: {
        duration: durations.base,
        ease: easings.smooth,
      },
    },
  },
  
  // Kinetic typography (for hero)
  kineticType: {
    initial: { 
      opacity: 0, 
      y: 40,
      rotateX: 15,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: durations.slower,
        ease: easings.aggressive,
      },
    },
  },
} as const;

// Staggered container variants
export const staggeredContainer = {
  animate: {
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: stagger.fast,
      staggerDirection: -1,
    },
  },
};

// Hover animations for interactive elements
export const hoverAnimations = {
  // Button hover
  button: {
    scale: 1.02,
    transition: {
      duration: durations.fast,
      ease: easings.swiftOut,
    },
  },
  
  // Social icon hover (subtle pulse + red glow)
  socialIcon: {
    scale: 1.1,
    boxShadow: '0 0 15px 2px rgba(239, 68, 68, 0.4)',
    transition: {
      duration: durations.fast,
      ease: easings.swiftOut,
    },
  },
  
  // Card hover
  card: {
    y: -2,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: durations.base,
      ease: easings.smooth,
    },
  },
  
  // Text hover
  text: {
    color: '#ef4444', // Signal red
    transition: {
      duration: durations.fast,
      ease: easings.swiftOut,
    },
  },
} as const;

// Focus animations (accessibility)
export const focusAnimations = {
  ring: {
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.5)', // Signal red focus ring
    transition: {
      duration: durations.instant,
      ease: easings.primary,
    },
  },
} as const;

// Utility function to get reduced motion variants
export const getReducedMotionVariant = (animation: any) => {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: durations.instant,
      },
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: durations.instant,
      },
    },
  };
};

// Motion configuration
export const motionConfig = {
  // Respect user preferences
  reducedMotion: 'user', // Uses prefers-reduced-motion
  
  // Global transition defaults
  transition: {
    duration: durations.base,
    ease: easings.primary,
  },
  
  // Performance optimizations
  layoutId: 'auto',
  animate: 'whileInView',
  viewport: { once: true, margin: '-50px' },
} as const;

// Export commonly used values
export {
  easings as easing,
  durations as duration,
  stagger,
  animations,
  hoverAnimations as hover,
};