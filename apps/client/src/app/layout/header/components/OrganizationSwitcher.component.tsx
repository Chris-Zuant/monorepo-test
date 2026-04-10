import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';
import { authClient } from '@app/providers/auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/shadcn/components/ui/Select.component';

export const OrganizationSwitcher: React.FC = () => {
  const { t } = useTranslation('users');
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
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1 shadow-sm">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Building2 className="h-4 w-4" />
      </div>
      <Select
        disabled={isOrganizationsLoading || isSwitchingOrganization || organizations.length === 0}
        value={selectedOrganizationId}
        onValueChange={handleOrganizationChange}
      >
        <SelectTrigger
          aria-label={t('users.organizations.current.title')}
          className="min-w-[10rem] border-none bg-transparent shadow-none focus-visible:ring-0"
        >
          <SelectValue
            placeholder={
              isOrganizationsLoading
                ? t('users.loading')
                : t('users.organizations.current.none')
            }
          />
        </SelectTrigger>
        <SelectContent align="end">
          {organizations.map((organization) => (
            <SelectItem key={organization.id} value={organization.id}>
              {organization.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrganizationSwitcher;
