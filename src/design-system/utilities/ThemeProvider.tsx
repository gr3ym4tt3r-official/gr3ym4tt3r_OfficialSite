/**
 * Theme Provider
 * 
 * Manages theme state and provides theme context to components
 * Dark theme by default, respects user preferences
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { designSystem } from '../tokens';
import { initializeTheme } from './theme-init';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Get system theme preference
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Get stored theme or default
const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  if (typeof window === 'undefined') return defaultTheme;
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && ['dark', 'light', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return defaultTheme;
};

// Apply theme to document
const applyTheme = (theme: 'dark' | 'light') => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove('theme-dark', 'theme-light', 'dark', 'light');
  
  // Add new theme classes (both for CSS variables and Tailwind)
  root.classList.add(`theme-${theme}`, theme);
  
  // Set data attribute for CSS
  root.setAttribute('data-theme', theme);
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }
};

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark',
  storageKey = 'gr3ym4tt3r-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => 
    getStoredTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme safely on mount
  useEffect(() => {
    const initialTheme = initializeTheme();
    setResolvedTheme(initialTheme);
    setMounted(true);
  }, []);

  // Update resolved theme based on current theme
  useEffect(() => {
    if (!mounted) return;
    
    const newResolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      applyTheme(newResolvedTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    setThemeState(newTheme);
  };

  // Toggle between dark and light (ignores system)
  const toggleTheme = () => {
    const currentResolved = theme === 'system' ? resolvedTheme : theme;
    setTheme(currentResolved === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Higher-order component for theme-aware components
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: 'dark' | 'light' }>
) {
  const ThemedComponent = (props: P) => {
    const { resolvedTheme } = useTheme();
    return <Component {...props} theme={resolvedTheme} />;
  };
  
  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
}

// Theme toggle button component
interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      style={{
        background: 'none',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-text-primary)',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.125rem' }}>
        {resolvedTheme === 'dark' ? '🌙' : '☀️'}
      </span>
      {showLabel && (
        <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
          {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}