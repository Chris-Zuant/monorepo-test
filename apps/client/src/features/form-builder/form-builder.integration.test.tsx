import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    expect(screen.getByRole('heading', { name: /Forms|Formulaires/ })).toBeInTheDocument();
  });

  it('applies theme and i18n correctly', () => {
    renderWithProviders(<FormBuilderPage />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBeTruthy();
  });

  it('renders page structure correctly', () => {
    renderWithProviders(<FormBuilderPage />);

    const mainElement = screen.getByRole('heading', { name: /Forms|Formulaires/ }).closest('div');
    expect(mainElement?.parentElement).toBeInTheDocument();
  });

  it('shows a new form button and search bar', () => {
    renderWithProviders(<FormBuilderPage />);

    expect(screen.getByRole('button', { name: /New Form|Nouveau formulaire/ })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search forms/)).toBeInTheDocument();
  });

  it('filters the form cards based on search input', async () => {
    renderWithProviders(<FormBuilderPage />);

    const search = screen.getByPlaceholderText(/Search forms/);
    await userEvent.type(search, 'Survey');

    expect(screen.getByText(/Survey Form/)).toBeInTheDocument();
    // the other two should be absent
    expect(screen.queryByText(/Event Registration/)).toBeNull();
    expect(screen.queryByText(/Customer Feedback/)).toBeNull();
  });

  it('opens create form dialog when new form button is clicked', async () => {
    renderWithProviders(<FormBuilderPage />);

    const newFormButton = screen.getByRole('button', { name: /New Form|Nouveau formulaire/ });
    await userEvent.click(newFormButton);

    expect(screen.getByText(/Create New Form|Créer un nouveau formulaire/)).toBeInTheDocument();
    expect(screen.getByText(/From Scratch|À partir de zéro/)).toBeInTheDocument();
    expect(screen.getByText(/Clone Existing|Cloner existant/)).toBeInTheDocument();
  });

  it('shows form templates in the from scratch tab', async () => {
    renderWithProviders(<FormBuilderPage />);

    const newFormButton = screen.getByRole('button', { name: /New Form|Nouveau formulaire/ });
    await userEvent.click(newFormButton);

    // Wait for dialog to open
    const dialogTitle = await screen.findByText(/Create New Form|Créer un nouveau formulaire/);
    expect(dialogTitle).toBeInTheDocument();

    // Check that template cards are present (look for unique template descriptions)
    expect(screen.getByText('Start with a completely empty form')).toBeInTheDocument();
    expect(screen.getByText('Collect contact information and messages')).toBeInTheDocument();
    expect(screen.getByText('Register attendees for events')).toBeInTheDocument();
    expect(screen.getByText('Create polls and gather feedback')).toBeInTheDocument();
  });

  it('renders at least one form card with in-progress badge', () => {
    renderWithProviders(<FormBuilderPage />);

    const badges = screen.getAllByText(/In progress|En cours/);
    expect(badges.length).toBeGreaterThan(0);
  });
});
