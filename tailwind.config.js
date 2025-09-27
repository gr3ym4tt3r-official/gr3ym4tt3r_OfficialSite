/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GR3YM4TT3R Brand Colors - Dark monochrome with surgical red accents
        'signal-red': {
          500: '#DC2626', // Main red
          600: '#B91C1C', // Darker red for hovers
        },
        'grey': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        'warm-steel': {
          100: '#F7F7F6',
          200: '#EFEEEC',
          300: '#E7E5E2',
          400: '#D7D4D0',
          500: '#B8B4AE',
          600: '#9A958D',
          700: '#7C776C',
          800: '#5E594B',
          900: '#403B2A',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Modern grotesk for UI
        'display': ['Cinzel', 'serif'], // Classical display for headings
      },
      spacing: {
        // 4px base rhythm
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      maxWidth: {
        '8xl': '1440px', // Max container width from PRD
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}