import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { User } from '@monorepo/shared';
import { fetchUser as apiFetchUser } from '@/features/account/api/user.api';
import { logUser } from '@monorepo/shared';

const UserCard: React.FC = () => {
  const { t } = useTranslation('users');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const u = await apiFetchUser();
      if (u) {
        logUser(u);
        setUser(u);
      } else {
        setError(t('users.noData'));
      }
    } catch (err: any) {
      setError(`${t('users.errorFetching')}: ${err?.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? t('users.fetching') : t('users.fetchData')}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user && (
        <div>
          <p>{t('users.name')}: {user.name}</p>
          <p>{t('users.email')}: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
