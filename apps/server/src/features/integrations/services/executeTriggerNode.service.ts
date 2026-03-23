import type { TriggerGraphNode } from "@monorepo/shared";
import type { ExecutableGraphNode } from "./integrationWorkflowBuilder.service";
import { internalLeadFormNode } from "../nodes/trigger/internalLeadForm.node";
import { webhookLeadNode } from "../nodes/trigger/webhookLead.node";

type ExecutableTriggerNode = TriggerGraphNode & ExecutableGraphNode;

export async function executeTriggerNode(
  node: ExecutableTriggerNode,
  initialInput: unknown = null
) {
  switch (node.type) {
    case "internalLeadForm":
      return internalLeadFormNode(node);
    case "webhookLead":
      return webhookLeadNode(node, initialInput);
  }
}
