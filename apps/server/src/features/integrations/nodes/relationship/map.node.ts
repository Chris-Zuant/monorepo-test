import type { MapRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";

export async function executeMapNode(
  _node: MapRelationshipNode,
  value: unknown,
  _context: ExecuteRelationshipNodeContext
) {
  if (!Array.isArray(value)) {
    return {
      out: [value],
    };
  }

  return {
    out: value,
  };
}
