import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CoreButton } from '@/core/components';
import { useIntegrationTemporalTestMutation } from '../hooks';

export const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('integrations');

  const temporalTestMutation = useIntegrationTemporalTestMutation({
    onSuccess: (data) => {
      console.log('Integration TEST', data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleTemporalTestClicked = () => {
    temporalTestMutation.mutate();
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{t('integrations.page.title')}</h1>
      <p className="text-gray-600">{t('integrations.page.description')}</p>
      <div className="mt-4 flex items-center gap-3">
        <CoreButton
          onClick={handleTemporalTestClicked}
          disabled={temporalTestMutation.isPending}
        >
          {temporalTestMutation.isPending ? 'Testing...' : 'TEST'}
        </CoreButton>
        <CoreButton
          variant="outline"
          onClick={() => navigate('/integrations/editor')}
        >
          {t('integrations.editor.open', 'Open Editor')}
        </CoreButton>
      </div>
    </div>
  );
};

export default IntegrationsPage;
