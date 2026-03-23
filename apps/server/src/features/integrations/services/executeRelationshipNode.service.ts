import type {
  ExecutableGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";
import { executeCollectNode } from "../nodes/relationship/collect.node";
import { executeConditionNode } from "../nodes/relationship/condition.node";
import { executeFanOutNode } from "../nodes/relationship/fanOut.node";
import { executeJoinNode } from "../nodes/relationship/join.node";
import { executeMapNode } from "../nodes/relationship/map.node";
import { executeReduceNode } from "../nodes/relationship/reduce.node";
import type { ExecuteRelationshipNodeContext } from "../nodes/relationship/runtime";

type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;

export async function executeRelationshipNode(
  node: ExecutableRelationshipNode,
  payload: unknown,
  context: ExecuteRelationshipNodeContext
) {
  switch (node.type) {
    case "condition":
      return executeConditionNode(node, payload, context);
    case "fanOut":
      return executeFanOutNode(node, payload, context);
    case "join":
      return executeJoinNode(node, payload, context);
    case "collect":
      return executeCollectNode(node, payload, context);
    case "map":
      return executeMapNode(node, payload, context);
    case "reduce":
      return executeReduceNode(node, payload, context);
  }
}
