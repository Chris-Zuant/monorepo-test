import { useDispatch, useSelector } from 'react-redux';
import type { Node } from '@xyflow/react';
import type { RootState } from '@app/providers/theme/store';
import { CoreButton } from '@/core/components';
import { Separator } from '@/core/shadcn/components/ui/Seperator.component';
import { Workflow } from 'lucide-react';
import type {
  IntegrationNodeDefinition,
  ReactFlowNodeData,
  RelationshipNodeDefinition,
} from '../../../models/reactFlowNodeData.types';
import { NODE_DEFINITIONS, RELATIONSHIP_NODE_DEFINITIONS } from '../nodes';
import { addNode } from '../../../store/integrations.slice';

interface IntegrationsFlowDiagramSidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const IntegrationsFlowDiagramSidePanel = ({
  open,
  onOpenChange,
}: IntegrationsFlowDiagramSidePanelProps) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.integrations.nodes);
  const integrationNodes = Object.values(NODE_DEFINITIONS);
  const relationshipNodes = Object.values(RELATIONSHIP_NODE_DEFINITIONS);

  const handleAddNode = (
    definition: IntegrationNodeDefinition | RelationshipNodeDefinition
  ) => {
    const isRelationshipNode = definition.category === 'relationship';
    const nodeId = `${isRelationshipNode ? 'relationship' : 'integration'}-node-${Date.now()}`;
    const newNode: Node<ReactFlowNodeData> = {
      id: nodeId,
      type: isRelationshipNode ? 'relationshipNode' : 'integrationNode',
      position: {
        x: 120 + (nodes.length % 3) * 220,
        y: 80 + Math.floor(nodes.length / 3) * 140,
      },
      data: {
        nodeId,
        name: definition.label,
        label: definition.label,
        type: definition.type,
        nodeKind: isRelationshipNode ? 'relationship' : 'integration',
        description: definition.description,
        config: {},
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
        <CoreButton
          variant="default"
          className="absolute top-1/2 -right-12 z-10 h-24 w-12 -translate-y-1/2 rounded-l-none rounded-r-xl border-l-0 px-0 shadow-md"
          onClick={() => onOpenChange(!open)}
          title={open ? 'Close node panel' : 'Open node panel'}
        >
          <Workflow className="size-4" />
        </CoreButton>
        <div className="flex items-start gap-4 p-4">
          <div>
            <h2 className="text-base font-semibold">Flow Nodes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a node from the list to add it to the flow.
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Integration
          </div>
          {integrationNodes.map((nodeDefinition) => {
            const Icon = nodeDefinition.icon;

            return (
              <CoreButton
                key={nodeDefinition.type}
                variant="outline"
                className="h-auto w-full justify-start rounded-xl px-3 py-3 text-left"
                onClick={() => handleAddNode(nodeDefinition)}
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
          <div className="mt-4 px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Relationship
          </div>
          {relationshipNodes.map((nodeDefinition) => {
            const Icon = nodeDefinition.icon;

            return (
              <CoreButton
                key={nodeDefinition.type}
                variant="outline"
                className="h-auto w-full justify-start rounded-xl border-sky-200 px-3 py-3 text-left hover:border-sky-300"
                onClick={() => handleAddNode(nodeDefinition)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
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
    </>
  );
};
