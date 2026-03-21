import type { ActionGraphNode } from "@monorepo/shared";
import type * as activities from "../temporal/activities";
import type { ExecutableGraphNode } from "./integrationWorkflowBuilder.service";

export type ActivityFns = Pick<
  typeof activities,
  | "httpRequestActivity"
  | "delayActivity"
  | "transformActivity"
  | "randomFailureActivity"
  | "logActivity"
  | "createContactActivity"
  | "checkConditionActivity"
  | "batchActivity"
>;

type ExecutableActionNode = ActionGraphNode & ExecutableGraphNode;

export async function executeActionNode(
  node: ExecutableActionNode,
  payload: unknown,
  activityFns: ActivityFns
) {
  switch (node.type) {
    case "httpRequest":
      return activityFns.httpRequestActivity({
        ...node.config,
        body: node.config.body ?? payload,
      });
    case "delay":
      return activityFns.delayActivity(node.config);
    case "transform":
      return activityFns.transformActivity({ data: payload });
    case "randomFailure":
      return activityFns.randomFailureActivity(node.config);
    case "log":
      return activityFns.logActivity(
        node.config.level
          ? {
              message:
                node.config.message ||
                (typeof payload === "string" ? payload : JSON.stringify(payload)),
              level: node.config.level,
            }
          : {
              message:
                node.config.message ||
                (typeof payload === "string" ? payload : JSON.stringify(payload)),
            }
      );
    case "createContact": {
      const payloadRecord =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};

      return activityFns.createContactActivity({
        email: node.config.email || String(payloadRecord.email ?? ""),
        name: node.config.name || String(payloadRecord.name ?? ""),
      });
    }
    case "checkCondition":
      return activityFns.checkConditionActivity({
        value:
          typeof node.config.value === "number"
            ? node.config.value
            : Number(payload ?? 0),
      });
    case "batch":
      return activityFns.batchActivity({
        items: Array.isArray(payload) ? payload : [payload],
      });
  }
}
