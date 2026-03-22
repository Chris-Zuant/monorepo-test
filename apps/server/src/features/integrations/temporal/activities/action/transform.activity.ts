import type { TransformNode } from "@monorepo/shared"

export interface TransformActivityInput {
  node: TransformNode
  payload: unknown
}

export async function transformActivity({ payload }: TransformActivityInput) {
  const data = payload && typeof payload === "object" ? payload : { value: payload }
  const transformed = {
    ...data,
    processedAt: new Date().toISOString()
  }

  return transformed
}

// JSONata

// JS expressions

// template transforms
