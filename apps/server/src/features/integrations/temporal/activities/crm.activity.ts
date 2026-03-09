export interface CreateContactInput {
  email: string
  name: string
}

export async function createContactActivity(input: CreateContactInput) {
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