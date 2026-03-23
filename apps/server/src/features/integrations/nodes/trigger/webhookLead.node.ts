import type { WebhookLeadTriggerNode } from "@monorepo/shared";

export function webhookLeadNode(
  node: WebhookLeadTriggerNode,
  initialInput: unknown = null
) {
  const inputRecord =
    initialInput && typeof initialInput === "object"
      ? (initialInput as Record<string, unknown>)
      : {};

  return {
    source: "webhookLead",
    firstName: String(inputRecord.firstName ?? node.config.firstName),
    lastName: String(inputRecord.lastName ?? node.config.lastName),
    company: String(inputRecord.company ?? node.config.company),
    emailAddress: String(inputRecord.emailAddress ?? node.config.emailAddress),
  };
}
