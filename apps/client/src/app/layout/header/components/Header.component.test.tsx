import { describe, it, expect } from 'vitest';
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

  it('displays search input when enabled', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    
    // Search should not be visible initially
    expect(screen.queryByPlaceholderText(/Search|Rechercher/)).not.toBeInTheDocument();
    
    // Click the search toggle button
    const searchToggle = screen.getByRole('button', { name: /Toggle search|Basculer la recherche/ });
    await user.click(searchToggle);
    
    // Now search should be visible
    expect(screen.getByPlaceholderText(/Search|Rechercher/)).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithProviders(<Header />);
    // Look for button containing sun or moon icon by finding buttons with SVG children
    const buttons = screen.getAllByRole('button');
    const themeButton = buttons.find(button => button.querySelector('svg'));
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

  it('handles search input when enabled', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    
    // Click the search toggle button
    const searchToggle = screen.getByRole('button', { name: /Toggle search|Basculer la recherche/ });
    await user.click(searchToggle);
    
    const searchInput = screen.getByPlaceholderText(/Search|Rechercher/);

    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
  });
});
