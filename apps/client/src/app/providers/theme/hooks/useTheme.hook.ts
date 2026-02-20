import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setTheme, setMode, toggleTheme } from '../store/theme.slice';

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const currentVariables = currentTheme.variants[mode];

  return {
    currentTheme,
    mode,
    currentVariables,
    setTheme: (themeId: string) => dispatch(setTheme(themeId)),
    setMode: (newMode: 'light' | 'dark') => dispatch(setMode(newMode)),
    toggleTheme: () => dispatch(toggleTheme()),
  };
};
