import type { ActionGraphNode } from "@monorepo/shared";
import type * as activities from "../temporal/activities/index";
import type { ExecutableGraphNode } from "./integrationWorkflowBuilder.service";

export type ActivityFns = Pick<
  typeof activities,
  | "httpRequestActivity"
  | "delayActivity"
  | "transformActivity"
  | "randomFailureActivity"
  | "logActivity"
  | "createContactActivity"
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
      return activityFns.httpRequestActivity({ node, payload });
    case "delay":
      return activityFns.delayActivity({ node });
    case "transform":
      return activityFns.transformActivity({ node, payload });
    case "randomFailure":
      return activityFns.randomFailureActivity({ node });
    case "log":
      return activityFns.logActivity({ node, payload });
    case "createContact":
      return activityFns.createContactActivity({ node, payload });
    case "batch":
      return activityFns.batchActivity({ node, payload });
  }
}
