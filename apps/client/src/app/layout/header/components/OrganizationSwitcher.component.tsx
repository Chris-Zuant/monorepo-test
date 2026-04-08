import React, { useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import { authClient } from '@app/providers/auth';

export const OrganizationSwitcher: React.FC = () => {
  const { data: sessionData } = authClient.useSession();
  const organizationsQuery = authClient.useListOrganizations();
  const activeOrganizationQuery = authClient.useActiveOrganization();
  const [isSwitchingOrganization, setIsSwitchingOrganization] = useState(false);

  const activeOrganizationId = sessionData?.session?.activeOrganizationId ?? '';
  const organizations = organizationsQuery.data ?? [];
  const isOrganizationsLoading = organizationsQuery.isPending;

  const selectedOrganizationId = useMemo(() => {
    if (activeOrganizationId) {
      return activeOrganizationId;
    }

    if (activeOrganizationQuery.data?.id) {
      return activeOrganizationQuery.data.id;
    }

    return organizations[0]?.id ?? '';
  }, [activeOrganizationId, activeOrganizationQuery.data?.id, organizations]);

  const handleOrganizationChange = async (organizationId: string) => {
    setIsSwitchingOrganization(true);

    try {
      await authClient.$fetch('/organization/set-active', {
        method: 'POST',
        organizationId: organizationId || null,
      });

      await Promise.all([
        organizationsQuery.refetch(),
        activeOrganizationQuery.refetch(),
      ]);
    } finally {
      setIsSwitchingOrganization(false);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <select
        aria-label="Active organization"
        className="min-w-[10rem] bg-transparent text-sm outline-none"
        disabled={isOrganizationsLoading || isSwitchingOrganization || organizations.length === 0}
        value={selectedOrganizationId}
        onChange={(event) => handleOrganizationChange(event.target.value)}
      >
        {isOrganizationsLoading ? <option value="">Loading orgs...</option> : null}
        {!isOrganizationsLoading && organizations.length === 0 ? (
          <option value="">No organizations</option>
        ) : null}
        {!isOrganizationsLoading
          ? organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default OrganizationSwitcher;
