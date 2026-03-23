import type { FanOutRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";

export async function executeFanOutNode(
  node: FanOutRelationshipNode,
  value: unknown,
  _context: ExecuteRelationshipNodeContext
) {
  if (node.config.mode === "partition" && Array.isArray(value)) {
    return {
      out: value,
    };
  }

  return {
    out: [value],
  };
}
