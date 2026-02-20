import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { Header } from './Header.component';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          {component}
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  it('renders header with logo', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Monorepo/)).toBeInTheDocument();
  });

  it('displays search input', () => {
    renderWithProviders(<Header />);
    expect(screen.getByPlaceholderText(/Search|Rechercher/)).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithProviders(<Header />);
    const themeButton = screen.getByRole('button', { name: /Toggle|Basculer/ });
    expect(themeButton).toBeInTheDocument();
  });

  it('renders features dropdown', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Features|Fonctionnalités/)).toBeInTheDocument();
  });

  it('renders language selector', () => {
    renderWithProviders(<Header />);
    const languageButton = screen.getByText(/EN|FR/);
    expect(languageButton).toBeInTheDocument();
  });

  it('handles search input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const searchInput = screen.getByPlaceholderText(/Search|Rechercher/);

    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
  });
});
