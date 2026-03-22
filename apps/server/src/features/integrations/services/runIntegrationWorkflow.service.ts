import type { IntegrationGraphDefinition } from "@monorepo/shared";
import type {
  BuiltIntegrationWorkflow,
  ExecutableGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";
import { executeActionNode, type ActivityFns } from "./executeActionNode.service";
import {
  executeRelationshipNode,
  type RelationshipActivityFns,
} from "./executeRelationshipNode.service";

const DEFAULT_PORT = "__default__";

type ExecutionToken = {
  nodeId: string;
  payload: unknown;
  viaHandle: string | undefined;
};

type BufferedInputs = Map<string, unknown[]>;
type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;

export interface IntegrationWorkflowExecutionResult {
  nodeResults: Record<string, unknown>;
  terminalOutputs: Record<string, unknown[]>;
  visitOrder: string[];
}

function isRelationshipNode(node: ExecutableGraphNode): node is ExecutableRelationshipNode {
  return [
    "condition",
    "fanOut",
    "join",
    "collect",
    "map",
    "reduce",
  ].includes(node.type);
}

function getBufferKey(handle?: string) {
  return handle ?? DEFAULT_PORT;
}

function ensureNodeBuffer(store: Map<string, BufferedInputs>, nodeId: string) {
  let bufferedInputs = store.get(nodeId);
  if (!bufferedInputs) {
    bufferedInputs = new Map<string, unknown[]>();
    store.set(nodeId, bufferedInputs);
  }

  return bufferedInputs;
}

function pushBufferedInput(
  store: Map<string, BufferedInputs>,
  nodeId: string,
  handle: string | undefined,
  payload: unknown
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId);
  const key = getBufferKey(handle);
  const values = bufferedInputs.get(key) ?? [];
  values.push(payload);
  bufferedInputs.set(key, values);
}

function takeBufferedInput(
  store: Map<string, BufferedInputs>,
  nodeId: string,
  preferredHandles: string[]
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId);

  for (const handle of preferredHandles) {
    const values = bufferedInputs.get(handle);
    if (values && values.length > 0) {
      return values.shift();
    }
  }

  return undefined;
}

function getIncomingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.target === nodeId);
}

function getOutgoingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.source === nodeId);
}

function enqueueOutputs(
  graph: IntegrationGraphDefinition,
  queue: ExecutionToken[],
  terminalOutputs: Record<string, unknown[]>,
  nodeId: string,
  outputsByPort: Record<string, unknown[]>
) {
  const outgoingEdges = getOutgoingEdges(graph, nodeId);
  const fallbackPort =
    Object.keys(outputsByPort).length === 1 ? Object.keys(outputsByPort)[0] : undefined;

  for (const [outputPort, payloads] of Object.entries(outputsByPort)) {
    const matchingEdges = outgoingEdges.filter((edge) => {
      const sourceHandle = edge.sourceHandle ?? fallbackPort ?? DEFAULT_PORT;
      return sourceHandle === outputPort;
    });

    if (matchingEdges.length === 0) {
      terminalOutputs[nodeId] = [...(terminalOutputs[nodeId] ?? []), ...payloads];
      continue;
    }

    for (const payload of payloads) {
      for (const edge of matchingEdges) {
        queue.push({
          nodeId: edge.target,
          payload,
          viaHandle: edge.targetHandle,
        });
      }
    }
  }
}

export async function runIntegrationWorkflow(
  builtWorkflow: BuiltIntegrationWorkflow,
  activityFns: ActivityFns & RelationshipActivityFns,
  initialInput: unknown = null
): Promise<IntegrationWorkflowExecutionResult> {
  const { graph, nodeMap, startNodeIds } = builtWorkflow;
  const terminalOutputs: Record<string, unknown[]> = {};
  const nodeResults: Record<string, unknown> = {};
  const visitOrder: string[] = [];
  const bufferedInputs = new Map<string, BufferedInputs>();
  const queue: ExecutionToken[] = startNodeIds.map((nodeId) => ({
    nodeId,
    payload: initialInput,
    viaHandle: undefined,
  }));

  while (queue.length > 0) {
    const token = queue.shift()!;
    const node = nodeMap.get(token.nodeId)!;

    pushBufferedInput(bufferedInputs, token.nodeId, token.viaHandle, token.payload);

    if (isRelationshipNode(node)) {
      const outputs = await executeRelationshipNode(node, bufferedInputs, graph, activityFns);
      if (!outputs) {
        continue;
      }

      visitOrder.push(node.id);
      nodeResults[node.id] = outputs;
      enqueueOutputs(graph, queue, terminalOutputs, node.id, outputs);
      continue;
    }

    const payload = takeBufferedInput(
      bufferedInputs,
      node.id,
      getIncomingEdges(graph, node.id)
        .map((edge) => getBufferKey(edge.targetHandle))
        .concat(DEFAULT_PORT)
    );

    if (payload === undefined) {
      continue;
    }

    const result = await executeActionNode(node, payload, activityFns);
    visitOrder.push(node.id);
    nodeResults[node.id] = result;

    const outputs = {
      [DEFAULT_PORT]: [result],
    };

    enqueueOutputs(graph, queue, terminalOutputs, node.id, outputs);
  }

  return {
    nodeResults,
    terminalOutputs,
    visitOrder,
  };
}
