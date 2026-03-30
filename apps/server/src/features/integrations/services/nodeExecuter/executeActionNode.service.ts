import type { ActionGraphNode } from "@monorepo/shared";
import type * as activities from "../../temporal/activities/index";
import { type actionRuntimeFactories } from "../../temporal/runtime";

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

type ActionRuntimeFactoryMap = Pick<typeof actionRuntimeFactories, "waitForExternalLinkClick">;

export type ActionRuntimeFns = {
  [K in keyof ActionRuntimeFactoryMap]: ReturnType<ActionRuntimeFactoryMap[K]>;
};

type ActionNodeExecutorFn<TNode extends ActionGraphNode = ActionGraphNode> = (
  node: TNode,
  payload: unknown
) => Promise<unknown>;

// Registry pattern, simplified:
// this keeps one central dispatch table, but the table points straight to
// functions instead of wrapper classes.
export class ActionNodeExecutor {
  private readonly actionNodeExecutors = {
    httpRequest: (node, payload) =>
      this.activityFns.httpRequestActivity({ node, payload }),
    delay: (node) => this.activityFns.delayActivity({ node }),
    transform: (node, payload) => this.activityFns.transformActivity({ node, payload }),
    randomFailure: (node) => this.activityFns.randomFailureActivity({ node }),
    log: (node, payload) => this.activityFns.logActivity({ node, payload }),
    createContact: (node, payload) => this.activityFns.createContactActivity({ node, payload }),
    batch: (node, payload) => this.activityFns.batchActivity({ node, payload }),
    waitForExternalLink: (node, payload) => this.runtimeFns.waitForExternalLinkClick(node, payload),
  } satisfies {
    [K in ActionGraphNode["type"]]: ActionNodeExecutorFn<Extract<ActionGraphNode, { type: K }>>;
  };

  constructor(
    private readonly activityFns: ActivityFns,
    private readonly runtimeFns: ActionRuntimeFns
  ) {}

  async execute(node: ActionGraphNode, payload: unknown) {
    const executor = this.actionNodeExecutors[node.type] as ActionNodeExecutorFn;
    return executor(node, payload);
  }
}
