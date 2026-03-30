import type { FanOutRelationshipNode } from "@monorepo/shared";
import { WorkflowExecutionContext } from "../../services/runIntegrationWorkflow.service";

export async function executeFanOutNode(
  node: FanOutRelationshipNode,
  value: unknown,
  _context: WorkflowExecutionContext
) {
  if (node.config.mode === "partition" && Array.isArray(value)) {
    return {
      out: value,
    };
  }

  return {
    out: [value],
  };
}
