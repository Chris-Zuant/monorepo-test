import type { CreateContactNode } from "@monorepo/shared"

export interface CreateContactActivityInput {
  node: CreateContactNode
  payload: unknown
}

export async function createContactActivity({
  node,
  payload,
}: CreateContactActivityInput) {
  const payloadRecord = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {}
  const firstName = String(payloadRecord.firstName ?? "").trim()
  const lastName = String(payloadRecord.lastName ?? "").trim()
  const combinedName = [firstName, lastName].filter(Boolean).join(" ").trim()

  const input = {
    email:
      String(payloadRecord.email ?? payloadRecord.emailAddress ?? "") || "TEST@evoite.com",
    name:
      String(payloadRecord.name ?? combinedName ?? "").trim() || "TEST Man",
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
