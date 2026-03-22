import type { ConditionRelationshipNode } from "@monorepo/shared"

export interface ConditionRelationshipInput {
  node: ConditionRelationshipNode
  value: unknown
}

function evaluateCondition(value: unknown) {
  if (typeof value === "boolean") {
    return value
  }

  if (value && typeof value === "object" && "result" in value) {
    return Boolean((value as Record<string, unknown>).result)
  }

  return Boolean(value)
}

export async function conditionRelationshipActivity({
  value,
}: ConditionRelationshipInput) {
  const result = evaluateCondition(value)

  return {
    [result ? "true" : "false"]: [value],
  }
}
