import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authClient } from '@/app/providers/auth';
import { Button, Input } from '@/core/shadcn/components/ui';

interface OrganizationInvitation {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  organizationId?: string;
  organizationName?: string;
  organization?: {
    id?: string;
    name?: string;
    slug?: string;
  };
}

export default function OrganizationsPage() {
  const { t } = useTranslation('users');
  const organizationsQuery = authClient.useListOrganizations();
  const activeOrganizationQuery = authClient.useActiveOrganization();
  const [organizationName, setOrganizationName] = useState('');
  const [organizationSlug, setOrganizationSlug] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [isCreatingOrganization, setIsCreatingOrganization] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [isRefreshingInvitations, setIsRefreshingInvitations] = useState(false);
  const [receivedInvitations, setReceivedInvitations] = useState<OrganizationInvitation[]>([]);
  const [organizationInvitations, setOrganizationInvitations] = useState<OrganizationInvitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeOrganization = activeOrganizationQuery.data;
  const organizations = organizationsQuery.data ?? [];

  const loadInvitations = async () => {
    setIsRefreshingInvitations(true);

    try {
      const [sentResponse, receivedResponse] = await Promise.all([
        authClient.$fetch<OrganizationInvitation[]>('/organization/list-invitations', {
          method: 'GET',
        }),
        authClient.$fetch<OrganizationInvitation[]>('/organization/list-user-invitations', {
          method: 'GET',
        }),
      ]);

      setOrganizationInvitations(Array.isArray(sentResponse) ? sentResponse : []);
      setReceivedInvitations(Array.isArray(receivedResponse) ? receivedResponse : []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.load'));
    } finally {
      setIsRefreshingInvitations(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, [activeOrganization?.id]);

  const handleCreateOrganization = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsCreatingOrganization(true);

    try {
      await authClient.$fetch('/organization/create', {
        method: 'POST',
        name: organizationName.trim(),
        slug: organizationSlug.trim(),
      });

      setOrganizationName('');
      setOrganizationSlug('');
      await Promise.all([
        organizationsQuery.refetch(),
        activeOrganizationQuery.refetch(),
        loadInvitations(),
      ]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.create'));
    } finally {
      setIsCreatingOrganization(false);
    }
  };

  const handleInviteMember = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSendingInvite(true);

    try {
      await authClient.$fetch('/organization/invite-member', {
        method: 'POST',
        email: inviteEmail.trim(),
        role: 'member',
        organizationId: activeOrganization?.id,
      });

      setInviteEmail('');
      await loadInvitations();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.invite'));
    } finally {
      setIsSendingInvite(false);
    }
  };

  const handleInvitationResponse = async (invitationId: string, action: 'accept' | 'reject') => {
    setErrorMessage(null);

    try {
      await authClient.$fetch(
        action === 'accept' ? '/organization/accept-invitation' : '/organization/reject-invitation',
        {
          method: 'POST',
          invitationId,
        }
      );

      await Promise.all([
        organizationsQuery.refetch(),
        activeOrganizationQuery.refetch(),
        loadInvitations(),
      ]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('users.organizations.errors.respond'));
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="mb-2 text-3xl font-bold">{t('users.organizations.page.title')}</h1>
      <p className="mb-6 text-muted-foreground">{t('users.organizations.page.description')}</p>

      {errorMessage ? (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-2 text-lg font-semibold">{t('users.organizations.create.title')}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t('users.organizations.create.description')}</p>

            <form className="space-y-4" onSubmit={handleCreateOrganization}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.fields.name')}
                </label>
                <Input
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  placeholder="Acme Ltd"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.fields.slug')}
                </label>
                <Input
                  value={organizationSlug}
                  onChange={(event) => setOrganizationSlug(event.target.value)}
                  placeholder="acme"
                />
              </div>
              <Button
                type="submit"
                disabled={
                  isCreatingOrganization ||
                  organizationName.trim().length === 0 ||
                  organizationSlug.trim().length === 0
                }
              >
                {isCreatingOrganization
                  ? t('users.organizations.create.submitting')
                  : t('users.organizations.create.submit')}
              </Button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{t('users.organizations.invite.title')}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeOrganization
                  ? t('users.organizations.invite.descriptionActive', {
                      organization: activeOrganization.name,
                    })
                  : t('users.organizations.invite.descriptionInactive')}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleInviteMember}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('users.organizations.fields.inviteEmail')}
                </label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="teammate@company.com"
                />
              </div>

              <Button
                type="submit"
                disabled={
                  isSendingInvite ||
                  !activeOrganization?.id ||
                  inviteEmail.trim().length === 0
                }
              >
                {isSendingInvite
                  ? t('users.organizations.invite.submitting')
                  : t('users.organizations.invite.submit')}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  {t('users.organizations.invite.sentInvites')}
                </h3>
                <Button type="button" variant="outline" onClick={loadInvitations} disabled={isRefreshingInvitations}>
                  {isRefreshingInvitations ? t('users.loading') : t('users.organizations.refresh')}
                </Button>
              </div>

              {organizationInvitations.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('users.organizations.invite.noSentInvites')}</p>
              ) : (
                <div className="space-y-3">
                  {organizationInvitations.map((invitation) => (
                    <div key={invitation.id} className="rounded-xl border border-border bg-background p-4 text-sm">
                      <p><span className="font-medium">{t('users.email')}:</span> {invitation.email}</p>
                      <p><span className="font-medium">{t('users.organizations.invite.status')}:</span> {invitation.status}</p>
                      <p>
                        <span className="font-medium">{t('users.organizations.invite.expiresAt')}:</span>{' '}
                        {new Date(invitation.expiresAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">{t('users.organizations.current.title')}</h2>

            {activeOrganization ? (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">{t('users.organizations.fields.name')}:</span> {activeOrganization.name}
                </div>
                <div>
                  <span className="font-medium">{t('users.organizations.fields.slug')}:</span> {activeOrganization.slug}
                </div>
                <div>
                  <span className="font-medium">{t('users.organizations.current.memberCount')}:</span> {activeOrganization.members.length}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('users.organizations.current.none')}</p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">{t('users.organizations.list.title')}</h2>

            {organizations.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('users.organizations.list.empty')}</p>
            ) : (
              <div className="space-y-3">
                {organizations.map((organization) => (
                  <div key={organization.id} className="rounded-xl border border-border bg-background p-4 text-sm">
                    <p><span className="font-medium">{t('users.organizations.fields.name')}:</span> {organization.name}</p>
                    <p><span className="font-medium">{t('users.organizations.fields.slug')}:</span> {organization.slug}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">{t('users.organizations.received.title')}</h2>

            {receivedInvitations.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('users.organizations.received.empty')}</p>
            ) : (
              <div className="space-y-3">
                {receivedInvitations.map((invitation) => (
                  <div key={invitation.id} className="rounded-xl border border-border bg-background p-4 text-sm">
                    <p>
                      <span className="font-medium">{t('users.organizations.received.organization')}:</span>{' '}
                      {invitation.organization?.name ?? invitation.organizationName ?? invitation.organizationId}
                    </p>
                    <p><span className="font-medium">{t('users.organizations.invite.status')}:</span> {invitation.status}</p>
                    <div className="mt-3 flex gap-2">
                      <Button type="button" variant="outline" onClick={() => handleInvitationResponse(invitation.id, 'accept')}>
                        {t('users.organizations.received.accept')}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => handleInvitationResponse(invitation.id, 'reject')}>
                        {t('users.organizations.received.reject')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
