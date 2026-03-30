import type {
  IntegrationGraphDefinition,
  IntegrationGraphNode,
} from "@monorepo/shared";

export interface BuiltIntegrationWorkflow {
  graph: IntegrationGraphDefinition;
  nodeMap: Map<string, IntegrationGraphNode>;
  startNodeIds: string[];
}

function getIncomingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.target === nodeId);
}

// Builder pattern:
// this class has one job: take a raw graph definition and produce the
// executable structure the runner needs. Keeping construction here means
// the execution engine does not need to know how to prepare the graph.
export class IntegrationWorkflowBuilder {
  public static build(graph: IntegrationGraphDefinition): BuiltIntegrationWorkflow {

    const triggerNodeIds = graph.nodes
      .filter((node) => node.nodeKind === "trigger")
      .map((node) => node.id);
      
    const rootNodeIds = graph.nodes
      .filter((node) => getIncomingEdges(graph, node.id).length === 0)
      .map((node) => node.id);

    return {
      graph,
      nodeMap: new Map<string, IntegrationGraphNode>(
        graph.nodes.map((node) => [node.id, node] as const)
      ),
      startNodeIds: triggerNodeIds.length > 0 ? triggerNodeIds : rootNodeIds,
    };
  }
}
