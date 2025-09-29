# GR3YM4TT3R Theme System Usage Guide

## Overview

The GR3YM4TT3R theme system implements a comprehensive design token architecture with dark/light mode support, built on CSS custom properties and integrated with Tailwind CSS.

## Architecture

### Design Tokens
- **Colors**: Semantic color system with CSS variables
- **Typography**: Modular scale with Inter (UI) + Cinzel (display)  
- **Spacing**: 4px base rhythm with semantic spacing scales
- **Motion**: Smooth but aggressive animation system with accessibility support

### Theme Implementation
- **Default**: Dark theme by default
- **Switching**: Class-based theme switching (`dark`/`light` classes)
- **Persistence**: localStorage with fallback to system preference
- **SSR Safe**: No hydration mismatches or FOUC

## Usage

### Theme Provider
```tsx
import { ThemeProvider } from '../src/design-system/utilities/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Theme Toggle
```tsx
import { ThemeToggle } from '../src/design-system/utilities/ThemeProvider';

function Header() {
  return (
    <header>
      <ThemeToggle showLabel />
    </header>
  );
}
```

### Using Theme Hook
```tsx
import { useTheme } from '../src/design-system/utilities/ThemeProvider';

function Component() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## CSS Variables

### Semantic Colors
```css
/* Text colors */
var(--color-text-primary)     /* Primary text color */
var(--color-text-secondary)   /* Secondary text color */
var(--color-text-tertiary)    /* Tertiary text color */
var(--color-text-accent)      /* Signal red accent */

/* Background colors */
var(--color-bg-primary)       /* Main background */
var(--color-bg-secondary)     /* Card/panel backgrounds */
var(--color-bg-tertiary)      /* Elevated surfaces */

/* Border colors */
var(--color-border-primary)   /* Default borders */
var(--color-border-accent)    /* Signal red borders */
```

### Typography Variables
```css
var(--font-family-sans)       /* Inter - UI text */
var(--font-family-display)    /* Cinzel - headings */
var(--font-family-mono)       /* JetBrains Mono - code */
```

### Spacing Variables
```css
var(--spacing-4)              /* 16px - base unit */
var(--spacing-6)              /* 24px */
var(--spacing-8)              /* 32px */
/* Full scale available in theme-vars.css */
```

## Tailwind Integration

### Semantic Classes
```html
<!-- Colors -->
<div class="bg-primary text-primary border-primary">
<div class="bg-secondary text-secondary border-accent">

<!-- Typography -->
<h1 class="font-display text-4xl">Display Heading</h1>
<p class="font-sans text-base">Body text</p>
<code class="font-mono text-sm">Code snippet</code>
```

### Dark Mode Classes
```html
<!-- Automatically switches with theme -->
<div class="bg-white dark:bg-gray-900">
<p class="text-gray-900 dark:text-gray-100">
```

## Security Features

### CSP Compliance
- No external font CSS imports (uses next/font)
- No unsafe inline scripts (removed dangerouslySetInnerHTML)
- Theme initialization runs safely in useEffect

### Safe Theme Switching
- Input validation on theme values
- Safe DOM manipulation with classList API
- Error boundaries around localStorage operations

## Accessibility

### Motion Preferences
- Respects `prefers-reduced-motion`
- Durations automatically reduced for motion-sensitive users
- All animations respect user preferences

### Color Contrast
- WCAG 2.1 AA compliant color ratios
- High contrast mode support
- Clear focus indicators with signal red accents

### Focus Management
- Visible focus rings on all interactive elements  
- Skip links for keyboard navigation
- Proper tab order and focus trapping

## Performance

### Optimization Features
- CSS custom properties for instant theme switching
- Minimal JavaScript footprint
- No layout shift during theme initialization
- Efficient re-renders with React context

### Bundle Size
- Theme system adds ~2KB to bundle
- CSS variables reduce duplicate styles
- Tree-shaking compatible exports

## Browser Support

### Modern Browsers
- CSS custom properties (all modern browsers)
- prefers-color-scheme (IE not supported)
- CSS Grid and Flexbox

### Graceful Degradation
- Falls back to dark theme in unsupported browsers
- Core functionality works without JavaScript
- Progressive enhancement for advanced features

## Demo

Visit `/theme-demo` to see all design tokens and theme switching in action.

## Extending the System

### Adding New Colors
1. Add CSS variables to `theme-vars.css`
2. Export from `colors.ts` token file  
3. Add to Tailwind config if needed

### Custom Components
```tsx
import { useTheme } from '../design-system/utilities/ThemeProvider';

function CustomComponent() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div 
      className="p-4"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)'
      }}
    >
      Current theme: {resolvedTheme}
    </div>
  );
}
```

## Troubleshooting

### Theme Not Switching
- Check ThemeProvider wraps your app
- Verify CSS variables are loaded
- Check browser console for errors

### FOUC (Flash of Unstyled Content)
- Theme Provider includes mounted state
- HTML has default dark class
- CSS variables provide immediate styling

### TypeScript Errors
- Import types: `import { Theme } from '../design-system/utilities/ThemeProvider'`
- Use provided theme types for consistency