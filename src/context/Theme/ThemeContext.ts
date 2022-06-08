import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("'useTheme' must be called inside ThemeProvider");
  }
  return context;
};
