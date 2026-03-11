import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/providers/theme/store';
import { LogicTreeCanvas } from '../components/flow-diagram/integrations-flow-diagram.component';
import { IntegrationsFlowDiagramSidePanel } from '../components/flow-diagram/sidebar/integrations-flow-diagram-side-panel.component';
import { IntegrationSyncComponent } from '../components/api/integrationSync.component';
import { useIntegrationsQuery } from '../hooks';
import { setIntegrationGraph } from '../store/integrations.slice';
import { Separator } from '@/core/shadcn/components/ui/Seperator.component';
import IntegrationRunComponent from '../components/api/integrationRun.component';

export const IntegrationEditorPage: React.FC = () => {
  const { t } = useTranslation('integrations');
  const dispatch = useDispatch();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const graphName = useSelector((state: RootState) => state.integrations.name);
  const hasHydratedRef = useRef(false);
  const { data: integrations = [] } = useIntegrationsQuery();

  useEffect(() => {
    if (hasHydratedRef.current || integrations.length === 0) {
      return;
    }

    dispatch(setIntegrationGraph(integrations[0]));
    hasHydratedRef.current = true;
  }, [dispatch, integrations]);

  return (
    <div className="relative flex h-[calc(100vh-57px)] w-full flex-col bg-background">
      <IntegrationsFlowDiagramSidePanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
      <div className="absolute flex items-center justify-between border-2 border-border px-4 py-3 top-5 left-5 z-10 bg-background rounded-2xl">
        <div>
          <h3 className="text-xl font-semibold">
            {graphName || t('integrations.editor.title', 'Integration Editor')}
          </h3>
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
