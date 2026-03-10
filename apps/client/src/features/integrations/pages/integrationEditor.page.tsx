import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { Node } from '@xyflow/react';
import type { RootState } from '@app/providers/theme/store';
import { CoreButton } from '@/core/components';
import { LogicTreeCanvas } from '../components/flow-diagram/integrations-flow-diagram.component';
import { NODE_DEFINITIONS } from '../components/flow-diagram/nodes';
import type { ReactFlowNodeData } from '../models/reactFlowNodeData.types';
import { addNode } from '../store/integrations.slice';

export const IntegrationEditorPage: React.FC = () => {
  const { t } = useTranslation('integrations');
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.integrations.nodes);

  const handleAddNode = (nodeTypeId: keyof typeof NODE_DEFINITIONS) => {
    const definition = NODE_DEFINITIONS[nodeTypeId];
    const nodeId = `integration-node-${Date.now()}`;
    const newNode: Node<ReactFlowNodeData> = {
      id: nodeId,
      type: 'integrationNode',
      position: {
        x: 120 + (nodes.length % 3) * 220,
        y: 80 + Math.floor(nodes.length / 3) * 140,
      },
      data: {
        nodeId,
        name: definition.label,
        label: definition.label,
        type: definition.type,
        description: definition.description,
        config: {},
        category: definition.category,
        activityName: definition.activityName,
        icon: definition.icon,
        inputs: definition.inputs,
        outputs: definition.outputs,
        configSchema: definition.configSchema,
      },
    };

    dispatch(addNode(newNode));
  };

  const availableNodes = Object.values(NODE_DEFINITIONS);

  return (
    <div className="flex h-[calc(100vh-57px)] w-full">
      <aside className="flex w-80 shrink-0 flex-col border-r border-border bg-card/40 p-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">
            {t('integrations.editor.title', 'Integration Editor')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('integrations.editor.description', 'Choose a node from the sidebar to add it to the flow.')}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
          {availableNodes.map((nodeDefinition) => {
            const Icon = nodeDefinition.icon;
            return (
              <CoreButton
                key={nodeDefinition.type}
                variant="outline"
                className="h-auto w-full justify-start rounded-xl px-3 py-3 text-left"
                onClick={() => handleAddNode(nodeDefinition.type)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="font-medium">{nodeDefinition.label}</div>
                    <div className="text-xs text-muted-foreground">{nodeDefinition.description}</div>
                  </div>
                </div>
              </CoreButton>
            );
          })}
        </div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col bg-background">
        <div className="flex h-full min-h-0 flex-1">
          <LogicTreeCanvas />
        </div>
      </section>
    </div>
  );
};

export default IntegrationEditorPage;
