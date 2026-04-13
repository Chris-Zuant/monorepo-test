import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient } from '@/app/providers/auth';
import { API_URL } from '@/app/config';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@/core/shadcn/components/ui';
import {
  type OrganizationSsoProvider,
  type SsoProviderPreset,
  type SsoProvidersResponse,
  OKTA_DEFAULTS,
  SAMLTEST_DEFAULTS,
} from '../models/organizations.types';
import { SamlMetadataAutofill, type ParsedSamlMetadataValues } from './SamlMetadataAutofill.component';

type SetupKind = 'samltest' | 'okta';

interface SetupFormProps {
  preset: SsoProviderPreset;
  setupKind: SetupKind;
  activeOrganizationId?: string;
  onRegistered: () => Promise<void>;
}

function SsoProviderSetupForm({
  preset,
  setupKind,
  activeOrganizationId,
  onRegistered,
}: SetupFormProps) {
  const { t } = useTranslation('users');
  const [providerId, setProviderId] = useState(preset.providerId);
  const [serviceProviderEntityId, setServiceProviderEntityId] = useState(preset.issuer);
  const [identityProviderEntityId, setIdentityProviderEntityId] = useState('');
  const [providerDomain, setProviderDomain] = useState(preset.domain);
  const [providerEntryPoint, setProviderEntryPoint] = useState(preset.entryPoint);
  const [providerCallbackUrl, setProviderCallbackUrl] = useState(preset.callbackUrl);
  const [providerAudience, setProviderAudience] = useState(preset.audience);
  const [providerCertificate, setProviderCertificate] = useState('');
  const [providerMetadataXml, setProviderMetadataXml] = useState('');
  const [isRegisteringProvider, setIsRegisteringProvider] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setProviderId(preset.providerId);
    setServiceProviderEntityId(preset.issuer);
    setIdentityProviderEntityId('');
    setProviderDomain(preset.domain);
    setProviderEntryPoint(preset.entryPoint);
    setProviderCallbackUrl(preset.callbackUrl);
    setProviderAudience(preset.audience);
    setProviderCertificate('');
    setProviderMetadataXml('');
    setErrorMessage(null);
  }, [preset]);

  const normalizedProviderId = providerId.trim();
  const assertionConsumerServiceUrl = normalizedProviderId
    ? `${API_URL}/api/auth/sso/saml2/sp/acs/${encodeURIComponent(normalizedProviderId)}`
    : '';
  const spMetadataUrl = normalizedProviderId
    ? `${API_URL}/api/auth/sso/saml2/sp/metadata?providerId=${encodeURIComponent(normalizedProviderId)}`
    : '';

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsRegisteringProvider(true);

    try {
      await authClient.$fetch('/sso/register', {
        method: 'POST',
        body: {
          providerId: normalizedProviderId,
          issuer: serviceProviderEntityId.trim(),
          domain: providerDomain.trim(),
          organizationId: activeOrganizationId,
          samlConfig: {
            entryPoint: providerEntryPoint.trim(),
            cert: providerCertificate.trim(),
            callbackUrl: providerCallbackUrl.trim(),
            audience: providerAudience.trim() || undefined,
            idpMetadata: providerMetadataXml.trim()
              ? {
                  metadata: providerMetadataXml.trim(),
                  entityID: identityProviderEntityId.trim() || undefined,
                }
              : identityProviderEntityId.trim()
                ? {
                    entityID: identityProviderEntityId.trim(),
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

      await onRegistered();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.ssoRegister'));
    } finally {
      setIsRegisteringProvider(false);
    }
  };

  const handleMetadataParsed = ({
    metadataXml,
    providerDomain: parsedDomain,
    providerEntryPoint: parsedEntryPoint,
    identityProviderEntityId: parsedIdentityProviderEntityId,
    providerCertificate: parsedCertificate,
  }: ParsedSamlMetadataValues) => {
    setProviderMetadataXml(metadataXml);
    setProviderDomain(parsedDomain);
    setProviderEntryPoint(parsedEntryPoint);
    setIdentityProviderEntityId(parsedIdentityProviderEntityId);
    setProviderCertificate(parsedCertificate);
  };

  return (
    <div className="space-y-4">
      {errorMessage ? (
        <Card className="border-destructive/30 bg-destructive/10">
          <CardContent className="pt-4 text-sm text-destructive">{errorMessage}</CardContent>
        </Card>
      ) : null}

      <div>
        <h3 className="text-base font-semibold text-foreground">
          {t(`users.organizations.sso.setups.${setupKind}.title`)}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(`users.organizations.sso.setups.${setupKind}.description`)}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t('users.organizations.sso.fields.providerId')}
            </label>
            <Input value={providerId} onChange={(event) => setProviderId(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t('users.organizations.sso.fields.domain')}
            </label>
            <Input
              value={providerDomain}
              onChange={(event) => setProviderDomain(event.target.value)}
              placeholder={t(
                setupKind === 'okta'
                  ? 'users.organizations.placeholders.oktaDomain'
                  : 'users.organizations.placeholders.providerDomain'
              )}
            />
            <p className="text-xs text-muted-foreground">
              {t('users.organizations.sso.fields.domainHelp')}
            </p>
          </div>
        </div>

        <Card size="sm" className="bg-muted/40">
          <CardHeader>
            <CardTitle className="text-sm">{t('users.organizations.sso.sp.title')}</CardTitle>
            <CardDescription>{t('users.organizations.sso.sp.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.acsUrl')}
              </label>
              <Input value={assertionConsumerServiceUrl} readOnly />
              <p className="text-xs text-muted-foreground">
                {t('users.organizations.sso.fields.acsUrlHelp')}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.spEntityId')}
              </label>
              <Input
                value={serviceProviderEntityId}
                onChange={(event) => setServiceProviderEntityId(event.target.value)}
                placeholder={t('users.organizations.placeholders.providerAudience')}
              />
              <p className="text-xs text-muted-foreground">
                {t('users.organizations.sso.fields.spEntityIdHelp')}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('users.organizations.sso.fields.spMetadataUrl')}
              </label>
              <Input value={spMetadataUrl} readOnly />
              <p className="text-xs text-muted-foreground">
                {t('users.organizations.sso.fields.spMetadataUrlHelp')}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t('users.organizations.sso.fields.entryPoint')}
          </label>
          <Input
            value={providerEntryPoint}
            onChange={(event) => setProviderEntryPoint(event.target.value)}
            placeholder={t(
              setupKind === 'okta'
                ? 'users.organizations.placeholders.oktaEntryPoint'
                : 'users.organizations.placeholders.providerEntryPoint'
            )}
          />
          <p className="text-xs text-muted-foreground">
            {t('users.organizations.sso.fields.entryPointHelp')}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t('users.organizations.sso.fields.idpIssuer')}
          </label>
          <Input
            value={identityProviderEntityId}
            onChange={(event) => setIdentityProviderEntityId(event.target.value)}
            placeholder={t(
              setupKind === 'okta'
                ? 'users.organizations.placeholders.oktaIssuer'
                : 'users.organizations.placeholders.providerIssuer'
            )}
          />
          <p className="text-xs text-muted-foreground">
            {t('users.organizations.sso.fields.idpIssuerHelp')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t('users.organizations.sso.fields.appCallbackPath')}
            </label>
            <Input
              value={providerCallbackUrl}
              onChange={(event) => setProviderCallbackUrl(event.target.value)}
              placeholder={t('users.organizations.placeholders.providerCallbackUrl')}
            />
            <p className="text-xs text-muted-foreground">
              {t('users.organizations.sso.fields.appCallbackPathHelp')}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t('users.organizations.sso.fields.idpAudience')}
            </label>
            <Input
              value={providerAudience}
              onChange={(event) => setProviderAudience(event.target.value)}
              placeholder={t('users.organizations.placeholders.providerAudience')}
            />
            <p className="text-xs text-muted-foreground">
              {t('users.organizations.sso.fields.idpAudienceHelp')}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t('users.organizations.sso.fields.certificate')}
          </label>
          <Textarea
            value={providerCertificate}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setProviderCertificate(event.target.value)
            }
            placeholder={t('users.organizations.placeholders.providerCertificate')}
            className="min-h-28"
          />
          <p className="text-xs text-muted-foreground">
            {t('users.organizations.sso.fields.certificateHelp')}
          </p>
        </div>

        <SamlMetadataAutofill
          value={providerMetadataXml}
          placeholder={t('users.organizations.placeholders.providerMetadataXml')}
          hintKey={preset.metadataHintKey}
          onChange={setProviderMetadataXml}
          onParsed={handleMetadataParsed}
        />

        <Button
          type="submit"
          disabled={
            isRegisteringProvider ||
            !activeOrganizationId ||
            normalizedProviderId.length === 0 ||
            providerDomain.trim().length === 0 ||
            serviceProviderEntityId.trim().length === 0 ||
            providerEntryPoint.trim().length === 0 ||
            providerCallbackUrl.trim().length === 0 ||
            providerCertificate.trim().length === 0
          }
        >
          {isRegisteringProvider ? t('users.organizations.sso.submitting') : t('users.organizations.sso.submit')}
        </Button>
      </form>
    </div>
  );
}

