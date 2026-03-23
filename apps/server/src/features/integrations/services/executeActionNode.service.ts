import type { ActionGraphNode, WaitForExternalLinkNode } from "@monorepo/shared";
import type * as activities from "../temporal/activities/index";
import { type actionRuntimeFactories } from "../temporal/runtime";
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

type ActionRuntimeFactoryMap = Pick<typeof actionRuntimeFactories, "waitForExternalLinkClick">;

export type ActionRuntimeFns = {
  [K in keyof ActionRuntimeFactoryMap]: ReturnType<ActionRuntimeFactoryMap[K]>;
};

export async function executeActionNode(
  node: ExecutableActionNode,
  payload: unknown,
  activityFns: ActivityFns,
  runtimeFns: ActionRuntimeFns
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
    case "waitForExternalLink":
      return runtimeFns.waitForExternalLinkClick(
        node as WaitForExternalLinkNode & ExecutableGraphNode,
        payload
      );
  }
}
