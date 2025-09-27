/**
 * GR3YM4TT3R Design System Tokens
 * 
 * Central export for all design tokens
 * Dark theme with greyscale + Signal Red accent system
 */

// Export all token categories
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './motion';

// Re-export commonly used tokens for convenience
export { colors, dark, light } from './colors';
export { typography, fontFamilies, fontSizes } from './typography';
export { spacing, semanticSpacing, grid, layout } from './spacing';
export { animations, easings, durations, hoverAnimations } from './motion';

// Design system metadata
export const designSystem = {
  name: 'GR3YM4TT3R',
  version: '1.0.0',
  description: 'Modern, masculine, stoic brand design system with cinematic motion',
  
  // Core principles
  principles: {
    theme: 'Dark by default with light accent lines',
    palette: 'Greyscale with strategic Signal Red accents',
    typography: 'Modern grotesk (Inter) + Classical display (Cinzel)',
    motion: 'Smooth but aggressive - fast start, clean settle',
    rhythm: '4px base unit for consistent spacing',
    grid: '12-column fluid with generous gutters',
  },
  
  // Theme configuration
  defaultTheme: 'dark' as const,
  supportedThemes: ['dark', 'light'] as const,
  
  // Brand colors (quick reference)
  brand: {
    primary: '#ef4444',    // Signal Red 500
    accent: '#dc2626',     // Signal Red 600
    neutral: '#0a0a0a',    // Neutral 950 (dark bg)
    surface: '#171717',    // Neutral 900 (dark surface)
  },
} as const;

// Utility type for theme values
export type Theme = 'dark' | 'light';

// Utility type for design tokens
export type DesignTokens = {
  colors: typeof import('./colors').colors;
  typography: typeof import('./typography').typography;
  spacing: typeof import('./spacing').spacing;
};