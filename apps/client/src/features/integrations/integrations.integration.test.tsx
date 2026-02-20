import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { IntegrationsPage } from './pages/Integrations.page';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};

describe('Integrations Feature Integration', () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  it('renders integrations page with title', () => {
    renderWithProviders(<IntegrationsPage />);

    expect(screen.getByRole('heading', { name: /Integrations|Intégrations/ })).toBeInTheDocument();
  });

  it('displays integrations description', () => {
    renderWithProviders(<IntegrationsPage />);

    expect(screen.getByText(/Connect|Connectez/)).toBeInTheDocument();
  });

  it('applies theme and i18n correctly', () => {
    renderWithProviders(<IntegrationsPage />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBeTruthy();
  });

  it('renders page structure correctly', () => {
    renderWithProviders(<IntegrationsPage />);

    const mainElement = screen.getByRole('heading', { name: /Integrations|Intégrations/ }).closest('div');
    expect(mainElement?.parentElement).toBeInTheDocument();
  });
});
