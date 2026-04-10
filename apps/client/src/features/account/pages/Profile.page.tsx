import { useTranslation } from 'react-i18next';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/core/shadcn/components/ui';
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
        <Card>
          <CardHeader>
            <CardTitle>{t('users.profile.details')}</CardTitle>
          </CardHeader>
          <CardContent>

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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('users.profile.authMethods')}</CardTitle>
          </CardHeader>
          <CardContent>

          {isAuthMethodsPending ? (
            <p className="text-sm text-muted-foreground">{t('users.loading')}</p>
          ) : authMethodsError ? (
            <p className="text-sm text-destructive">{t('users.errorFetching')}</p>
          ) : authMethods.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('users.profile.noAuthMethods')}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {authMethods.map((method) => (
                <Badge
                  key={method}
                  variant="outline"
                  className="px-3 py-1 capitalize"
                >
                  {method === 'credential' ? 'email/password' : method}
                </Badge>
              ))}
            </div>
          )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
