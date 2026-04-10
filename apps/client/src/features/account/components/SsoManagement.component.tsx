import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient } from '@/app/providers/auth';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from '@/core/shadcn/components/ui';
import {
  type OrganizationSsoProvider,
  type SsoProvidersResponse,
  SAMLTEST_DEFAULTS,
} from './organizations.types';

export function SsoManagement() {
  const { t } = useTranslation('users');
  const activeOrganizationQuery = authClient.useActiveOrganization();
  const activeOrganization = activeOrganizationQuery.data;
  const [providerId, setProviderId] = useState(SAMLTEST_DEFAULTS.providerId);
  const [providerIssuer, setProviderIssuer] = useState(SAMLTEST_DEFAULTS.issuer);
  const [providerDomain, setProviderDomain] = useState(SAMLTEST_DEFAULTS.domain);
  const [providerEntryPoint, setProviderEntryPoint] = useState(SAMLTEST_DEFAULTS.entryPoint);
  const [providerCallbackUrl, setProviderCallbackUrl] = useState(SAMLTEST_DEFAULTS.callbackUrl);
  const [providerAudience, setProviderAudience] = useState(SAMLTEST_DEFAULTS.audience);
  const [providerCertificate, setProviderCertificate] = useState('');
  const [providerMetadataXml, setProviderMetadataXml] = useState('');
  const [isRegisteringProvider, setIsRegisteringProvider] = useState(false);
  const [isRefreshingProviders, setIsRefreshingProviders] = useState(false);
  const [ssoProviders, setSsoProviders] = useState<OrganizationSsoProvider[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSsoProviders = async () => {
    setIsRefreshingProviders(true);

    try {
      const response = (await authClient.$fetch('/sso/providers', {
        method: 'GET',
      })) as SsoProvidersResponse;

      const providers = Array.isArray(response?.providers) ? response.providers : [];
      setSsoProviders(
        activeOrganization?.id
          ? providers.filter(
              (provider: OrganizationSsoProvider) => provider.organizationId === activeOrganization.id
            )
          : providers
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.ssoLoad'));
    } finally {
      setIsRefreshingProviders(false);
    }
  };

  useEffect(() => {
    loadSsoProviders();
  }, [activeOrganization?.id]);

  const applySamltestDefaults = () => {
    setProviderId(SAMLTEST_DEFAULTS.providerId);
    setProviderIssuer(SAMLTEST_DEFAULTS.issuer);
    setProviderDomain(SAMLTEST_DEFAULTS.domain);
    setProviderEntryPoint(SAMLTEST_DEFAULTS.entryPoint);
    setProviderCallbackUrl(SAMLTEST_DEFAULTS.callbackUrl);
    setProviderAudience(SAMLTEST_DEFAULTS.audience);
  };

  const handleRegisterSsoProvider = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsRegisteringProvider(true);

    try {
      await authClient.$fetch('/sso/register', {
        method: 'POST',
        body: {
          providerId: providerId.trim(),
          issuer: providerIssuer.trim(),
          domain: providerDomain.trim(),
          organizationId: activeOrganization?.id,
          samlConfig: {
            entryPoint: providerEntryPoint.trim(),
            cert: providerCertificate.trim(),
            callbackUrl: providerCallbackUrl.trim(),
            audience: providerAudience.trim() || undefined,
            idpMetadata: providerMetadataXml.trim()
              ? {
                  metadata: providerMetadataXml.trim(),
                }
              : undefined,
            spMetadata: {},
            mapping: {
              id: 'nameID',
              email: 'email',
              name: 'displayName',
              firstName: 'firstName',
              lastName: 'lastName',
            },
          },
        },
      });

      await loadSsoProviders();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.ssoRegister'));
    } finally {
      setIsRegisteringProvider(false);
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <Card className="border-destructive/30 bg-destructive/10">
          <CardContent className="pt-4 text-sm text-destructive">{errorMessage}</CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <CardTitle>{t('users.organizations.sso.title')}</CardTitle>
            <CardDescription>
              {activeOrganization
                ? t('users.organizations.sso.descriptionActive', {
                    organization: activeOrganization.name,
                  })
                : t('users.organizations.sso.descriptionInactive')}
            </CardDescription>
          </div>
          <div className="justify-self-start sm:justify-self-end">
            <Button type="button" variant="outline" onClick={applySamltestDefaults}>
              {t('users.organizations.sso.useSamltestDefaults')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegisterSsoProvider}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.sso.fields.providerId')}
                </label>
                <Input
                  value={providerId}
                  onChange={(event) => setProviderId(event.target.value)}
                  placeholder={t('users.organizations.placeholders.providerId')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.sso.fields.domain')}
                </label>
                <Input
                  value={providerDomain}
                  onChange={(event) => setProviderDomain(event.target.value)}
                  placeholder={t('users.organizations.placeholders.providerDomain')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.issuer')}
              </label>
              <Input
                value={providerIssuer}
                onChange={(event) => setProviderIssuer(event.target.value)}
                placeholder={t('users.organizations.placeholders.providerIssuer')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.entryPoint')}
              </label>
              <Input
                value={providerEntryPoint}
                onChange={(event) => setProviderEntryPoint(event.target.value)}
                placeholder={t('users.organizations.placeholders.providerEntryPoint')}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.sso.fields.callbackUrl')}
                </label>
                <Input
                  value={providerCallbackUrl}
                  onChange={(event) => setProviderCallbackUrl(event.target.value)}
                  placeholder={t('users.organizations.placeholders.providerCallbackUrl')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.sso.fields.audience')}
                </label>
                <Input
                  value={providerAudience}
                  onChange={(event) => setProviderAudience(event.target.value)}
                  placeholder={t('users.organizations.placeholders.providerAudience')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.certificate')}
              </label>
              <Textarea
                value={providerCertificate}
                onChange={(event) => setProviderCertificate(event.target.value)}
                placeholder={t('users.organizations.placeholders.providerCertificate')}
                className="min-h-28"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.metadataXml')}
              </label>
              <Textarea
                value={providerMetadataXml}
                onChange={(event) => setProviderMetadataXml(event.target.value)}
                placeholder={t('users.organizations.placeholders.providerMetadataXml')}
                className="min-h-40"
              />
              <p className="text-xs text-muted-foreground">
                {t('users.organizations.sso.fields.metadataHint')}
              </p>
            </div>

            <Button
              type="submit"
              disabled={
                isRegisteringProvider ||
                !activeOrganization?.id ||
                providerId.trim().length === 0 ||
                providerDomain.trim().length === 0 ||
                providerIssuer.trim().length === 0 ||
                providerEntryPoint.trim().length === 0 ||
                providerCallbackUrl.trim().length === 0 ||
                providerCertificate.trim().length === 0
              }
            >
              {isRegisteringProvider
                ? t('users.organizations.sso.submitting')
                : t('users.organizations.sso.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>{t('users.organizations.sso.registeredTitle')}</CardTitle>
              <CardDescription>{t('users.organizations.sso.registeredDescription')}</CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={loadSsoProviders} disabled={isRefreshingProviders}>
              {isRefreshingProviders ? t('users.loading') : t('users.organizations.refresh')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {ssoProviders.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('users.organizations.sso.empty')}</p>
          ) : (
            <div className="space-y-3">
              {ssoProviders.map((provider) => (
                <Card key={provider.id ?? provider.providerId} size="sm">
                  <CardContent className="space-y-1 pt-3 text-sm">
                    <p>
                      <span className="font-medium">{t('users.organizations.sso.fields.providerId')}:</span>{' '}
                      {provider.providerId}
                    </p>
                    <p>
                      <span className="font-medium">{t('users.organizations.sso.fields.type')}:</span>{' '}
                      {provider.type ?? t('users.organizations.sso.defaults.type')}
                    </p>
                    <p>
                      <span className="font-medium">{t('users.organizations.sso.fields.domain')}:</span>{' '}
                      {provider.domain}
                    </p>
                    <p>
                      <span className="font-medium">{t('users.organizations.sso.fields.issuer')}:</span>{' '}
                      {provider.issuer}
                    </p>
                    {provider.spMetadataUrl ? (
                      <p className="break-all">
                        <span className="font-medium">
                          {t('users.organizations.sso.fields.spMetadataUrl')}:
                        </span>{' '}
                        <a
                          className="text-primary underline"
                          href={provider.spMetadataUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {provider.spMetadataUrl}
                        </a>
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
