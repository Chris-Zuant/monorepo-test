import type { JoinRelationshipNode } from "@monorepo/shared";
import { WorkflowExecutionContext } from "../../services/runIntegrationWorkflow.service";

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
  context: WorkflowExecutionContext
) {
  const incomingEdges = context.getIncomingEdges(node.id);
  const runtimeState = context.getRuntimeState(node.id);

  if (runtimeState.executed) {
    return null;
  }

  runtimeState.values.push(payload);

  if (node.config.mode === "any") {
    runtimeState.executed = true;
    const outputs = buildJoinOutputs(node, [payload]);
    context.resolveRelationshipWaiters(node.id);
    return outputs;
  }

  const expectedCount = node.config.expectedCount ?? Math.max(incomingEdges.length, 1);
  if (runtimeState.values.length < expectedCount || expectedCount === 0) {
    await context.waitForRelationshipExecution(node.id);
    return null;
  }

  runtimeState.executed = true;
  const outputs = buildJoinOutputs(node, runtimeState.values.slice(0, expectedCount));
  context.resolveRelationshipWaiters(node.id);
  return outputs;
}
