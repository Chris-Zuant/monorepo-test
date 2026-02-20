import React from 'react';
import { useTranslation } from 'react-i18next';

export const IntegrationsPage: React.FC = () => {
  const { t } = useTranslation('integrations');

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{t('integrations.page.title')}</h1>
      <p className="text-gray-600">{t('integrations.page.description')}</p>
    </div>
  );
};

export default IntegrationsPage;
