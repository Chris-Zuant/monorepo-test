import { proxyActivities } from "@temporalio/workflow";
import { createWaitForExternalLinkClickRuntime } from "../../temporal/runtime";
import { ActionNodeExecutor } from "./executeActionNode.service";
import { RelationshipNodeExecutor } from "./executeRelationshipNode.service";
import { TriggerNodeExecutor } from "./executeTriggerNode.service";
import type * as activities from "../../temporal/activities"
import { WorkflowExecutionContext } from "../runIntegrationWorkflow.service";

const {
  httpRequestActivity,
  delayActivity,
  transformActivity,
  logActivity,
  randomFailureActivity,
  createContactActivity,
  batchActivity,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export interface IntegrationWorkflowRunnerDependencies {
  actionExecutor: ActionNodeExecutor;
  relationshipExecutor: RelationshipNodeExecutor;
  triggerExecutor: TriggerNodeExecutor;
};

export class NodeExecuter {

    private dependencies: IntegrationWorkflowRunnerDependencies = {
        actionExecutor: new ActionNodeExecutor(
        {
            httpRequestActivity,
            delayActivity,
            transformActivity,
            logActivity,
            randomFailureActivity,
            createContactActivity,
            batchActivity,
        },
        {
            waitForExternalLinkClick: createWaitForExternalLinkClickRuntime(),
        }
        ),
        relationshipExecutor: new RelationshipNodeExecutor(),
        triggerExecutor: new TriggerNodeExecutor(),
    }

    constructor() {};

    public executeNode = async (workflowExecutionContext: WorkflowExecutionContext, nodeId: string, payload: unknown = null): Promise<void> => {

        const node = workflowExecutionContext.nodeMap.get(nodeId);
        if (!node) return;

        console.log(`Node Executed: ${node.nodeKind}:${node.type}:${node.id.slice(-5)}`);

        if (node.nodeKind === "trigger") {
            const result = await this.dependencies.triggerExecutor.execute(node);
            workflowExecutionContext.recordNodeResult(node.id, result);
            await this.executeOutputNodes(workflowExecutionContext, node.id, { out: [result] });
            return;
        }

        if (node.nodeKind === "relationship") {
            const outputs = await this.dependencies.relationshipExecutor.execute(node, payload, workflowExecutionContext);
            if (!outputs) {
                return;
            }

            workflowExecutionContext.recordNodeResult(node.id, outputs);
            await this.executeOutputNodes(workflowExecutionContext, node.id, outputs);
            return;
        }

        if(node.nodeKind === 'action') {
            const result = await this.dependencies.actionExecutor.execute(node, payload);
            workflowExecutionContext.recordNodeResult(node.id, result);
            await this.executeOutputNodes(workflowExecutionContext, node.id, { out: [result] });
        }

    };


    async executeOutputNodes(
        workflowExecutionContext: WorkflowExecutionContext,
        nodeId: string,
        outputsByPort: Record<string, unknown[]>
    ) {
        const outgoingEdges = workflowExecutionContext.getOutgoingEdges(nodeId);
        const fallbackPort = Object.keys(outputsByPort).length === 1 ? Object.keys(outputsByPort)[0] : undefined;
        const tasks: Promise<void>[] = [];

        for (const [outputPort, payloads] of Object.entries(outputsByPort)) {
            const matchingEdges = outgoingEdges.filter((edge) => {
                const sourceHandle = edge.sourceHandle ?? fallbackPort;
                return sourceHandle === outputPort;
            });

            if (matchingEdges.length === 0) {
                workflowExecutionContext.terminalOutputs[nodeId] = [...(workflowExecutionContext.terminalOutputs[nodeId] ?? []), ...payloads];
                continue;
            }

            for (const payload of payloads) {
                for (const edge of matchingEdges) {
                    tasks.push(this.executeNode(workflowExecutionContext, edge.target, payload));
                }
            }
        }

        await Promise.all(tasks);
    }

}
