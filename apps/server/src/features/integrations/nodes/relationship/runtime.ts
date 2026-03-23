import type { IntegrationGraphDefinition } from "@monorepo/shared";

export interface RelationshipNodeRuntimeState {
  values: unknown[];
  waiters: Array<() => void>;
  executed: boolean;
}

export interface ExecuteRelationshipNodeContext {
  graph: IntegrationGraphDefinition;
  runtimeState: Map<string, RelationshipNodeRuntimeState>;
}

export function getIncomingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.target === nodeId);
}

export function getRuntimeState(
  store: Map<string, RelationshipNodeRuntimeState>,
  nodeId: string
) {
  let runtimeState = store.get(nodeId);

  if (!runtimeState) {
    runtimeState = {
      values: [],
      waiters: [],
      executed: false,
    };
    store.set(nodeId, runtimeState);
  }

  return runtimeState;
}

export function waitForRelationshipExecution(runtimeState: RelationshipNodeRuntimeState) {
  return new Promise<void>((resolve) => {
    runtimeState.waiters.push(resolve);
  });
}

export function resolveRelationshipWaiters(runtimeState: RelationshipNodeRuntimeState) {
  for (const resolve of runtimeState.waiters) {
    resolve();
  }

  runtimeState.waiters = [];
}
