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

export interface RelationshipNodeHandler {
  readonly type: ExecutableRelationshipNode["type"];
  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ): Promise<Record<string, unknown[]> | null>;
}

class ConditionRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "condition" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeConditionNode(
      node as Extract<ExecutableRelationshipNode, { type: "condition" }>,
      payload,
      context
    );
  }
}

class FanOutRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "fanOut" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeFanOutNode(
      node as Extract<ExecutableRelationshipNode, { type: "fanOut" }>,
      payload,
      context
    );
  }
}

class JoinRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "join" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeJoinNode(
      node as Extract<ExecutableRelationshipNode, { type: "join" }>,
      payload,
      context
    );
  }
}

class CollectRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "collect" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeCollectNode(
      node as Extract<ExecutableRelationshipNode, { type: "collect" }>,
      payload,
      context
    );
  }
}

class MapRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "map" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeMapNode(
      node as Extract<ExecutableRelationshipNode, { type: "map" }>,
      payload,
      context
    );
  }
}

class ReduceRelationshipNodeHandler implements RelationshipNodeHandler {
  readonly type = "reduce" as const;

  execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    return executeReduceNode(
      node as Extract<ExecutableRelationshipNode, { type: "reduce" }>,
      payload,
      context
    );
  }
}

// Strategy + Registry pattern:
// relationship nodes have different execution rules, so each rule lives in a
// small handler class and this executor acts as the lookup point.
export class RelationshipNodeExecutor {
  private readonly handlers: Map<
    ExecutableRelationshipNode["type"],
    RelationshipNodeHandler
  > = new Map<ExecutableRelationshipNode["type"], RelationshipNodeHandler>([
    ["condition", new ConditionRelationshipNodeHandler()],
    ["fanOut", new FanOutRelationshipNodeHandler()],
    ["join", new JoinRelationshipNodeHandler()],
    ["collect", new CollectRelationshipNodeHandler()],
    ["map", new MapRelationshipNodeHandler()],
    ["reduce", new ReduceRelationshipNodeHandler()],
  ]);

  async execute(
    node: ExecutableRelationshipNode,
    payload: unknown,
    context: ExecuteRelationshipNodeContext
  ) {
    const handler = this.handlers.get(node.type);
    if (!handler) {
      throw new Error(`No relationship handler registered for node type "${node.type}"`);
    }

    return handler.execute(node, payload, context);
  }
}

export async function executeRelationshipNode(
  node: ExecutableRelationshipNode,
  payload: unknown,
  context: ExecuteRelationshipNodeContext
) {
  return new RelationshipNodeExecutor().execute(node, payload, context);
}
