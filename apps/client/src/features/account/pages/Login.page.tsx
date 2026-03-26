import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authClient } from '@/app/providers/auth';
import { Button } from '@/core/shadcn/components/ui/Button.component';
import { Input } from '@/core/shadcn/components/ui/Input.component';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
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

  useEffect(() => {
    if (sessionData?.session && sessionData.user) {
      const nextPath = (location.state as { from?: string } | null)?.from ?? '/users';
      navigate(nextPath, { replace: true });
    }
  }, [location.state, navigate, sessionData]);

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
          setErrorMessage(result.error.message ?? 'Unable to create account');
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          setErrorMessage(result.error.message ?? 'Unable to sign in');
          return;
        }
      }

      navigate('/users', { replace: true });
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
        callbackURL: `${window.location.origin}/integrations`,
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? 'Unable to sign in with Google');
        setIsGoogleSubmitting(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in with Google');
      setIsGoogleSubmitting(false);
    }
  };

  if (isPending) {
    return <div className="p-6 text-sm text-muted-foreground">Loading session...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-card-foreground">
            {mode === 'sign-in' ? 'Sign in' : 'Create account'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'sign-in'
              ? 'Use your email and password to access the app.'
              : 'Create a simple account to get started.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'sign-up' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
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
                ? 'Signing in...'
                : 'Creating account...'
              : mode === 'sign-in'
                ? 'Sign in'
                : 'Create account'}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
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
          {isGoogleSubmitting ? 'Redirecting to Google...' : 'Continue with Google'}
        </Button>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'sign-in' ? 'Need an account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            className="font-medium text-foreground underline underline-offset-4"
            onClick={() => {
              setMode((current) => (current === 'sign-in' ? 'sign-up' : 'sign-in'));
              setErrorMessage(null);
            }}
          >
            {mode === 'sign-in' ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
