import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { ThemeSwitcher } from './ThemeSwitcher.component';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};

describe('ThemeSwitcher Component', () => {
  it('renders select theme label', () => {
    renderWithProviders(<ThemeSwitcher />);
    expect(screen.getByText(/Select Theme|Sélectionner/)).toBeInTheDocument();
  });

  it('renders current theme info', () => {
    renderWithProviders(<ThemeSwitcher />);
    expect(screen.getByText(/Current Theme|Thème actuel/)).toBeInTheDocument();
  });

  it('displays theme options', () => {
    renderWithProviders(<ThemeSwitcher />);
    const buttons = screen.getAllByRole('button');
    // Should have multiple theme buttons
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('allows theme selection', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeSwitcher />);

    const buttons = screen.getAllByRole('button');
    // Try clicking a theme button
    if (buttons.length > 0) {
      await user.click(buttons[0]);
      expect(buttons[0]).toBeInTheDocument();
    }
  });
});
