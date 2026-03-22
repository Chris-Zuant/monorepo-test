import type { BatchNode } from "@monorepo/shared"

export interface BatchActivityInput {
  node: BatchNode
  payload: unknown
}

export async function batchActivity({ payload }: BatchActivityInput) {
  const items = Array.isArray(payload) ? payload : [payload]

  return items.map((item, index) => ({
    ...item,
    batchIndex: index
  }))
}

// list iteration

// fan-out workflows

// batch processing
