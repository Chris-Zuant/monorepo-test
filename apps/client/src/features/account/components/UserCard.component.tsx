import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUsersQuery } from '../hooks';

const UserCard: React.FC = () => {
  const { t } = useTranslation('users');
  const { data: users = [], isPending, error } = useUsersQuery();

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {isPending ? <p className="text-sm text-muted-foreground">{t('users.fetching')}</p> : null}
      {error ? <p className="text-sm text-destructive">{t('users.errorFetching')}</p> : null}
      {!isPending && !error && users.length > 0 ? (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-border bg-background p-4 text-sm">
              <p><span className="font-medium">{t('users.name')}:</span> {user.name}</p>
              <p><span className="font-medium">{t('users.email')}:</span> {user.email}</p>
            </div>
          ))}
        </div>
      ) : null}
      {!isPending && !error && users.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('users.noData')}</p>
      ) : null}
    </div>
  );
};

export default UserCard;