export function SsoSetupDialog() {
  const { t } = useTranslation('users');
  const activeOrganizationQuery = authClient.useActiveOrganization();
  const activeOrganization = activeOrganizationQuery.data;
  const [open, setOpen] = useState(false);
  const [activeSetup, setActiveSetup] = useState<SetupKind>('samltest');
  const [isRefreshingProviders, setIsRefreshingProviders] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ssoProviders, setSsoProviders] = useState<OrganizationSsoProvider[]>([]);

  const presets = useMemo(
    () => ({
      samltest: SAMLTEST_DEFAULTS,
      okta: OKTA_DEFAULTS,
    }),
    []
  );

  const loadSsoProviders = async () => {
    setIsRefreshingProviders(true);

    try {
      const response = (await authClient.$fetch('/sso/providers', {
        method: 'GET',
      })) as SsoProvidersResponse;

      const providers = Array.isArray(response?.providers) ? response.providers : [];
      setSsoProviders(
        activeOrganization?.id
          ? providers.filter((provider) => provider.organizationId === activeOrganization.id)
          : providers
      );
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.ssoLoad'));
    } finally {
      setIsRefreshingProviders(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadSsoProviders();
    }
  }, [open, activeOrganization?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        {t('users.organizations.sso.openDialog')}
      </Button>

      <DialogContent
        className="max-h-[90vh] sm:max-w-[90vw] p-0 gap-0 flex"
        showCloseButton
      >
        <DialogHeader className="border-b border-border px-6 py-5 absolute h-21 w-full">
          <DialogTitle>{t('users.organizations.sso.dialogTitle')}</DialogTitle>
          <DialogDescription>
            {activeOrganization
              ? t('users.organizations.sso.descriptionActive', { organization: activeOrganization.name })
              : t('users.organizations.sso.descriptionInactive')}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeSetup}
          onValueChange={(value) => setActiveSetup(value as SetupKind)}
          orientation="vertical"
          className="min-w-0 flex-1 flex min-h-0 mt-21"
        >
          <div className="h-full w-48 border-b border-border bg-muted/30 p-4 md:border-r md:border-b-0">
            <TabsList
              variant="line"
              className="flex flex-col gap-2 bg-transparent p-0"
            >
              <TabsTrigger value="samltest" className="justify-start px-3 py-2">
                {t('users.organizations.sso.setups.samltest.tab')}
              </TabsTrigger>
              <TabsTrigger value="okta" className="justify-start px-3 py-2">
                {t('users.organizations.sso.setups.okta.tab')}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-w-0 min-h-0 space-y-6 overflow-y-auto flex-1 p-6">
            {errorMessage ? (
              <Card className="border-destructive/30 bg-destructive/10">
                <CardContent className="pt-4 text-sm text-destructive">{errorMessage}</CardContent>
              </Card>
            ) : null}

            <TabsContent value="samltest" className="mt-0 outline-none">
              <SsoProviderSetupForm
                preset={presets.samltest}
                setupKind="samltest"
                activeOrganizationId={activeOrganization?.id}
                onRegistered={loadSsoProviders}
              />
            </TabsContent>

            <TabsContent value="okta" className="mt-0 outline-none">
              <SsoProviderSetupForm
                preset={presets.okta}
                setupKind="okta"
                activeOrganizationId={activeOrganization?.id}
                onRegistered={loadSsoProviders}
              />
            </TabsContent>

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
                            <span className="font-medium">{t('users.organizations.sso.fields.spEntityId')}:</span>{' '}
                            {provider.issuer}
                          </p>
                          {provider.spMetadataUrl ? (
                            <p className="break-all">
                              <span className="font-medium">
                                {t('users.organizations.sso.fields.spMetadataUrl')}:
                              </span>{' '}
                              <a className="text-primary underline" href={provider.spMetadataUrl} target="_blank" rel="noreferrer">
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
