import type { InternalLeadFormTriggerNode } from "@monorepo/shared";

export function internalLeadFormNode(node: InternalLeadFormTriggerNode) {
  return {
    source: "internalLeadForm",
    firstName: node.config.firstName,
    lastName: node.config.lastName,
    company: node.config.company,
    emailAddress: node.config.emailAddress,
  };
}
