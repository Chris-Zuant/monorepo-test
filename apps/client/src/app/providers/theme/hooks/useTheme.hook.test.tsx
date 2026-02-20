import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@app/providers/theme/store';
import { useTheme } from './useTheme.hook';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useTheme hook', () => {
  it('should return initial theme state', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.currentTheme).toBeDefined();
    expect(result.current.mode).toBe('dark');
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

    expect(result.current.mode).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('light');
  });

  it('should set mode to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setMode('light');
    });

    expect(result.current.mode).toBe('light');
  });

  it('should change theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initialTheme = result.current.currentTheme.id;

    act(() => {
      result.current.setTheme('dracula');
    });

    expect(result.current.currentTheme.id).toBe('dracula');
    expect(result.current.currentTheme.id).not.toBe(initialTheme);
  });
});
