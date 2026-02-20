import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '@app/providers/i18n';
import UserCard from './UserCard.component';

// Mock the API
vi.mock('@features/users/api/user.api', () => ({
  fetchUser: vi.fn(),
}));

vi.mock('@monorepo/shared', () => ({
  logUser: vi.fn(),
}));

describe('UserCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithI18n = (component: React.ReactElement) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  it('renders fetch data button', () => {
    renderWithI18n(<UserCard />);
    expect(screen.getByText(/Fetch Data|Récupérer/)).toBeInTheDocument();
  });

  it('button is enabled initially', () => {
    renderWithI18n(<UserCard />);
    const button = screen.getByText(/Fetch Data|Récupérer/);
    expect(button).not.toBeDisabled();
  });

  it('shows error message when no data is returned', async () => {
    const { fetchUser } = await import('@/features/account/api/user.api');
    vi.mocked(fetchUser).mockResolvedValue(null);
    const user = userEvent.setup();

    renderWithI18n(<UserCard />);
    const button = screen.getByText(/Fetch Data|Récupérer/);
    
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Error|no data/i)).toBeInTheDocument();
    });
  });
});
