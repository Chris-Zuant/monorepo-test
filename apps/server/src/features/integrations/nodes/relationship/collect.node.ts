import type { CollectRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";
import {
  getRuntimeState,
  resolveRelationshipWaiters,
  waitForRelationshipExecution,
} from "./runtime";

function buildCollectOutputs(values: unknown[]) {
  return {
    out: [values],
  };
}

export async function executeCollectNode(
  node: CollectRelationshipNode,
  payload: unknown,
  context: ExecuteRelationshipNodeContext
) {
  const runtimeState = getRuntimeState(context.runtimeState, node.id);

  if (runtimeState.executed) {
    return null;
  }

  runtimeState.values.push(payload);

  if (runtimeState.values.length < node.config.count) {
    await waitForRelationshipExecution(runtimeState);
    return null;
  }

  runtimeState.executed = true;
  const outputs = buildCollectOutputs(runtimeState.values.slice(0, node.config.count));
  resolveRelationshipWaiters(runtimeState);
  return outputs;
}
