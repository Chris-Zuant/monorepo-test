import { useDispatch, useSelector } from 'react-redux';
import type { Node } from '@xyflow/react';
import type { RootState } from '@app/providers/theme/store';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/core/shadcn/components/ui/Seperator.component';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/shadcn/components/ui';
import { Workflow } from 'lucide-react';
import { useState } from 'react';
import type {
  IntegrationNodeDefinition,
  ReactFlowNodeData,
  RelationshipNodeDefinition,
  TriggerNodeDefinition,
} from '../../../models/reactFlowNodeData.types';
import {
  ACTION_NODE_DEFINITIONS,
  RELATIONSHIP_NODE_DEFINITIONS,
  TRIGGER_NODE_DEFINITIONS,
} from '../nodes';
import { addNode } from '../../../store/integrations.slice';
import { buildInitialConfig } from '@/features/integrations/functions/buildInitalNodeConfig';

interface IntegrationsFlowDiagramSidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const IntegrationsFlowDiagramSidePanel = ({
  open,
  onOpenChange,
}: IntegrationsFlowDiagramSidePanelProps) => {
  const { t } = useTranslation('integrations');
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.integrations.nodes);
  const [activeTab, setActiveTab] = useState<'trigger' | 'action' | 'relationship'>('trigger');
  const triggerNodes = Object.values(TRIGGER_NODE_DEFINITIONS);
  const actionNodes = Object.values(ACTION_NODE_DEFINITIONS);
  const relationshipNodes = Object.values(RELATIONSHIP_NODE_DEFINITIONS);

  const handleAddNode = (
    definition: IntegrationNodeDefinition | RelationshipNodeDefinition | TriggerNodeDefinition
  ) => {
    const isTriggerNode = definition.nodeKind === 'trigger';
    const isRelationshipNode = definition.nodeKind === 'relationship';
    const nodePrefix = isTriggerNode ? 'trigger' : isRelationshipNode ? 'relationship' : 'action';
    const nodeId = `${nodePrefix}-node-${Date.now()}`;
    const newNode: Node<ReactFlowNodeData> = {
      id: nodeId,
      type: isTriggerNode ? 'triggerNode' : isRelationshipNode ? 'relationshipNode' : 'integrationNode',
      position: {
        x: 120 + (nodes.length % 3) * 220,
        y: 80 + Math.floor(nodes.length / 3) * 140,
      },
      data: {
        nodeId,
        name: definition.label,
        label: definition.label,
        type: definition.type,
        nodeKind: definition.nodeKind,
        description: definition.description,
        config: buildInitialConfig(definition),
        category: definition.category,
        activityName: 'activityName' in definition ? definition.activityName : undefined,
        inputs: definition.inputs,
        outputs: definition.outputs,
        configSchema: definition.configSchema,
      },
    };

    dispatch(addNode(newNode));
    onOpenChange(false);
  };

  return (
    <>
      <div
        className={`absolute inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => onOpenChange(false)}
      />
      <aside
        className={`absolute inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-border bg-background shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Button
          variant="default"
          className="absolute top-1/2 -right-12 z-10 h-24 w-12 -translate-y-1/2 rounded-l-none rounded-r-xl border-l-0 px-0 shadow-md"
          onClick={() => onOpenChange(!open)}
          title={open ? t('integrations.sidebar.closePanel') : t('integrations.sidebar.openPanel')}
        >
          <Workflow className="size-4" />
        </Button>
        <div className="flex items-start gap-4 p-4">
          <div>
            <h2 className="text-base font-semibold">{t('integrations.sidebar.title')}</h2>
            {/* <p className="mt-1 text-sm text-muted-foreground">
              Choose a node from the list to add it to the flow.
            </p> */}
          </div>
        </div>
        <Separator />
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'trigger' | 'action' | 'relationship')}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="p-4 pb-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trigger">{t('integrations.sidebar.tabs.trigger')}</TabsTrigger>
              <TabsTrigger value="action">{t('integrations.sidebar.tabs.action')}</TabsTrigger>
              <TabsTrigger value="relationship">{t('integrations.sidebar.tabs.relationship')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trigger" className="mt-0 flex-1 overflow-y-auto p-4 pt-2">
            <div className="space-y-2">
              {triggerNodes.map((nodeDefinition) => {
                const Icon = nodeDefinition.icon;

                return (
                  <Button
                    key={nodeDefinition.type}
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal rounded-xl border-emerald-200 px-3 py-3 text-left hover:border-emerald-300"
                    onClick={() => handleAddNode(nodeDefinition)}
                  >
                    <div className="flex w-full min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-sm font-medium leading-tight">
                          {nodeDefinition.label}
                        </div>
                        <div className="break-words text-xs leading-snug text-muted-foreground">
                          {nodeDefinition.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="action" className="mt-0 flex-1 overflow-y-auto p-4 pt-2">
            <div className="space-y-2">
              {actionNodes.map((nodeDefinition) => {
                const Icon = nodeDefinition.icon;

                return (
                  <Button
                    key={nodeDefinition.type}
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal rounded-xl px-3 py-3 text-left"
                    onClick={() => handleAddNode(nodeDefinition)}
                  >
                    <div className="flex w-full min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-sm font-medium leading-tight">
                          {nodeDefinition.label}
                        </div>
                        <div className="break-words text-xs leading-snug text-muted-foreground">
                          {nodeDefinition.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="relationship" className="mt-0 flex-1 overflow-y-auto p-4 pt-2">
            <div className="space-y-2">
              {relationshipNodes.map((nodeDefinition) => {
                const Icon = nodeDefinition.icon;

                return (
                  <Button
                    key={nodeDefinition.type}
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal rounded-xl border-sky-200 px-3 py-3 text-left hover:border-sky-300"
                    onClick={() => handleAddNode(nodeDefinition)}
                  >
                    <div className="flex w-full min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-sm font-medium leading-tight">
                          {nodeDefinition.label}
                        </div>
                        <div className="break-words text-xs leading-snug text-muted-foreground">
                          {nodeDefinition.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </aside>
    </>
  );
};
