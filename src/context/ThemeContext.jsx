import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => localStorage.getItem('portfolio-mode') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-color-theme', 'space');
    root.setAttribute('data-theme', mode === 'light' ? 'light' : 'space');
    localStorage.setItem('portfolio-mode', mode);
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next === 'light' ? 'light' : 'dark');
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = {
    mode,
    setMode,
    toggleMode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
