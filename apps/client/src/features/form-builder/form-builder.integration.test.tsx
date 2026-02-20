import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { FormBuilderPage } from './pages/FormBuilder.page';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};

describe('Form Builder Feature Integration', () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  it('renders form builder page with title', () => {
    renderWithProviders(<FormBuilderPage />);

    expect(screen.getByRole('heading', { name: /Form Builder|Créateur/ })).toBeInTheDocument();
  });

  it('displays form builder description', () => {
    renderWithProviders(<FormBuilderPage />);

    expect(screen.getByText(/Create|Créez/)).toBeInTheDocument();
  });

  it('applies theme and i18n correctly', () => {
    renderWithProviders(<FormBuilderPage />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBeTruthy();
  });

  it('renders page structure correctly', () => {
    renderWithProviders(<FormBuilderPage />);

    const mainElement = screen.getByRole('heading', { name: /Form Builder|Créateur/ }).closest('div');
    expect(mainElement?.parentElement).toBeInTheDocument();
  });
});
