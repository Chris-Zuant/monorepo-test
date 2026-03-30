import type { IntegrationGraphDefinition } from "@monorepo/shared";
import {
  type BuiltIntegrationWorkflow,
  IntegrationWorkflowBuilder,
} from "./integrationWorkflowBuilder.service";
import { NodeExecuter } from "./nodeExecuter/_executeNode.service";

export interface IntegrationWorkflowExecutionResult {
  nodeResults: Record<string, unknown>;
  terminalOutputs: Record<string, unknown[]>;
  visitOrder: string[];
}

export interface RelationshipNodeRuntimeState {
  values: unknown[];
  waiters: Array<() => void>;
  executed: boolean;
}

// Context object pattern:
// a workflow run has shared mutable state. Wrapping it in a class keeps that
// state in one place instead of passing several Maps and Records through
// every method call.
export class WorkflowExecutionContext {
  readonly terminalOutputs: Record<string, unknown[]> = {};
  readonly nodeResults: Record<string, unknown> = {};
  readonly visitOrder: string[] = [];
  readonly relationshipRuntimeState = new Map<string, RelationshipNodeRuntimeState>();

  constructor(readonly builtWorkflow: BuiltIntegrationWorkflow) {}

  get graph() {
    return this.builtWorkflow.graph;
  }

  get nodeMap() {
    return this.builtWorkflow.nodeMap;
  }

  get startNodeIds() {
    return this.builtWorkflow.startNodeIds;
  }

  getRuntimeState(nodeId: string) {

    let runtimeState = this.relationshipRuntimeState.get(nodeId);

    if (!runtimeState) {
      runtimeState = {
        values: [],
        waiters: [],
        executed: false,
      };
      this.relationshipRuntimeState.set(nodeId, runtimeState);
    }

    return runtimeState;
    
  }

  recordNodeResult(nodeId: string, result: unknown) {
    this.visitOrder.push(nodeId);
    this.nodeResults[nodeId] = result;
  }

  getOutgoingEdges(nodeId: string) {
    return this.graph.edges.filter((edge) => edge.source === nodeId);
  }

  getIncomingEdges(nodeId: string) {
    return this.graph.edges.filter((edge) => edge.target === nodeId);
  }

  waitForRelationshipExecution(nodeId: string) {
    const runtimeState = this.getRuntimeState(nodeId);

    return new Promise<void>((resolve) => {
      runtimeState.waiters.push(resolve);
    });
  }

  resolveRelationshipWaiters(nodeId: string) {
    const runtimeState = this.getRuntimeState(nodeId);

    for (const resolve of runtimeState.waiters) {
      resolve();
    }

    runtimeState.waiters = [];
  }
}

// Orchestrator pattern:
// this class coordinates the run from start nodes through downstream edges,
// but delegates node-specific behavior to the executors above.
export class IntegrationWorkflowRunner {

  private workflowExecutionContext: WorkflowExecutionContext;

  constructor(graph: IntegrationGraphDefinition) {
    const builtWorkflow = IntegrationWorkflowBuilder.build(graph);
    this.workflowExecutionContext = new WorkflowExecutionContext(builtWorkflow);
  }

  async run(): Promise<IntegrationWorkflowExecutionResult> {

    const nodeExecuter = new NodeExecuter();

    const startNodePromises = this.workflowExecutionContext.startNodeIds.map((nodeId) => nodeExecuter.executeNode(this.workflowExecutionContext, nodeId))

    await Promise.all(startNodePromises);

    return {
      nodeResults: this.workflowExecutionContext.nodeResults,
      terminalOutputs: this.workflowExecutionContext.terminalOutputs,
      visitOrder: this.workflowExecutionContext.visitOrder,
    };
  }

}
