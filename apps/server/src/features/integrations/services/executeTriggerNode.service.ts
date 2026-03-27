import type { TriggerGraphNode } from "@monorepo/shared";
import type { ExecutableGraphNode } from "./integrationWorkflowBuilder.service";
import { startNode } from "../nodes/trigger/start.node";
import { internalLeadFormNode } from "../nodes/trigger/internalLeadForm.node";
import { webhookLeadNode } from "../nodes/trigger/webhookLead.node";

type ExecutableTriggerNode = TriggerGraphNode & ExecutableGraphNode;

export interface TriggerNodeHandler {
  readonly type: ExecutableTriggerNode["type"];
  execute(node: ExecutableTriggerNode, initialInput?: unknown): Promise<unknown>;
}

class StartTriggerNodeHandler implements TriggerNodeHandler {
  readonly type = "start" as const;

  async execute(node: ExecutableTriggerNode) {
    return startNode(node as Extract<ExecutableTriggerNode, { type: "start" }>);
  }
}

class InternalLeadFormTriggerNodeHandler implements TriggerNodeHandler {
  readonly type = "internalLeadForm" as const;

  async execute(node: ExecutableTriggerNode) {
    return internalLeadFormNode(
      node as Extract<ExecutableTriggerNode, { type: "internalLeadForm" }>
    );
  }
}

class WebhookLeadTriggerNodeHandler implements TriggerNodeHandler {
  readonly type = "webhookLead" as const;

  async execute(node: ExecutableTriggerNode, initialInput?: unknown) {
    return webhookLeadNode(
      node as Extract<ExecutableTriggerNode, { type: "webhookLead" }>,
      initialInput
    );
  }
}

// Strategy pattern:
// triggers look similar from the runner's point of view, but each one
// knows how to bootstrap workflow input differently.
export class TriggerNodeExecutor {
  private readonly handlers: Map<ExecutableTriggerNode["type"], TriggerNodeHandler> = new Map<
    ExecutableTriggerNode["type"],
    TriggerNodeHandler
  >([
    ["start", new StartTriggerNodeHandler()],
    ["internalLeadForm", new InternalLeadFormTriggerNodeHandler()],
    ["webhookLead", new WebhookLeadTriggerNodeHandler()],
  ]);

  async execute(node: ExecutableTriggerNode, initialInput: unknown = null) {
    const handler = this.handlers.get(node.type);
    if (!handler) {
      throw new Error(`No trigger handler registered for node type "${node.type}"`);
    }

    return handler.execute(node, initialInput);
  }
}

export async function executeTriggerNode(
  node: ExecutableTriggerNode,
  initialInput: unknown = null
) {
  return new TriggerNodeExecutor().execute(node, initialInput);
}
