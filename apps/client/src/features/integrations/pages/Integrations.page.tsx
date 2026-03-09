import React from 'react';
import { useTranslation } from 'react-i18next';
import { integrationTemporalTest } from '../api/integration.api';
import { CoreButton } from '@/core/components';

export const IntegrationsPage: React.FC = () => {
  const { t } = useTranslation('integrations');

    const fetchData = async () => {
      try {
        const res = await integrationTemporalTest();
        console.log('Integration TEST', res);
      } catch (err: any) {
        console.log(err)
      }
    };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{t('integrations.page.title')}</h1>
      <p className="text-gray-600">{t('integrations.page.description')}</p>
      <CoreButton onClick={fetchData}>TEST</CoreButton>
    </div>
  );
};

export default IntegrationsPage;
