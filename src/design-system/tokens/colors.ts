/**
 * GR3YM4TT3R Color System
 * 
 * Greyscale (true neutral + warm steel) with strategic Signal Red
 * Dark by default with minor light lines/dividers
 */

export const colors = {
  // Signal Red - Strategic accent color
  signal: {
    50: '#fef2f2',   // Lightest red for backgrounds
    100: '#fee2e2',  // Light red for subtle highlights
    200: '#fecaca',  // 
    300: '#fca5a5',  // 
    400: '#f87171',  // 
    500: '#ef4444',  // Primary Signal Red
    600: '#dc2626',  // Darker red for interactions
    700: '#b91c1c',  // 
    800: '#991b1b',  // 
    900: '#7f1d1d',  // Deepest red
    950: '#450a0a',  // Almost black red
  },

  // Greyscale - True neutral base
  neutral: {
    0: '#ffffff',    // Pure white (rare use)
    50: '#fafafa',   // Off white
    100: '#f5f5f5',  // Lightest grey
    150: '#eeeeee',  // 
    200: '#e5e5e5',  // Light grey for dividers
    300: '#d4d4d4',  // 
    400: '#a3a3a3',  // Medium grey for secondary text
    500: '#737373',  // Mid grey for body text (light mode)
    600: '#525252',  // 
    700: '#404040',  // Dark grey
    800: '#262626',  // Very dark grey
    850: '#1f1f1f',  // 
    900: '#171717',  // Near black
    925: '#0f0f0f',  // 
    950: '#0a0a0a',  // Almost black
    975: '#050505',  // Deepest black
  },

  // Warm Steel - Specialized greyscale with warm undertones
  steel: {
    50: '#fafaf9',   // Warm off-white
    100: '#f5f5f4',  // Warm light grey
    200: '#e7e5e4',  // Warm divider grey
    300: '#d6d3d1',  // 
    400: '#a8a29e',  // Warm medium grey
    500: '#78716c',  // Warm body text
    600: '#57534e',  // 
    700: '#44403c',  // Warm dark grey
    800: '#292524',  // Warm very dark
    850: '#1c1917',  // 
    900: '#0c0a09',  // Warm near black
  },

  // Semantic colors for UI states
  semantic: {
    success: '#10b981',    // Green
    warning: '#f59e0b',    // Amber
    error: '#ef4444',      // Signal red
    info: '#3b82f6',       // Blue
  },

  // Theme-specific color assignments
  dark: {
    // Background colors (dark theme default)
    bg: {
      primary: '#0a0a0a',      // neutral.950 - Main background
      secondary: '#171717',    // neutral.900 - Card/panel backgrounds
      tertiary: '#262626',     // neutral.800 - Elevated surfaces
      inverse: '#fafafa',      // neutral.50 - Light backgrounds when needed
    },
    
    // Text colors
    text: {
      primary: '#fafafa',      // neutral.50 - Primary text
      secondary: '#a3a3a3',    // neutral.400 - Secondary text
      tertiary: '#737373',     // neutral.500 - Tertiary text
      inverse: '#171717',      // neutral.900 - Text on light backgrounds
      accent: '#ef4444',       // signal.500 - Signal red text
    },
    
    // Border colors
    border: {
      primary: '#262626',      // neutral.800 - Default borders
      secondary: '#404040',    // neutral.700 - Stronger borders
      accent: '#ef4444',       // signal.500 - Accent borders
      subtle: '#1f1f1f',       // neutral.850 - Subtle dividers
    },
    
    // Interactive states
    interactive: {
      hover: '#1f1f1f',        // neutral.850 - Hover backgrounds
      active: '#262626',       // neutral.800 - Active states
      focus: '#ef4444',        // signal.500 - Focus rings
      disabled: '#404040',     // neutral.700 - Disabled states
    }
  },

  light: {
    // Background colors (light theme - secondary)
    bg: {
      primary: '#ffffff',      // Pure white - Main background
      secondary: '#fafafa',    // neutral.50 - Card backgrounds
      tertiary: '#f5f5f5',     // neutral.100 - Elevated surfaces
      inverse: '#0a0a0a',      // neutral.950 - Dark backgrounds when needed
    },
    
    // Text colors
    text: {
      primary: '#171717',      // neutral.900 - Primary text
      secondary: '#525252',    // neutral.600 - Secondary text
      tertiary: '#737373',     // neutral.500 - Tertiary text
      inverse: '#fafafa',      // neutral.50 - Text on dark backgrounds
      accent: '#dc2626',       // signal.600 - Signal red text (darker for contrast)
    },
    
    // Border colors
    border: {
      primary: '#e5e5e5',      // neutral.200 - Default borders
      secondary: '#d4d4d4',    // neutral.300 - Stronger borders
      accent: '#ef4444',       // signal.500 - Accent borders
      subtle: '#f5f5f5',       // neutral.100 - Subtle dividers
    },
    
    // Interactive states
    interactive: {
      hover: '#f5f5f5',        // neutral.100 - Hover backgrounds
      active: '#e5e5e5',       // neutral.200 - Active states
      focus: '#ef4444',        // signal.500 - Focus rings
      disabled: '#d4d4d4',     // neutral.300 - Disabled states
    }
  }
} as const;

// Color utility functions
export const getColorValue = (path: string, theme: 'dark' | 'light' = 'dark') => {
  const parts = path.split('.');
  let value: any = colors;
  
  for (const part of parts) {
    value = value[part];
    if (!value) return null;
  }
  
  return value;
};

// Export individual color scales for easier access
export const { signal, neutral, steel, semantic, dark, light } = colors;