import { ApiResponse, IntegrationNodeType } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { getTemporalClient } from "../../../app/temporal/client";
import { getOneIntegrationGraph } from "../repo";
import { runIntegrationGraphWorkflow } from "../temporal/workflows";

export const integrationRunHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const body = request.body as {id: string};

        const integration = await getOneIntegrationGraph(body.id);
        if (!integration) {
            return reply.status(404).send({
                success: false,
                error: `Integration graph ${body.id} was not found`
            });
        }

        const client = await getTemporalClient();
        const handle = await client.workflow.start(runIntegrationGraphWorkflow, {
            taskQueue: "integration-task-queue",
            workflowId: `integration-run-${integration.id}-${Date.now()}`,
            args: [integration],
            searchAttributes: {
                tenantId: ["acme"], // for per tenant filtering
            },
        });

        const waitLinks = integration.nodes
            .filter((node) => node.nodeKind === 'action' && node.type === IntegrationNodeType.WaitForExternalLink)
            .map((node) => ({
                nodeId: node.id,
                label: node.name,
                url: `${request.protocol}://${request.headers.host}/integrations/link/${handle.workflowId}/${node.id}`
            }));

        const response: ApiResponse<{id: string; workflowId: string; waitLinks: {nodeId: string; label: string; url: string}[]}> = {
            success: true,
            data: {
                id: integration.id,
                workflowId: handle.workflowId,
                waitLinks
            }
        };

        return reply.send(response);
    } catch (error) {
        request.log.error(error, 'Failed to run integration graph');
        return reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to run integration graph'
        });
    }
};
