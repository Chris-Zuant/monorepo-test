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

export interface ActionNodeHandler {
  readonly type: ExecutableActionNode["type"];
  execute(node: ExecutableActionNode, payload: unknown): Promise<unknown>;
}

class HttpRequestActionNodeHandler implements ActionNodeHandler {
  readonly type = "httpRequest" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.activityFns.httpRequestActivity({
      node: node as Extract<ExecutableActionNode, { type: "httpRequest" }>,
      payload,
    });
  }
}

class DelayActionNodeHandler implements ActionNodeHandler {
  readonly type = "delay" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode) {
    return this.activityFns.delayActivity({ node: node as Extract<ExecutableActionNode, { type: "delay" }> });
  }
}

class TransformActionNodeHandler implements ActionNodeHandler {
  readonly type = "transform" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.activityFns.transformActivity({
      node: node as Extract<ExecutableActionNode, { type: "transform" }>,
      payload,
    });
  }
}

class RandomFailureActionNodeHandler implements ActionNodeHandler {
  readonly type = "randomFailure" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode) {
    return this.activityFns.randomFailureActivity({
      node: node as Extract<ExecutableActionNode, { type: "randomFailure" }>,
    });
  }
}

class LogActionNodeHandler implements ActionNodeHandler {
  readonly type = "log" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.activityFns.logActivity({
      node: node as Extract<ExecutableActionNode, { type: "log" }>,
      payload,
    });
  }
}

class CreateContactActionNodeHandler implements ActionNodeHandler {
  readonly type = "createContact" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.activityFns.createContactActivity({
      node: node as Extract<ExecutableActionNode, { type: "createContact" }>,
      payload,
    });
  }
}

class BatchActionNodeHandler implements ActionNodeHandler {
  readonly type = "batch" as const;

  constructor(private readonly activityFns: ActivityFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.activityFns.batchActivity({
      node: node as Extract<ExecutableActionNode, { type: "batch" }>,
      payload,
    });
  }
}

class WaitForExternalLinkActionNodeHandler implements ActionNodeHandler {
  readonly type = "waitForExternalLink" as const;

  constructor(private readonly runtimeFns: ActionRuntimeFns) {}

  execute(node: ExecutableActionNode, payload: unknown) {
    return this.runtimeFns.waitForExternalLinkClick(
      node as WaitForExternalLinkNode & ExecutableGraphNode,
      payload
    );
  }
}

// Strategy pattern:
// each action node type gets its own handler object. That keeps the
// behavior for one node type isolated instead of growing one large switch.
//
// Registry pattern:
// the executor stores handlers in a map so callers ask for "the handler for
// this node type" without needing to know which concrete class to create.
export class ActionNodeExecutor {
  private readonly handlers: Map<ExecutableActionNode["type"], ActionNodeHandler>;

  constructor(
    private readonly activityFns: ActivityFns,
    private readonly runtimeFns: ActionRuntimeFns
  ) {
    this.handlers = new Map<ExecutableActionNode["type"], ActionNodeHandler>([
      ["httpRequest", new HttpRequestActionNodeHandler(this.activityFns)],
      ["delay", new DelayActionNodeHandler(this.activityFns)],
      ["transform", new TransformActionNodeHandler(this.activityFns)],
      ["randomFailure", new RandomFailureActionNodeHandler(this.activityFns)],
      ["log", new LogActionNodeHandler(this.activityFns)],
      ["createContact", new CreateContactActionNodeHandler(this.activityFns)],
      ["batch", new BatchActionNodeHandler(this.activityFns)],
      ["waitForExternalLink", new WaitForExternalLinkActionNodeHandler(this.runtimeFns)],
    ]);
  }

  async execute(node: ExecutableActionNode, payload: unknown) {
    const handler = this.handlers.get(node.type);
    if (!handler) {
      throw new Error(`No action handler registered for node type "${node.type}"`);
    }

    return handler.execute(node, payload);
  }
}
