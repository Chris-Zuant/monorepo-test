import type { ReactFlowNodeData } from "../models/reactFlowNodeData.types"
import {
  type Edge,
  type Node,
} from "@xyflow/react";

function getPortDefinition(
  node: Node<ReactFlowNodeData> | undefined,
  handleId: string | null | undefined,
  direction: "input" | "output"
) {
  if (!node) {
    return null
  }

  const ports = direction === "input" ? node.data.inputs : node.data.outputs
  if (!handleId) {
    return ports[0] ?? null
  }

  return ports.find((port) => port.id === handleId) ?? null
}

export function getConnectionValidationError(
  connection: {
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  },
  nodes: Node<ReactFlowNodeData>[],
  edges: Edge[]
) {
  const sourceNode = nodes.find((node) => node.id === connection.source)
  const targetNode = nodes.find((node) => node.id === connection.target)

  if (!sourceNode || !targetNode) {
    return "Both nodes must exist before they can be connected."
  }

  const sourcePort = getPortDefinition(sourceNode, connection.sourceHandle, "output")
  const targetPort = getPortDefinition(targetNode, connection.targetHandle, "input")

  if (!sourcePort || !targetPort) {
    return "Both handles must be valid before they can be connected."
  }

  const sourceHandleId = connection.sourceHandle ?? sourcePort.id
  const targetHandleId = connection.targetHandle ?? targetPort.id

  const sourceEdgeCount = edges.filter(
    (edge) => edge.source === connection.source && (edge.sourceHandle ?? sourcePort.id) === sourceHandleId
  ).length
  const targetEdgeCount = edges.filter(
    (edge) => edge.target === connection.target && (edge.targetHandle ?? targetPort.id) === targetHandleId
  ).length

  if (sourcePort.cardinality === "one" && sourceEdgeCount >= 1) {
    return `${sourcePort.label} can only have one outgoing connection.`
  }

  if (targetPort.cardinality === "one" && targetEdgeCount >= 1) {
    return `${targetPort.label} can only have one incoming connection.`
  }

  const sourceType = sourcePort.dataType ?? "any"
  const targetType = targetPort.dataType ?? "any"
  const typesMatch = sourceType === "any" || targetType === "any" || sourceType === targetType

  if (!typesMatch) {
    return `Type mismatch: ${sourcePort.label} outputs ${sourceType}, but ${targetPort.label} expects ${targetType}.`
  }

  return null
}
