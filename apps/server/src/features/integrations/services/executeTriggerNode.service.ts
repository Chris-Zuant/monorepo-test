import type { TriggerGraphNode } from "@monorepo/shared";
import type { ExecutableGraphNode } from "./integrationWorkflowBuilder.service";
import { startNode } from "../nodes/trigger/start.node";
import { internalLeadFormNode } from "../nodes/trigger/internalLeadForm.node";
import { webhookLeadNode } from "../nodes/trigger/webhookLead.node";

type ExecutableTriggerNode = TriggerGraphNode & ExecutableGraphNode;

export async function executeTriggerNode(
  node: ExecutableTriggerNode,
  initialInput: unknown = null
) {
  switch (node.type) {
    case "start":
      return startNode(node);
    case "internalLeadForm":
      return internalLeadFormNode(node);
    case "webhookLead":
      return webhookLeadNode(node, initialInput);
  }
}
