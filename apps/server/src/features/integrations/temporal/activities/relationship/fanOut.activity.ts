import type { FanOutRelationshipNode } from "@monorepo/shared"

export interface FanOutRelationshipInput {
  node: FanOutRelationshipNode
  value: unknown
  outputPorts: string[]
}

export async function fanOutRelationshipActivity({
  node,
  value,
  outputPorts,
}: FanOutRelationshipInput) {
  const mode = node.config.mode

  if (mode === "partition" && Array.isArray(value)) {
    return outputPorts.reduce<Record<string, unknown[]>>((result, outputPort, index) => {
      result[outputPort] = value.filter((_, itemIndex) => itemIndex % outputPorts.length === index)
      return result
    }, {})
  }

  return outputPorts.reduce<Record<string, unknown[]>>((result, outputPort) => {
    result[outputPort] = [value]
    return result
  }, {})
}
