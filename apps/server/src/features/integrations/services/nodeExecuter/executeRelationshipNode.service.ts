import type { RelationshipGraphNode } from "@monorepo/shared";
import { executeCollectNode } from "../../nodes/relationship/collect.node";
import { executeConditionNode } from "../../nodes/relationship/condition.node";
import { executeFanOutNode } from "../../nodes/relationship/fanOut.node";
import { executeJoinNode } from "../../nodes/relationship/join.node";
import { executeMapNode } from "../../nodes/relationship/map.node";
import { executeReduceNode } from "../../nodes/relationship/reduce.node";
import { WorkflowExecutionContext } from "../runIntegrationWorkflow.service";

type RelationshipNodeExecutorFn<TNode extends RelationshipGraphNode = RelationshipGraphNode> = (
  node: TNode,
  payload: unknown,
  context: WorkflowExecutionContext
) => Promise<Record<string, unknown[]> | null>;

// Registry pattern, simplified:
// we still centralize lookup by node type, but we use plain functions instead
// of tiny handler classes because the node modules already contain the real logic.
const relationshipNodeExecutors = {
  condition: executeConditionNode,
  fanOut: executeFanOutNode,
  join: executeJoinNode,
  collect: executeCollectNode,
  map: executeMapNode,
  reduce: executeReduceNode,
} satisfies {
  [K in RelationshipGraphNode["type"]]: RelationshipNodeExecutorFn<
    Extract<RelationshipGraphNode, { type: K }>
  >;
};

export class RelationshipNodeExecutor {
  async execute(
    node: RelationshipGraphNode,
    payload: unknown,
    context: WorkflowExecutionContext
  ) {
    const executor = relationshipNodeExecutors[node.type] as RelationshipNodeExecutorFn;
    return executor(node, payload, context);
  }
}
