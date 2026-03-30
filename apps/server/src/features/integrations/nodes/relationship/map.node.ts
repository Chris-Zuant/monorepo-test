import type { MapRelationshipNode } from "@monorepo/shared";
import { WorkflowExecutionContext } from "../../services/runIntegrationWorkflow.service";

export async function executeMapNode(
  _node: MapRelationshipNode,
  value: unknown,
  _context: WorkflowExecutionContext
) {
  if (!Array.isArray(value)) {
    return {
      out: [value],
    };
  }

  return {
    out: value,
  };
}
