import { useTranslation } from 'react-i18next';
import { OrganizationManagement } from '../components/OrganizationManagement.component';
import { SsoSetupDialog } from '../components/SsoSetupDialog.component';

export default function OrganizationsPage() {
  const { t } = useTranslation('users');

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{t('users.organizations.page.title')}</h1>
          <p className="text-muted-foreground">{t('users.organizations.page.description')}</p>
        </div>

        <SsoSetupDialog />
      </div>

      <OrganizationManagement />
    </div>
  );
}
