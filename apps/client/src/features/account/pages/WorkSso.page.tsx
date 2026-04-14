import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Fingerprint } from 'lucide-react';
import { authClient } from '@/app/providers/auth';
import { Button, Input } from '@/core/shadcn/components/ui';

export default function WorkSsoPage() {
  const { t } = useTranslation('users');
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sessionData, isPending } = authClient.useSession();
  const [identifier, setIdentifier] = useState('');
  const [providerId, setProviderId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isIdentifierSubmitting, setIsIdentifierSubmitting] = useState(false);
  const [isProviderSubmitting, setIsProviderSubmitting] = useState(false);

  const callbackURL = (location.state as { from?: string } | null)?.from ?? '/users';

  useEffect(() => {
    if (sessionData?.session && sessionData.user) {
      navigate(callbackURL, { replace: true });
    }
  }, [callbackURL, navigate, sessionData]);

  const handleIdentifierSignIn = async () => {
    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      return;
    }

    setErrorMessage(null);
    setIsIdentifierSubmitting(true);

    try {
      const result = await authClient.signIn.sso(
        trimmedIdentifier.includes('@')
          ? {
              email: trimmedIdentifier,
              callbackURL: `${window.location.origin}${callbackURL}`,
            }
          : {
              organizationSlug: trimmedIdentifier,
              callbackURL: `${window.location.origin}${callbackURL}`,
            }
      );

      if (result.error) {
        setErrorMessage(result.error.message ?? t('users.login.errors.sso'));
        setIsIdentifierSubmitting(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.login.errors.sso'));
      setIsIdentifierSubmitting(false);
    }
  };

  const handleProviderSignIn = async () => {
    const trimmedProviderId = providerId.trim();

    if (!trimmedProviderId) {
      return;
    }

    setErrorMessage(null);
    setIsProviderSubmitting(true);

    try {
      const result = await authClient.signIn.sso({
        providerId: trimmedProviderId,
        callbackURL: `${window.location.origin}${callbackURL}`,
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? t('users.login.errors.sso'));
        setIsProviderSubmitting(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.login.errors.sso'));
      setIsProviderSubmitting(false);
    }
  };

  if (isPending) {
    return <div className="p-6 text-sm text-muted-foreground">{t('users.login.loadingSession')}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-card-foreground">
              {t('users.login.workSsoPageTitle')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('users.login.workSsoPageDescription')}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => navigate('/login', { state: { from: callbackURL } })}
            aria-label={t('users.login.backToLogin')}
          >
            <ArrowLeft className="size-4" />
          </Button>
        </div>

        {errorMessage ? (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}

        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">{t('users.login.workSsoTitle')}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('users.login.workSsoDescription')}
              </p>
            </div>
            <Input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder={t('users.login.workSsoPlaceholder')}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              disabled={isIdentifierSubmitting || isProviderSubmitting || identifier.trim().length === 0}
              onClick={handleIdentifierSignIn}
            >
              <Building2 className="size-4" />
              {isIdentifierSubmitting ? t('users.login.redirectingSso') : t('users.login.continueSso')}
            </Button>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">
                {t('users.login.providerSsoTitle')}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('users.login.providerSsoDescription')}
              </p>
            </div>
            <Input
              value={providerId}
              onChange={(event) => setProviderId(event.target.value)}
              placeholder={t('users.login.providerSsoPlaceholder')}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              disabled={isIdentifierSubmitting || isProviderSubmitting || providerId.trim().length === 0}
              onClick={handleProviderSignIn}
            >
              <Fingerprint className="size-4" />
              {isProviderSubmitting
                ? t('users.login.redirectingProviderSso')
                : t('users.login.continueProviderSso')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
