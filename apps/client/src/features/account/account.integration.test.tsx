import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from '@app/providers/theme/store';
import i18n from '@app/providers/i18n';
import { UsersPage } from './pages/Users.page';

// Mock API
vi.mock('@features/users/api/user.api', () => ({
  fetchUser: vi.fn().mockResolvedValue({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  }),
}));

vi.mock('@monorepo/shared', () => ({
  logUser: vi.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};

describe('Users Feature Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders users page with title and description', () => {
    renderWithProviders(<UsersPage />);

    expect(screen.getByRole('heading', { name: /Users|Utilisateurs/ })).toBeInTheDocument();
    expect(screen.getByText(/Manage|Gérer/)).toBeInTheDocument();
  });

  it('displays user card component', () => {
    renderWithProviders(<UsersPage />);

    const button = screen.getByText(/Fetch Data|Récupérer/);
    expect(button).toBeInTheDocument();
  });

  it('integrates theme and i18n', () => {
    renderWithProviders(<UsersPage />);

    // Check that i18n is working
    const pageTitle = screen.getByRole('heading', { name: /Users|Utilisateurs/ });
    expect(pageTitle).toBeInTheDocument();

    // Verify page structure
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
