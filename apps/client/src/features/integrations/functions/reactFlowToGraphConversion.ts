import type { Edge, Node } from "@xyflow/react"
import type { ReactFlowNodeData } from "../models/reactFlowNodeData.types"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import {
  ACTION_NODE_DEFINITIONS,
  RELATIONSHIP_NODE_DEFINITIONS,
} from "../components/flow-diagram/nodes"


export const toReactFlow = (graph: IntegrationGraphDefinition): {
  nodes: Node<ReactFlowNodeData>[]
  edges: Edge[]
}  => {
  const nodes: Node<ReactFlowNodeData>[] = graph.nodes.map((node) => {
    const definition =
      node.type in ACTION_NODE_DEFINITIONS
        ? ACTION_NODE_DEFINITIONS[node.type as keyof typeof ACTION_NODE_DEFINITIONS]
        : RELATIONSHIP_NODE_DEFINITIONS[node.type as keyof typeof RELATIONSHIP_NODE_DEFINITIONS]

    if (!definition) {
      throw new Error(`Unknown integration node type: ${node.type}`)
    }

    const data: ReactFlowNodeData = {
      nodeId: node.id,
      name: node.name,
      label: definition.label,
      type: definition.type,
      nodeKind: node.type in ACTION_NODE_DEFINITIONS ? "integration" : "relationship",
      description: definition.description,
      config: (node.config ?? {}) as Record<string, unknown>,
      category: definition.category,
      activityName: "activityName" in definition ? definition.activityName : undefined,
      inputs: definition.inputs,
      outputs: definition.outputs,
      configSchema: definition.configSchema,
    }

    return {
      id: node.id,
      type: node.type in ACTION_NODE_DEFINITIONS ? "integrationNode" : "relationshipNode",
      position: node.position,
      data
    }
  })

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle,
    target: edge.target,
    targetHandle: edge.targetHandle,
    label: edge.label
  }))

  return { nodes, edges }
}
