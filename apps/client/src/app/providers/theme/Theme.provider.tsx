import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const currentVariables = currentTheme.variants[mode];

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    // Apply all CSS variables from the current theme variant
    Object.entries(currentVariables).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    });

    // Apply dark mode class for dark theme
    if (mode === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Store preference in localStorage
    localStorage.setItem('theme-id', currentTheme.id);
    localStorage.setItem('theme-mode', mode);
  }, [currentTheme, mode, currentVariables]);

  return <>{children}</>;
};
