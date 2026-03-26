import { useTranslation } from 'react-i18next';
import { useAuthMethodsQuery, useUserQuery } from '../hooks';

export default function ProfilePage() {
  const { t } = useTranslation('users');
  const { data: user, isPending: isUserPending, error: userError } = useUserQuery();
  const {
    data: authMethods = [],
    isPending: isAuthMethodsPending,
    error: authMethodsError,
  } = useAuthMethodsQuery();

  return (
    <div className="w-full p-6">
      <h1 className="mb-2 text-3xl font-bold">{t('users.profile.page.title')}</h1>
      <p className="mb-6 text-muted-foreground">{t('users.profile.page.description')}</p>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">{t('users.profile.details')}</h2>

          {isUserPending ? <p className="text-sm text-muted-foreground">{t('users.loading')}</p> : null}
          {userError ? <p className="text-sm text-destructive">{t('users.errorFetching')}</p> : null}

          {user ? (
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">{t('users.name')}:</span> {user.name}
              </div>
              <div>
                <span className="font-medium">{t('users.email')}:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">{t('users.profile.createdAt')}:</span>{' '}
                {new Date(user.createdAt).toLocaleString()}
              </div>
            </div>
          ) : null}
        </section>

        <aside className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">{t('users.profile.authMethods')}</h2>

          {isAuthMethodsPending ? (
            <p className="text-sm text-muted-foreground">{t('users.loading')}</p>
          ) : authMethodsError ? (
            <p className="text-sm text-destructive">{t('users.errorFetching')}</p>
          ) : authMethods.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('users.profile.noAuthMethods')}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {authMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium capitalize"
                >
                  {method === 'credential' ? 'email/password' : method}
                </span>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
