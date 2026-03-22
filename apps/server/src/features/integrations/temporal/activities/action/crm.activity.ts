import type { CreateContactNode } from "@monorepo/shared"

export interface CreateContactActivityInput {
  node: CreateContactNode
  payload: unknown
}

export async function createContactActivity({
  node,
  payload,
}: CreateContactActivityInput) {
  const payloadRecord =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {}
  const input = {
    email: node.config.email || String(payloadRecord.email ?? ""),
    name: node.config.name || String(payloadRecord.name ?? ""),
  }

  await new Promise((r) => setTimeout(r, 500))

  return {
    id: crypto.randomUUID(),
    ...input
  }
}

// Webhook Trigger
//  → Transform
//  → Create Contact
//  → Notify Slack
