import type { JoinRelationshipNode } from "@monorepo/shared"

export interface JoinRelationshipInput {
  node: JoinRelationshipNode
  handles: string[]
  values: unknown[]
}

export async function joinRelationshipActivity({
  node,
  handles,
  values,
}: JoinRelationshipInput) {
  if (node.config.mode === "any") {
    return {
      out: [values[0]],
    }
  }

  const output =
    node.config.mode === "barrier"
      ? Object.fromEntries(handles.map((handle, index) => [handle, values[index]]))
      : node.config.emitMode === "object"
        ? Object.fromEntries(handles.map((handle, index) => [handle, values[index]]))
        : values

  return {
    out: [output],
  }
}
