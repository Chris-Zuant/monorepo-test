import { useTranslation } from 'react-i18next';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/shadcn/components/ui';
import { OrganizationManagement } from '../components/OrganizationManagement.component';
import { SsoManagement } from '../components/SsoManagement.component';

export default function OrganizationsPage() {
  const { t } = useTranslation('users');

  return (
    <Tabs defaultValue="organizations" className="w-full p-6 flex-col">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{t('users.organizations.page.title')}</h1>
          <p className="text-muted-foreground">{t('users.organizations.page.description')}</p>
        </div>

        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="organizations">
            {t('users.organizations.tabs.organizations')}
          </TabsTrigger>
          <TabsTrigger value="sso">{t('users.organizations.tabs.sso')}</TabsTrigger>
        </TabsList>
      </div>

        <TabsContent value="organizations">
          <OrganizationManagement />
        </TabsContent>

        <TabsContent value="sso">
          <SsoManagement />
        </TabsContent>
    </Tabs>
  );
}
