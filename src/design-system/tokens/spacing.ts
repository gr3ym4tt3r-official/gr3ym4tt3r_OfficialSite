/**
 * GR3YM4TT3R Spacing & Layout System
 * 
 * 4px base rhythm with 12-column fluid grid
 * Max-width 1440px with generous gutters
 */

// Base spacing unit (4px rhythm)
const baseUnit = 4;

// Spacing scale using 4px base
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px - base unit
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// Semantic spacing for specific use cases
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    base: spacing[4],  // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
  
  // Layout spacing
  layout: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    base: spacing[8],  // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
    '2xl': spacing[20], // 80px
    '3xl': spacing[24], // 96px
    '4xl': spacing[32], // 128px
  },
  
  // Section spacing
  section: {
    xs: spacing[16],   // 64px
    sm: spacing[20],   // 80px
    base: spacing[24], // 96px
    lg: spacing[32],   // 128px
    xl: spacing[40],   // 160px
    '2xl': spacing[48], // 192px
    '3xl': spacing[60], // 240px
  },
} as const;

// Grid system (12-column fluid)
export const grid = {
  // Container settings
  container: {
    maxWidth: '1440px',
    padding: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8],  // 32px
    },
  },
  
  // Column system
  columns: 12,
  
  // Gutters (generous as specified)
  gutter: {
    mobile: spacing[4],    // 16px
    tablet: spacing[6],    // 24px
    desktop: spacing[8],   // 32px
  },
  
  // Breakpoints (following TailwindCSS conventions)
  breakpoints: {
    sm: '640px',   // Small devices
    md: '768px',   // Tablets
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px', // Extra large
  },
} as const;

// Layout utilities
export const layout = {
  // Common max widths
  maxWidth: {
    xs: '20rem',     // 320px
    sm: '24rem',     // 384px
    md: '28rem',     // 448px
    lg: '32rem',     // 512px
    xl: '36rem',     // 576px
    '2xl': '42rem',  // 672px
    '3xl': '48rem',  // 768px
    '4xl': '56rem',  // 896px
    '5xl': '64rem',  // 1024px
    '6xl': '72rem',  // 1152px
    '7xl': '80rem',  // 1280px
    full: '100%',
    prose: '65ch',   // Optimal reading width
    container: grid.container.maxWidth,
  },
  
  // Common aspect ratios
  aspectRatio: {
    square: '1/1',
    video: '16/9',
    photo: '4/3',
    portrait: '3/4',
    ultrawide: '21/9',
    golden: '1.618/1',
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
} as const;

// Border radius following 4px rhythm
export const borderRadius = {
  none: '0px',
  sm: spacing[1],    // 4px
  base: spacing[2],  // 8px
  md: spacing[3],    // 12px
  lg: spacing[4],    // 16px
  xl: spacing[5],    // 20px
  '2xl': spacing[6], // 24px
  '3xl': spacing[8], // 32px
  full: '9999px',
} as const;

// Border widths
export const borderWidth = {
  0: '0px',
  default: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// Shadows (subtle, following dark theme)
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.15)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)',
  
  // Signal red shadows for accents
  accent: {
    sm: '0 1px 2px 0 rgba(239, 68, 68, 0.25)',
    base: '0 4px 6px -1px rgba(239, 68, 68, 0.25), 0 2px 4px -1px rgba(239, 68, 68, 0.15)',
    md: '0 10px 15px -3px rgba(239, 68, 68, 0.25), 0 4px 6px -2px rgba(239, 68, 68, 0.15)',
    lg: '0 20px 25px -5px rgba(239, 68, 68, 0.25), 0 10px 10px -5px rgba(239, 68, 68, 0.15)',
  },
} as const;

// Utility functions
export const getSpacing = (value: keyof typeof spacing) => spacing[value];
export const getSemanticSpacing = (category: keyof typeof semanticSpacing, size: string) => {
  const categorySpacing = semanticSpacing[category] as any;
  return categorySpacing[size] || null;
};

// Export individual token groups
export { spacing as space };