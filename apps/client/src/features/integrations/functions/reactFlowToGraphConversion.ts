import type { Edge, Node } from "@xyflow/react"
import type { ReactFlowNodeData } from "../models/reactFlowNodeData.types"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import { NODE_DEFINITIONS } from "../components/flow-diagram/nodes"


export const toReactFlow = (graph: IntegrationGraphDefinition): {
  nodes: Node<ReactFlowNodeData>[]
  edges: Edge[]
}  => {
  const nodes: Node<ReactFlowNodeData>[] = graph.nodes.map((node) => {
    const definition = NODE_DEFINITIONS[node.type]
    if (!definition) {
      throw new Error(`Unknown integration node type: ${node.type}`)
    }

    const data: ReactFlowNodeData = {
      nodeId: node.id,
      name: node.name,
      label: definition.label,
      type: definition.type,
      description: definition.description,
      config: node.config ?? {},
      category: definition.category,
      activityName: definition.activityName,
      inputs: definition.inputs,
      outputs: definition.outputs,
      configSchema: definition.configSchema,
    }

    return {
      id: node.id,
      type: "integrationNode",
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
