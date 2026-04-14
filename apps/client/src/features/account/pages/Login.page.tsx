import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { authClient } from '@/app/providers/auth';
import { Button } from '@/core/shadcn/components/ui/Button.component';
import { Input } from '@/core/shadcn/components/ui/Input.component';
import { Building2, Chrome } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation('users');
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sessionData, isPending } = authClient.useSession();
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const callbackURL = (location.state as { from?: string } | null)?.from ?? '/users';

  useEffect(() => {
    if (sessionData?.session && sessionData.user) {
      navigate(callbackURL, { replace: true });
    }
  }, [callbackURL, navigate, sessionData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'sign-up') {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        if (result.error) {
          setErrorMessage(result.error.message ?? t('users.login.errors.createAccount'));
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          setErrorMessage(result.error.message ?? t('users.login.errors.signIn'));
          return;
        }
      }

      navigate(callbackURL, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsGoogleSubmitting(true);

    try {
      const result = await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}${callbackURL}`,
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? t('users.login.errors.google'));
        setIsGoogleSubmitting(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.login.errors.google'));
      setIsGoogleSubmitting(false);
    }
  };

  if (isPending) {
    return <div className="p-6 text-sm text-muted-foreground">{t('users.login.loadingSession')}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-card-foreground">
            {mode === 'sign-in' ? t('users.login.signInTitle') : t('users.login.signUpTitle')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'sign-in'
              ? t('users.login.signInDescription')
              : t('users.login.signUpDescription')}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'sign-up' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('users.name')}</label>
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t('users.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t('users.login.password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {errorMessage ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting ||
              isGoogleSubmitting ||
              email.trim().length === 0 ||
              password.trim().length === 0 ||
              (mode === 'sign-up' && name.trim().length === 0)
            }
          >
            {isSubmitting
              ? mode === 'sign-in'
                ? t('users.login.signingIn')
                : t('users.login.creatingAccount')
              : mode === 'sign-in'
                ? t('users.login.signInAction')
                : t('users.login.signUpAction')}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{t('users.login.or')}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          disabled={isSubmitting || isGoogleSubmitting}
          onClick={handleGoogleSignIn}
        >
          <Chrome className="size-4" />
          {isGoogleSubmitting ? t('users.login.redirectingGoogle') : t('users.login.continueGoogle')}
        </Button>

        <div className="mt-4 space-y-3 rounded-xl border border-border bg-muted/40 p-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">{t('users.login.workSsoTitle')}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {t('users.login.workSsoLaunchDescription')}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            disabled={isSubmitting || isGoogleSubmitting}
            onClick={() => navigate('/login/sso', { state: { from: callbackURL } })}
          >
            <Building2 className="size-4" />
            {t('users.login.openWorkSso')}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'sign-in' ? t('users.login.needAccount') : t('users.login.haveAccount')}{' '}
          <button
            type="button"
            className="font-medium text-foreground underline underline-offset-4"
            onClick={() => {
              setMode((current) => (current === 'sign-in' ? 'sign-up' : 'sign-in'));
              setErrorMessage(null);
            }}
          >
            {mode === 'sign-in' ? t('users.login.createOne') : t('users.login.signInAction')}
          </button>
        </div>
      </div>
    </div>
  );
}
