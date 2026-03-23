import type { ConditionRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";

function evaluateCondition(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value && typeof value === "object" && "result" in value) {
    return Boolean((value as Record<string, unknown>).result);
  }

  return Boolean(value);
}

export async function executeConditionNode(
  _node: ConditionRelationshipNode,
  value: unknown,
  _context: ExecuteRelationshipNodeContext
) {
  const result = evaluateCondition(value);

  return {
    [result ? "true" : "false"]: [value],
  };
}
