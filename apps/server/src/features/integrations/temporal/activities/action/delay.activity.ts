import type { DelayNode } from "@monorepo/shared"

export interface DelayActivityInput {
  node: DelayNode
}

export async function delayActivity({ node }: DelayActivityInput) {
  await new Promise((resolve) => setTimeout(resolve, node.config.ms))

  return {
    waited: node.config.ms
  }
}

// Wait 5 minutes
