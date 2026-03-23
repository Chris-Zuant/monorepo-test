import type {
  IntegrationGraphDefinition,
  IntegrationGraphNode,
} from "@monorepo/shared";

export type TriggerGraphNode = Extract<
  IntegrationGraphNode,
  {
    type:
      | "internalLeadForm"
      | "webhookLead";
  }
>;

export type RelationshipGraphNode = Extract<
  IntegrationGraphNode,
  {
    type:
      | "condition"
      | "fanOut"
      | "join"
      | "collect"
      | "map"
      | "reduce";
  }
>;

export type ExecutableGraphNode = IntegrationGraphNode & {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

export interface BuiltIntegrationWorkflow {
  graph: IntegrationGraphDefinition;
  nodeMap: Map<string, ExecutableGraphNode>;
  startNodeIds: string[];
}

function getIncomingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.target === nodeId);
}

export function buildIntegrationWorkflow(
  graph: IntegrationGraphDefinition
): BuiltIntegrationWorkflow {
  const executableNodes = graph.nodes as ExecutableGraphNode[];
  const triggerNodeIds = executableNodes
    .filter((node) => node.nodeKind === "trigger")
    .map((node) => node.id);
  const rootNodeIds = executableNodes
    .filter((node) => getIncomingEdges(graph, node.id).length === 0)
    .map((node) => node.id);

  return {
    graph,
    nodeMap: new Map<string, ExecutableGraphNode>(
      executableNodes.map((node) => [node.id, node] as const)
    ),
    startNodeIds: triggerNodeIds.length > 0 ? triggerNodeIds : rootNodeIds,
  };
}
