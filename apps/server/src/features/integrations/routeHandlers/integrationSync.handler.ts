import { ApiResponse, IntegrationGraphDefinition } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { upsertIntegrationGraph } from "../repo";

export const integrationSyncHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const body = request.body as IntegrationGraphDefinition;
        const savedGraph = await upsertIntegrationGraph(body);

        const response: ApiResponse<IntegrationGraphDefinition> = {
            success: true,
            data: savedGraph
        };

        return reply.send(response);
    } catch (error) {
        request.log.error(error, 'Failed to sync integration graph');
        return reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to sync integration graph'
        });
    }
};
