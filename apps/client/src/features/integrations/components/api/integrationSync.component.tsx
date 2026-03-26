import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { IntegrationGraphDefinition } from '@monorepo/shared';
import type { RootState } from '@app/providers/theme/store';
import { Spinner } from '@/core/shadcn/components/ui/Spinner.component';
import { useUpdateIntegrationMutation } from '../../hooks';

function inferNodeKind(
  nodeType: IntegrationGraphDefinition['nodes'][number]['type']
): IntegrationGraphDefinition['nodes'][number]['nodeKind'] {
  switch (nodeType) {
    case 'start':
    case 'internalLeadForm':
    case 'webhookLead':
      return 'trigger';
    case 'condition':
    case 'fanOut':
    case 'join':
    case 'collect':
    case 'map':
    case 'reduce':
      return 'relationship';
    default:
      return 'action';
  }
}

export const IntegrationSyncComponent = () => {
  const { id, name, nodes, edges } = useSelector((state: RootState) => state.integrations);
  const { mutate, isPending } = useUpdateIntegrationMutation();
  const isFirstRenderRef = useRef(true);
  const lastQueuedGraphRef = useRef<string | null>(null);
  const hasGraphContent = nodes.length > 0 || edges.length > 0 || name.trim().length > 0;

  const graph = useMemo<IntegrationGraphDefinition>(
    () => ({
      id,
      name: name.trim() || 'Untitled Integration',
      nodes: nodes.map((node) => ({
          id: node.id,
          nodeKind: node.data.nodeKind ?? inferNodeKind(node.data.type),
          type: node.data.type,
          name: node.data.name,
          position: node.position,
          config: node.data.config,
        })) as IntegrationGraphDefinition['nodes'],
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        sourceHandle: edge.sourceHandle ?? undefined,
        target: edge.target,
        targetHandle: edge.targetHandle ?? undefined,
        label: typeof edge.label === 'string' ? edge.label : undefined,
      })),
    }),
    [id, name, nodes, edges]
  );

  const graphSignature = useMemo(() => JSON.stringify(graph), [graph]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (!hasGraphContent) {
      return;
    }

    if (lastQueuedGraphRef.current === graphSignature) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lastQueuedGraphRef.current = graphSignature;
      mutate(graph);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [graph, graphSignature, hasGraphContent, mutate]);

  if (!isPending) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
      <Spinner className="size-3" />
      <span>syncing</span>
    </div>
  );
};
