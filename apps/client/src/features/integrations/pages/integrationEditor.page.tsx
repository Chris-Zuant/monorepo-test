import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '@app/providers/theme/store';
import { LogicTreeCanvas } from '../components/flow-diagram/integrations-flow-diagram.component';
import { IntegrationsFlowDiagramSidePanel } from '../components/flow-diagram/sidebar/integrations-flow-diagram-side-panel.component';
import { IntegrationSyncComponent } from '../components/api/integrationSync.component';
import { useIntegrationQuery } from '../hooks';
import {
  initializeNewIntegrationGraph,
  setIntegrationGraph,
  setIntegrationName,
} from '../store/integrations.slice';
import { Separator } from '@/core/shadcn/components/ui/Seperator.component';
import IntegrationRunComponent from '../components/api/integrationRun.component';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/core/shadcn/components/ui/Input.component';
import { Button } from '@/core/shadcn/components/ui';

export const IntegrationEditorPage: React.FC = () => {
  const { t } = useTranslation('integrations');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { integrationId = '' } = useParams<{ integrationId: string }>();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const graphName = useSelector((state: RootState) => state.integrations.name);
  const { data: integration, isError } = useIntegrationQuery(integrationId);

  useEffect(() => {
    if (!integration) {
      return;
    }

    dispatch(setIntegrationGraph(integration));
  }, [dispatch, integration]);

  useEffect(() => {
    if (!integrationId || integration || !isError) {
      return;
    }

    dispatch(initializeNewIntegrationGraph({ id: integrationId }));
  }, [dispatch, integration, integrationId, isError]);

  return (
    <div className="relative flex h-[calc(100vh-57px)] w-full flex-col bg-background">
      <IntegrationsFlowDiagramSidePanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
      <div className="absolute flex items-center justify-between border-2 border-border px-4 py-3 top-5 left-5 z-10 bg-background rounded-2xl">
        <div>
          <Button
            variant="icon"
            onClick={() => navigate('/integrations')}
            title={t('integrations.editor.back', 'Back to integrations')}
            aria-label={t('integrations.editor.back', 'Back to integrations')}
          >
            <ArrowLeft className="size-4" />
          </Button>
        </div>
        <Separator orientation='vertical'></Separator>
        <div className="min-w-72">
          <Input
            value={graphName}
            onChange={(event) => dispatch(setIntegrationName(event.target.value))}
            placeholder={t('integrations.editor.title', 'Integration Editor')}
            className="h-10 border-none bg-transparent px-0 text-xl font-semibold shadow-none focus-visible:ring-0"
          />
        </div>
        <Separator orientation='vertical'></Separator>
        <div>
            <IntegrationRunComponent></IntegrationRunComponent>
        </div>
      </div>
      <div className='absolute top-5 right-5'>
        <IntegrationSyncComponent></IntegrationSyncComponent>
      </div>
      <section className="flex min-h-0 flex-1">
        <LogicTreeCanvas />
      </section>
    </div>
  );
};

export default IntegrationEditorPage;
