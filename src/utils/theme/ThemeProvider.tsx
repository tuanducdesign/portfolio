import { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export const ThemeProvider = (props: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // @ts-expect-error idk why TypeScript doesn't know this attribute 🤷🏼‍♂️
    document.documentElement.style['color-scheme'] = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const handlePreferColorSchemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    darkMode.addEventListener('change', handlePreferColorSchemeChange);
    return () => {
      darkMode.removeEventListener('change', handlePreferColorSchemeChange);
    };
  }, []);

  const toggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    theme,
    toggle,
  };

  return <ThemeContext.Provider {...props} value={value} />;
};
