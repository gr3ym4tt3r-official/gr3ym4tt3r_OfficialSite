/**
 * Safe theme initialization script
 * No eval, no dangerouslySetInnerHTML - executed in useEffect
 */

export const initializeTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';

  try {
    // Get stored theme preference
    const stored = localStorage.getItem('gr3ym4tt3r-theme') || 'dark';
    
    // Validate theme value
    const validThemes = ['dark', 'light', 'system'];
    const theme = validThemes.includes(stored) ? stored : 'dark';
    
    // Resolve system theme if needed
    const resolvedTheme: 'dark' | 'light' = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme as 'dark' | 'light';
    
    // Apply theme classes safely
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'dark', 'light');
    root.classList.add(`theme-${resolvedTheme}`, resolvedTheme);
    root.setAttribute('data-theme', resolvedTheme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
    
    return resolvedTheme;
  } catch (error) {
    console.warn('Theme initialization failed:', error);
    return 'dark';
  }
};