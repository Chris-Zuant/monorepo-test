import type { RandomFailureNode } from "@monorepo/shared"

export interface RandomFailureActivityInput {
  node: RandomFailureNode
}

export async function randomFailureActivity({ node }: RandomFailureActivityInput) {
  const failureRate = node.config.failureRate ?? 0.5

  if (Math.random() < failureRate) {
    throw new Error("Simulated integration failure")
  }

  return {
    success: true
  }
}

// For testing retrys

// retry policies

// failure handling

// UI error states
