import type { IntegrationGraphDefinition } from "@monorepo/shared";
import type {
  BuiltIntegrationWorkflow,
  ExecutableGraphNode,
  TriggerGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";
import {
  executeActionNode,
  type ActivityFns,
  type ActionRuntimeFns,
} from "./executeActionNode.service";
import {
  executeRelationshipNode,
} from "./executeRelationshipNode.service";
import { executeTriggerNode } from "./executeTriggerNode.service";
type ExecutableTriggerNode = TriggerGraphNode & ExecutableGraphNode;
type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;

export interface IntegrationWorkflowExecutionResult {
  nodeResults: Record<string, unknown>;
  terminalOutputs: Record<string, unknown[]>;
  visitOrder: string[];
}

function isRelationshipNode(node: ExecutableGraphNode): node is ExecutableRelationshipNode {
  return node.nodeKind === "relationship";
}

function isTriggerNode(node: ExecutableGraphNode): node is ExecutableTriggerNode {
  return node.nodeKind === "trigger";
}

function getOutgoingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.source === nodeId);
}

async function enqueueOutputs(
  graph: IntegrationGraphDefinition,
  terminalOutputs: Record<string, unknown[]>,
  nodeId: string,
  outputsByPort: Record<string, unknown[]>,
  executeNode: (nodeId: string, payload: unknown, viaHandle?: string) => Promise<void>
) {
  const outgoingEdges = getOutgoingEdges(graph, nodeId);
  const fallbackPort =
    Object.keys(outputsByPort).length === 1 ? Object.keys(outputsByPort)[0] : undefined;
  const tasks: Promise<void>[] = [];

  for (const [outputPort, payloads] of Object.entries(outputsByPort)) {
    const matchingEdges = outgoingEdges.filter((edge) => {
      const sourceHandle = edge.sourceHandle ?? fallbackPort;
      return sourceHandle === outputPort;
    });

    if (matchingEdges.length === 0) {
      terminalOutputs[nodeId] = [...(terminalOutputs[nodeId] ?? []), ...payloads];
      continue;
    }

    for (const payload of payloads) {
      for (const edge of matchingEdges) {
        tasks.push(executeNode(edge.target, payload, edge.targetHandle));
      }
    }
  }

  await Promise.all(tasks);
}

export async function runIntegrationWorkflow(
  builtWorkflow: BuiltIntegrationWorkflow,
  activityFns: ActivityFns,
  runtimeFns: ActionRuntimeFns,
  initialInput: unknown = null
): Promise<IntegrationWorkflowExecutionResult> {

  const { graph, nodeMap, startNodeIds } = builtWorkflow;
  const terminalOutputs: Record<string, unknown[]> = {};
  const nodeResults: Record<string, unknown> = {};
  const visitOrder: string[] = [];
  const relationshipRuntimeState = new Map<
    string,
    { values: unknown[]; waiters: Array<() => void>; executed: boolean }
  >();

  const executeNode = async (
    nodeId: string,
    payload: unknown,
    viaHandle?: string
  ): Promise<void> => {
    const node = nodeMap.get(nodeId)!;
    void viaHandle;

    console.log(`Node Executed: ${node.nodeKind}:${node.type}:${node.id.slice(-5)}`);

    if (isTriggerNode(node)) {
      const result = await executeTriggerNode(node, initialInput);
      visitOrder.push(node.id);
      nodeResults[node.id] = result;
      await enqueueOutputs(graph, terminalOutputs, node.id, { out: [result] }, executeNode);
      return;
    }

    if (isRelationshipNode(node)) {
      const outputs = await executeRelationshipNode(node, payload, {
        graph,
        runtimeState: relationshipRuntimeState,
      });
      if (!outputs) {
        return;
      }

      visitOrder.push(node.id);
      nodeResults[node.id] = outputs;
      await enqueueOutputs(graph, terminalOutputs, node.id, outputs, executeNode);
      return;
    }

    const result = await executeActionNode(node, payload, activityFns, runtimeFns);
    visitOrder.push(node.id);
    nodeResults[node.id] = result;
    await enqueueOutputs(graph, terminalOutputs, node.id, { out: [result] }, executeNode);
  };

  await Promise.all(startNodeIds.map((nodeId) => executeNode(nodeId, initialInput)));

  return {
    nodeResults,
    terminalOutputs,
    visitOrder,
  };
}
