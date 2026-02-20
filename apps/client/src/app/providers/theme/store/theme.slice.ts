import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ThemeVariables {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

export type ThemeMode = 'light' | 'dark';

export interface ThemeVariant {
  light: ThemeVariables;
  dark: ThemeVariables;
}

export interface Theme {
  id: string;
  name: string;
  variants: ThemeVariant;
}

const commonFonts = {
  '--font-primary': 'system-ui, -apple-system, sans-serif',
  '--font-secondary': 'Georgia, serif',
  '--font-mono': 'SFMono-Regular, Consolas, monospace',
};

const commonSpacing = {
  '--space-xs': '0.25rem',
  '--space-sm': '0.5rem',
  '--space-md': '1rem',
  '--space-lg': '1.5rem',
  '--space-xl': '3rem',
};

const commonBreakpoints = {
  '--breakpoint-sm': '576px',
  '--breakpoint-md': '768px',
  '--breakpoint-lg': '992px',
  '--breakpoint-xl': '1200px',
};

// Nord Theme (Default)
export const highContrastTheme: Theme = {
  id: 'high-contrast',
  name: 'High Contrast',
  variants: {
    light: {
      colors: {
        '--primary-color': '#0000ff',
        '--secondary-color': '#000000',
        '--success-color': '#008000',
        '--danger-color': '#ff0000',
        '--warning-color': '#ff8800',
        '--info-color': '#0088ff',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f0f0f0',
        '--bg-card': '#ffffff',
        '--text-primary': '#000000',
        '--text-secondary': '#0000ff',
        '--text-muted': '#333333',
        '--border-color': '#000000',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
    dark: {
      colors: {
        '--primary-color': '#0000ff',
        '--secondary-color': '#ffff00',
        '--success-color': '#00ff00',
        '--danger-color': '#ff0000',
        '--warning-color': '#ffff00',
        '--info-color': '#00ffff',
        '--bg-primary': '#000000',
        '--bg-secondary': '#1a1a1a',
        '--bg-card': '#000000',
        '--text-primary': '#ffffff',
        '--text-secondary': '#ffff00',
        '--text-muted': '#cccccc',
        '--border-color': '#ffff00',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
  },
};

// Dracula Theme
export const draculaTheme: Theme = {
  id: 'dracula',
  name: 'Dracula',
  variants: {
    light: {
      colors: {
        '--primary-color': '#e74c8c',
        '--secondary-color': '#6272a4',
        '--success-color': '#50fa7b',
        '--danger-color': '#ff5555',
        '--warning-color': '#ffb86c',
        '--info-color': '#8be9fd',
        '--bg-primary': '#f8f8f2',
        '--bg-secondary': '#f1f1f0',
        '--bg-card': '#ffffff',
        '--text-primary': '#282a36',
        '--text-secondary': '#a66ba6',
        '--text-muted': '#6272a4',
        '--border-color': '#e8e8e8',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
    dark: {
      colors: {
        '--primary-color': '#ff79c6',
        '--secondary-color': '#6272a4',
        '--success-color': '#50fa7b',
        '--danger-color': '#ff5555',
        '--warning-color': '#ffb86c',
        '--info-color': '#8be9fd',
        '--bg-primary': '#282a36',
        '--bg-secondary': '#44475a',
        '--bg-card': '#3d3f47',
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#bd93f9',
        '--text-muted': '#6272a4',
        '--border-color': '#44475a',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
  },
};

// Nord Theme
export const nordTheme: Theme = {
  id: 'nord',
  name: 'Nord',
  variants: {
    light: {
      colors: {
        '--primary-color': '#5e81ac',
        '--secondary-color': '#81a1c1',
        '--success-color': '#a3be8c',
        '--danger-color': '#bf616a',
        '--warning-color': '#ebcb8b',
        '--info-color': '#81a1c1',
        '--bg-primary': '#eceff4',
        '--bg-secondary': '#e5e9f0',
        '--bg-card': '#ffffff',
        '--text-primary': '#2e3440',
        '--text-secondary': '#3b4252',
        '--text-muted': '#4c566a',
        '--border-color': '#d8dee9',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
    dark: {
      colors: {
        '--primary-color': '#88c0d0',
        '--secondary-color': '#81a1c1',
        '--success-color': '#a3be8c',
        '--danger-color': '#bf616a',
        '--warning-color': '#ebcb8b',
        '--info-color': '#81a1c1',
        '--bg-primary': '#2e3440',
        '--bg-secondary': '#3b4252',
        '--bg-card': '#434c5e',
        '--text-primary': '#eceff4',
        '--text-secondary': '#d8dee9',
        '--text-muted': '#4c566a',
        '--border-color': '#4c566a',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
  },
};

// Solarized Theme
export const solarizedTheme: Theme = {
  id: 'solarized',
  name: 'Solarized',
  variants: {
    light: {
      colors: {
        '--primary-color': '#268bd2',
        '--secondary-color': '#2aa198',
        '--success-color': '#859900',
        '--danger-color': '#dc322f',
        '--warning-color': '#b58900',
        '--info-color': '#2aa198',
        '--bg-primary': '#fdf6e3',
        '--bg-secondary': '#eee8d5',
        '--bg-card': '#ffffff',
        '--text-primary': '#002b36',
        '--text-secondary': '#586e75',
        '--text-muted': '#93a1a1',
        '--border-color': '#d6d0c8',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
    dark: {
      colors: {
        '--primary-color': '#268bd2',
        '--secondary-color': '#2aa198',
        '--success-color': '#859900',
        '--danger-color': '#dc322f',
        '--warning-color': '#b58900',
        '--info-color': '#2aa198',
        '--bg-primary': '#002b36',
        '--bg-secondary': '#073642',
        '--bg-card': '#586e75',
        '--text-primary': '#fdf6e3',
        '--text-secondary': '#93a1a1',
        '--text-muted': '#657b83',
        '--border-color': '#586e75',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
  },
};

// Catppuccin Theme
export const catppuccinTheme: Theme = {
  id: 'catppuccin',
  name: 'Catppuccin',
  variants: {
    light: {
      colors: {
        '--primary-color': '#1e66f5',
        '--secondary-color': '#179299',
        '--success-color': '#40a02b',
        '--danger-color': '#d20f39',
        '--warning-color': '#df8e1d',
        '--info-color': '#04a5e5',
        '--bg-primary': '#eff1f5',
        '--bg-secondary': '#e6e9f0',
        '--bg-card': '#ffffff',
        '--text-primary': '#4c4f69',
        '--text-secondary': '#6c6f85',
        '--text-muted': '#8c8fa1',
        '--border-color': '#bcc0cc',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
    dark: {
      colors: {
        '--primary-color': '#89dceb',
        '--secondary-color': '#94e2d5',
        '--success-color': '#a6e3a1',
        '--danger-color': '#f38ba8',
        '--warning-color': '#f9e2af',
        '--info-color': '#89dceb',
        '--bg-primary': '#1e1e2e',
        '--bg-secondary': '#313244',
        '--bg-card': '#45475a',
        '--text-primary': '#cdd6f4',
        '--text-secondary': '#a6adc8',
        '--text-muted': '#6c7086',
        '--border-color': '#45475a',
      },
      fonts: commonFonts,
      spacing: commonSpacing,
      breakpoints: commonBreakpoints,
    },
  },
};

export const AVAILABLE_THEMES: Theme[] = [
  highContrastTheme,
  draculaTheme,
  nordTheme,
  solarizedTheme,
  catppuccinTheme,
];

interface ThemeState {
  currentTheme: Theme;
  mode: ThemeMode;
}

const initialState: ThemeState = {
  currentTheme: nordTheme,
  mode: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const theme = AVAILABLE_THEMES.find((t) => t.id === action.payload);
      if (theme) {
        state.currentTheme = theme;
      }
    },
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setTheme, setMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
