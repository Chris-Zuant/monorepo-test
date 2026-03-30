import type { TriggerGraphNode } from "@monorepo/shared";
import { startNode } from "../../nodes/trigger/start.node";
import { internalLeadFormNode } from "../../nodes/trigger/internalLeadForm.node";
import { webhookLeadNode } from "../../nodes/trigger/webhookLead.node";

type TriggerNodeExecutorFn<TNode extends TriggerGraphNode = TriggerGraphNode> = (
  node: TNode,
  initialInput?: unknown
) => unknown | Promise<unknown>;

// Registry pattern, simplified:
// trigger dispatch is now just a map of functions keyed by trigger type.
const triggerNodeExecutors = {
  start: startNode,
  internalLeadForm: internalLeadFormNode,
  webhookLead: webhookLeadNode,
} satisfies {
  [K in TriggerGraphNode["type"]]: TriggerNodeExecutorFn<Extract<TriggerGraphNode, { type: K }>>;
};

export class TriggerNodeExecutor {
  async execute(node: TriggerGraphNode, initialInput: unknown = null) {
    const executor = triggerNodeExecutors[node.type] as unknown as TriggerNodeExecutorFn;
    return await executor(node, initialInput);
  }
}
