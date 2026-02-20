import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import App from '../App.component.tsx';

const renderWithProviders = (component: React.ReactElement) =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </Provider>
  );

describe('App integration', () => {
  it('renders main layout and navigation elements', () => {
    renderWithProviders(<App />);

    // Header should render with app title
    expect(screen.getByText(/Monorepo/)).toBeInTheDocument();

    // There should be a theme toggle button (use title to avoid ambiguous matches)
    expect(screen.getByTitle(/Toggle theme mode|Basculer/)).toBeInTheDocument();
  });
});
