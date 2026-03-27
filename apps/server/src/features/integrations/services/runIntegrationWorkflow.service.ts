import type { IntegrationGraphDefinition } from "@monorepo/shared";
import type {
  BuiltIntegrationWorkflow,
  ExecutableGraphNode,
  TriggerGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";
import {
  ActionNodeExecutor,
  type ActivityFns,
  type ActionRuntimeFns,
} from "./executeActionNode.service";
import {
  RelationshipNodeExecutor,
} from "./executeRelationshipNode.service";
import { TriggerNodeExecutor } from "./executeTriggerNode.service";
import type { RelationshipNodeRuntimeState } from "../nodes/relationship/runtime";
type ExecutableTriggerNode = TriggerGraphNode & ExecutableGraphNode;
type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;

export interface IntegrationWorkflowExecutionResult {
  nodeResults: Record<string, unknown>;
  terminalOutputs: Record<string, unknown[]>;
  visitOrder: string[];
}

// Context object pattern:
// a workflow run has shared mutable state. Wrapping it in a class keeps that
// state in one place instead of passing several Maps and Records through
// every method call.
class WorkflowExecutionContext {
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

  recordNodeResult(nodeId: string, result: unknown) {
    this.visitOrder.push(nodeId);
    this.nodeResults[nodeId] = result;
  }

  async executeOutputNodes(
    nodeId: string,
    outputsByPort: Record<string, unknown[]>,
    executeNode: (nodeId: string, payload: unknown, viaHandle?: string) => Promise<void>
  ) {
    const outgoingEdges = this.getOutgoingEdges(this.graph, nodeId);
    const fallbackPort =
      Object.keys(outputsByPort).length === 1 ? Object.keys(outputsByPort)[0] : undefined;
    const tasks: Promise<void>[] = [];

    for (const [outputPort, payloads] of Object.entries(outputsByPort)) {
      const matchingEdges = outgoingEdges.filter((edge) => {
        const sourceHandle = edge.sourceHandle ?? fallbackPort;
        return sourceHandle === outputPort;
      });

      if (matchingEdges.length === 0) {
        this.terminalOutputs[nodeId] = [...(this.terminalOutputs[nodeId] ?? []), ...payloads];
        continue;
      }

      for (const payload of payloads) {
        for (const edge of matchingEdges) {
          tasks.push(executeNode(edge.target, payload, edge.targetHandle));
        }
      }
    }

    await Promise.all(tasks);
  }

  private getOutgoingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
    return graph.edges.filter((edge) => edge.source === nodeId);
  }
}

export interface IntegrationWorkflowRunnerDependencies {
  actionExecutor: ActionNodeExecutor;
  relationshipExecutor: RelationshipNodeExecutor;
  triggerExecutor: TriggerNodeExecutor;
}

// Orchestrator pattern:
// this class coordinates the run from start nodes through downstream edges,
// but delegates node-specific behavior to the executors above.
export class IntegrationWorkflowRunner {
  constructor(private readonly dependencies: IntegrationWorkflowRunnerDependencies) {}

  async run(
    builtWorkflow: BuiltIntegrationWorkflow,
    initialInput: unknown = null
  ): Promise<IntegrationWorkflowExecutionResult> {
    const context = new WorkflowExecutionContext(builtWorkflow);

    const executeNode = async (
      nodeId: string,
      payload: unknown,
      viaHandle?: string
    ): Promise<void> => {
      const node = context.nodeMap.get(nodeId);
      if (!node) {
        return;
      }

      void viaHandle;
      console.log(`Node Executed: ${node.nodeKind}:${node.type}:${node.id.slice(-5)}`);

      if (this.isTriggerNode(node)) {
        const result = await this.dependencies.triggerExecutor.execute(node, initialInput);
        context.recordNodeResult(node.id, result);
        await context.executeOutputNodes(node.id, { out: [result] }, executeNode);
        return;
      }

      if (this.isRelationshipNode(node)) {
        const outputs = await this.dependencies.relationshipExecutor.execute(node, payload, {
          graph: context.graph,
          runtimeState: context.relationshipRuntimeState,
        });
        if (!outputs) {
          return;
        }

        context.recordNodeResult(node.id, outputs);
        await context.executeOutputNodes(node.id, outputs, executeNode);
        return;
      }

      const result = await this.dependencies.actionExecutor.execute(node, payload);
      context.recordNodeResult(node.id, result);
      await context.executeOutputNodes(node.id, { out: [result] }, executeNode);
    };

    await Promise.all(context.startNodeIds.map((nodeId) => executeNode(nodeId, initialInput)));

    return {
      nodeResults: context.nodeResults,
      terminalOutputs: context.terminalOutputs,
      visitOrder: context.visitOrder,
    };
  }

  private isRelationshipNode(node: ExecutableGraphNode): node is ExecutableRelationshipNode {
    return node.nodeKind === "relationship";
  }

  private isTriggerNode(node: ExecutableGraphNode): node is ExecutableTriggerNode {
    return node.nodeKind === "trigger";
  }
}
