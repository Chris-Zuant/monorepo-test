import type { CollectRelationshipNode } from "@monorepo/shared";
import { WorkflowExecutionContext } from "../../services/runIntegrationWorkflow.service";

function buildCollectOutputs(values: unknown[]) {
  return {
    out: [values],
  };
}

export async function executeCollectNode(
  node: CollectRelationshipNode,
  payload: unknown,
  context: WorkflowExecutionContext
) {
  const runtimeState = context.getRuntimeState(node.id);

  if (runtimeState.executed) {
    return null;
  }

  runtimeState.values.push(payload);

  if (runtimeState.values.length < node.config.count) {
    await context.waitForRelationshipExecution(node.id);
    return null;
  }

  runtimeState.executed = true;
  const outputs = buildCollectOutputs(runtimeState.values.slice(0, node.config.count));
  context.resolveRelationshipWaiters(node.id);
  return outputs;
}
