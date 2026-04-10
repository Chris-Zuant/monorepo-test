import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchBar } from '@/core/components/inputs/searchbar.component';
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/shadcn/components/ui';
import { useIntegrationTemporalTestMutation, useIntegrationsQuery } from '../hooks';
import { initializeNewIntegrationGraph } from '../store/integrations.slice';

export const IntegrationsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('integrations');
  const [query, setQuery] = React.useState('');
  const { data: integrations = [] } = useIntegrationsQuery();

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

  const handleCreateIntegration = () => {
    const integrationId = globalThis.crypto?.randomUUID?.() ?? `integration-${Date.now()}`;
    dispatch(initializeNewIntegrationGraph({ id: integrationId }));
    navigate(`/integrations/editor/${integrationId}`);
  };

  const filteredIntegrations = React.useMemo(
    () =>
      integrations.filter((integration) =>
        (integration.name || t('integrations.page.untitledIntegration', 'Untitled Integration'))
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    [integrations, query, t]
  );

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('integrations.page.title')}</h1>

        <div className="flex flex-1 justify-center px-4">
          <SearchBar
            onChange={setQuery}
            placeholder={t('integrations.page.searchPlaceholder', 'Search integrations...')}
          />
        </div>

        <Button
          onClick={handleTemporalTestClicked}
          disabled={temporalTestMutation.isPending}
        >
          {temporalTestMutation.isPending
            ? t('integrations.page.testing', 'Testing...')
            : t('integrations.page.testButton', 'Test')}
        </Button>
        <Button variant="outline" onClick={handleCreateIntegration}>
          {t('integrations.page.newIntegration', 'New Integration')}
        </Button>
      </div>

      <p className="mb-6 text-muted-foreground">{t('integrations.page.description')}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredIntegrations.map((integration) => (
          <Card
            key={integration.id}
            className="cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent/20"
            onClick={() => navigate(`/integrations/editor/${integration.id}`)}
          >
            <CardHeader>
              <CardTitle>{integration.name || t('integrations.page.untitledIntegration', 'Untitled Integration')}</CardTitle>
              <CardDescription>
                {integration.nodes.length} nodes, {integration.edges.length} edges
              </CardDescription>
              <CardDescription className="font-mono text-xs">
                {integration.id}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
