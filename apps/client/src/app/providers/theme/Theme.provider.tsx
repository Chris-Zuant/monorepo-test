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
    
    // Apply all CSS variables from the current theme variant.
    // Use the optional `priority` argument to force !important so that
    // changes always win over any rules defined in imported stylesheets
    // (including Tailwind's generated :root defaults).  This is the
    // core fix for "themeProvider not overwriting default root themes".
    Object.entries(currentVariables).forEach(([_category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(key, value as string, 'important');
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
