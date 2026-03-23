import type { Edge, Node } from "@xyflow/react"
import type { ReactFlowNodeData } from "../models/reactFlowNodeData.types"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import {
  ACTION_NODE_DEFINITIONS,
  RELATIONSHIP_NODE_DEFINITIONS,
  TRIGGER_NODE_DEFINITIONS,
} from "../components/flow-diagram/nodes"

function inferNodeKind(
  nodeType: IntegrationGraphDefinition["nodes"][number]["type"]
): IntegrationGraphDefinition["nodes"][number]["nodeKind"] {
  switch (nodeType) {
    case "internalLeadForm":
    case "webhookLead":
      return "trigger"
    case "condition":
    case "fanOut":
    case "join":
    case "collect":
    case "map":
    case "reduce":
      return "relationship"
    default:
      return "action"
  }
}

export const toReactFlow = (graph: IntegrationGraphDefinition): {
  nodes: Node<ReactFlowNodeData>[]
  edges: Edge[]
}  => {
  const nodes: Node<ReactFlowNodeData>[] = graph.nodes.map((node) => {
    const rawNode = node as {
      id: string
      type: IntegrationGraphDefinition["nodes"][number]["type"]
      name: string
      position: { x: number; y: number }
      config?: unknown
      nodeKind?: IntegrationGraphDefinition["nodes"][number]["nodeKind"]
    }
    const nodeKind = rawNode.nodeKind ?? inferNodeKind(rawNode.type)
    const definition =
      nodeKind === "trigger"
        ? TRIGGER_NODE_DEFINITIONS[rawNode.type as keyof typeof TRIGGER_NODE_DEFINITIONS]
        : nodeKind === "action"
          ? ACTION_NODE_DEFINITIONS[rawNode.type as keyof typeof ACTION_NODE_DEFINITIONS]
          : RELATIONSHIP_NODE_DEFINITIONS[rawNode.type as keyof typeof RELATIONSHIP_NODE_DEFINITIONS]

    if (!definition) {
      throw new Error(`Unknown integration node type: ${rawNode.type}`)
    }

    const data: ReactFlowNodeData = {
      nodeId: rawNode.id,
      name: rawNode.name,
      label: definition.label,
      type: definition.type,
      nodeKind,
      description: definition.description,
      config: (rawNode.config ?? {}) as Record<string, unknown>,
      category: definition.category,
      activityName: "activityName" in definition ? definition.activityName : undefined,
      inputs: definition.inputs,
      outputs: definition.outputs,
      configSchema: definition.configSchema,
    }

    return {
      id: rawNode.id,
      type:
        nodeKind === "trigger"
          ? "triggerNode"
          : nodeKind === "action"
            ? "integrationNode"
            : "relationshipNode",
      position: rawNode.position,
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
