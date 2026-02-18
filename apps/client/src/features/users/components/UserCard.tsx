import React, { useState } from 'react';
import type { User } from '@monorepo/shared';
import { fetchUser as apiFetchUser } from '../api/userApi';
import { logUser } from '@monorepo/shared';

const UserCard: React.FC = () => {
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
        setError('No data in response');
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'fetching...' : 'fetch data'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user && (
        <div>
          <p>Fetched: {user.name} ({user.email})</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
