import type { MapRelationshipNode } from "@monorepo/shared"

export interface MapRelationshipInput {
  node: MapRelationshipNode
  value: unknown
}

export async function mapRelationshipActivity({
  node,
  value,
}: MapRelationshipInput) {
  const itemPortId = node.config.itemPortId

  if (!Array.isArray(value)) {
    return {
      [itemPortId ?? "item"]: [value],
    }
  }

  return {
    [itemPortId ?? "item"]: value,
  }
}
