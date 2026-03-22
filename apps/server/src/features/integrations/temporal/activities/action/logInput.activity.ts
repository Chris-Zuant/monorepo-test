import type { LogNode } from "@monorepo/shared"

export interface LogActivityInput {
  node: LogNode
  payload?: unknown
}

export async function logActivity({ node, payload }: LogActivityInput) {
  const message =
    node.config.message || (typeof payload === "string" ? payload : JSON.stringify(payload))
  const level = node.config.level ?? "info"

  console.log(`[${level.toUpperCase()}] ${message}`)

  return {
    logged: true
  }
}

// Datadog

// Cloudwatch

// Sentry

// custom audit logs
