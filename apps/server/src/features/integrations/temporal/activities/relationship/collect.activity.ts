import type { CollectRelationshipNode } from "@monorepo/shared"

export interface CollectRelationshipInput {
  node: CollectRelationshipNode
  values: unknown[]
}

export async function collectRelationshipActivity({
  values,
}: CollectRelationshipInput) {
  return {
    out: [values],
  }
}
