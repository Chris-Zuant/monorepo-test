import type { ReduceRelationshipNode } from "@monorepo/shared"

export interface ReduceRelationshipInput {
  node: ReduceRelationshipNode
  values: unknown[]
}

function reduceValues(
  values: unknown[],
  strategy: "sum" | "concat" | "merge" | "custom",
  initialValue?: unknown
) {
  switch (strategy) {
    case "sum":
      return values.reduce(
        (total, value) => Number(total) + Number(value ?? 0),
        Number(initialValue ?? 0)
      )
    case "concat":
      return values.reduce<string>(
        (result, value) => result + String(value ?? ""),
        String(initialValue ?? "")
      )
    case "merge":
      return values.reduce<Record<string, unknown>>((result, value) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return { ...result, ...(value as Record<string, unknown>) }
        }

        return result
      }, (initialValue as Record<string, unknown>) ?? {})
    case "custom":
      return {
        initialValue,
        values,
      }
  }
}

export async function reduceRelationshipActivity({
  node,
  values,
}: ReduceRelationshipInput) {
  return {
    out: [reduceValues(values, node.config.strategy, node.config.initialValue)],
  }
}
