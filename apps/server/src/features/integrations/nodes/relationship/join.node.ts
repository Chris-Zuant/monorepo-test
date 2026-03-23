import type { JoinRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";
import {
  getIncomingEdges,
  getRuntimeState,
  resolveRelationshipWaiters,
  waitForRelationshipExecution,
} from "./runtime";

function buildJoinOutputs(node: JoinRelationshipNode, values: unknown[]) {
  if (node.config.mode === "any") {
    return {
      out: [values[0]],
    };
  }

  const output =
    node.config.mode === "barrier"
      ? { in: values }
      : node.config.emitMode === "object"
        ? { in: values }
        : values;

  return {
    out: [output],
  };
}

export async function executeJoinNode(
  node: JoinRelationshipNode,
  payload: unknown,
  context: ExecuteRelationshipNodeContext
) {
  const incomingEdges = getIncomingEdges(context.graph, node.id);
  const runtimeState = getRuntimeState(context.runtimeState, node.id);

  if (runtimeState.executed) {
    return null;
  }

  runtimeState.values.push(payload);

  if (node.config.mode === "any") {
    runtimeState.executed = true;
    const outputs = buildJoinOutputs(node, [payload]);
    resolveRelationshipWaiters(runtimeState);
    return outputs;
  }

  const expectedCount = node.config.expectedCount ?? Math.max(incomingEdges.length, 1);
  if (runtimeState.values.length < expectedCount || expectedCount === 0) {
    await waitForRelationshipExecution(runtimeState);
    return null;
  }

  runtimeState.executed = true;
  const outputs = buildJoinOutputs(node, runtimeState.values.slice(0, expectedCount));
  resolveRelationshipWaiters(runtimeState);
  return outputs;
}
