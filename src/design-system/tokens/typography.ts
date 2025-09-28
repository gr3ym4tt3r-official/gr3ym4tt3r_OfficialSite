/**
 * GR3YM4TT3R Typography System
 * 
 * Modern grotesk for UI (Inter) + Classical display for headings (Cinzel)
 * Modular scale with 4px base rhythm
 */

// Font families (Google Fonts)
const fontFamilies = {
  // Modern grotesk for UI text
  sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  
  // Classical display for headings
  display: ['Cinzel', 'serif'],
  
  // Monospace for code (fallback to system)
  mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
} as const;

// Modular scale (4px base rhythm)
// Using 1.25 ratio (major third) for harmonious scaling
const scaleRatio = 1.25;
const baseSize = 16; // 16px base

const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px - base size
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px
  '9xl': '8rem',    // 128px
} as const;

// Line heights following 4px rhythm
const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  // Specific values for rhythm
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '7': '1.75rem',   // 28px
  '8': '2rem',      // 32px
  '9': '2.25rem',   // 36px
  '10': '2.5rem',   // 40px
} as const;

// Font weights
const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// Letter spacing for better readability
const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Typography scale definitions
export const typography = {
  // Display headings (Cinzel) - for major headings and hero text
  display: {
    '2xl': {
      fontSize: fontSizes['8xl'],
      fontFamily: fontFamilies.display,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.tighter,
    },
    xl: {
      fontSize: fontSizes['7xl'],
      fontFamily: fontFamilies.display,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tighter,
    },
    lg: {
      fontSize: fontSizes['6xl'],
      fontFamily: fontFamilies.display,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tight,
    },
    base: {
      fontSize: fontSizes['5xl'],
      fontFamily: fontFamilies.display,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.tight,
    },
    sm: {
      fontSize: fontSizes['4xl'],
      fontFamily: fontFamilies.display,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Headings (Inter) - for section headings and UI
  heading: {
    '2xl': {
      fontSize: fontSizes['4xl'],
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tight,
    },
    xl: {
      fontSize: fontSizes['3xl'],
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tight,
    },
    lg: {
      fontSize: fontSizes['2xl'],
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
    base: {
      fontSize: fontSizes.xl,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Body text (Inter) - for content and UI text
  body: {
    xl: {
      fontSize: fontSizes.xl,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.relaxed,
      letterSpacing: letterSpacing.normal,
    },
    lg: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.relaxed,
      letterSpacing: letterSpacing.normal,
    },
    base: {
      fontSize: fontSizes.base,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    xs: {
      fontSize: fontSizes.xs,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.wide,
    },
  },
  
  // UI elements - buttons, labels, etc.
  ui: {
    button: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.wide,
      textTransform: 'uppercase' as const,
    },
    label: {
      fontSize: fontSizes.xs,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.widest,
      textTransform: 'uppercase' as const,
    },
    caption: {
      fontSize: fontSizes.xs,
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Code and monospace
  code: {
    inline: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.mono,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
    },
    block: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.mono,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.relaxed,
    },
  },
} as const;

// Google Fonts import URLs
export const googleFontsUrls = [
  // Inter with selected weights
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  // Cinzel with selected weights
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap',
  // JetBrains Mono for code (optional)
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
];

// Utility function to get typography styles
export const getTypographyStyle = (category: keyof typeof typography, variant: string) => {
  const styles = typography[category as keyof typeof typography];
  return (styles as any)[variant] || null;
};

// Export individual token groups
export { 
  fontFamilies, 
  fontSizes, 
  lineHeights, 
  fontWeights, 
  letterSpacing 
};