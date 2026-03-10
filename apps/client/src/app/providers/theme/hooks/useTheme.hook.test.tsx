import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@app/providers/theme/store';
import { useTheme } from './useTheme.hook';
import { AVAILABLE_THEMES, setMode, setTheme } from '../store/theme.slice';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useTheme hook', () => {
  beforeEach(() => {
    store.dispatch(setTheme('bumblebee'));
    store.dispatch(setMode('light'));
  });

  it('should return initial theme state', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.currentTheme).toBeDefined();
    expect(result.current.currentTheme.id).toBe('bumblebee');
    expect(result.current.mode).toBe('light');
    expect(result.current.currentVariables).toBeDefined();
  });

  it('should have theme methods available', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(typeof result.current.setTheme).toBe('function');
    expect(typeof result.current.setMode).toBe('function');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should toggle between light and dark mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.mode).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('dark');
  });

  it('should set mode to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setMode('light');
    });

    expect(result.current.mode).toBe('light');
  });

  it('should change theme for all available theme ids', () => {
    const themeIds = AVAILABLE_THEMES.map((theme) => theme.id);

    themeIds.forEach((themeId) => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme(themeId);
      });

      expect(result.current.currentTheme.id).toBe(themeId);
      expect(result.current.currentVariables).toBeDefined();
    });
  });
});
