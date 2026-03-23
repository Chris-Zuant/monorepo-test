import type { ReduceRelationshipNode } from "@monorepo/shared";
import type { ExecuteRelationshipNodeContext } from "./runtime";
import {
  getIncomingEdges,
  getRuntimeState,
  resolveRelationshipWaiters,
  waitForRelationshipExecution,
} from "./runtime";

function reduceValues(
  values: unknown[],
  strategy: "sum" | "concat" | "merge" | "custom",
  initialValue?: unknown
) {
  switch (strategy) {
    case "sum":
      return values.reduce(
        (total, value) => Number(total) + Number(value ?? 0),
        Number(initialValue ?? 0)
      );
    case "concat":
      return values.reduce<string>(
        (result, value) => result + String(value ?? ""),
        String(initialValue ?? "")
      );
    case "merge":
      return values.reduce<Record<string, unknown>>((result, value) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return { ...result, ...(value as Record<string, unknown>) };
        }

        return result;
      }, (initialValue as Record<string, unknown>) ?? {});
    case "custom":
      return {
        initialValue,
        values,
      };
  }
}

function buildReduceOutputs(node: ReduceRelationshipNode, values: unknown[]) {
  return {
    out: [reduceValues(values, node.config.strategy, node.config.initialValue)],
  };
}

export async function executeReduceNode(
  node: ReduceRelationshipNode,
  payload: unknown,
  context: ExecuteRelationshipNodeContext
) {
  const incomingEdges = getIncomingEdges(context.graph, node.id);
  const runtimeState = getRuntimeState(context.runtimeState, node.id);

  if (runtimeState.executed) {
    return null;
  }

  runtimeState.values.push(payload);

  const expectedCount = node.config.expectedCount ?? Math.max(incomingEdges.length, 1);
  if (runtimeState.values.length < expectedCount || expectedCount === 0) {
    await waitForRelationshipExecution(runtimeState);
    return null;
  }

  runtimeState.executed = true;
  const outputs = buildReduceOutputs(node, runtimeState.values.slice(0, expectedCount));
  resolveRelationshipWaiters(runtimeState);
  return outputs;
}
