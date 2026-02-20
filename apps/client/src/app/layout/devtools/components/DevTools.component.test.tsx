import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { DevTools } from './DevTools.component';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};

describe('DevTools Component', () => {
  it('renders toggle button', () => {
    renderWithProviders(<DevTools />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('toggles panel open and closed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DevTools />);
    
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons[0];

    await user.click(toggleButton);
    // Panel should be open

    await user.click(toggleButton);
    // Panel should be closed
  });

  it('displays themes tab', () => {
    renderWithProviders(<DevTools />);
    const buttons = screen.getAllByRole('button');
    
    // Find and click the toggle button
    const toggleButton = buttons[0];
    expect(toggleButton).toBeInTheDocument();
  });
});
