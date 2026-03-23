import { ApiResponse, IntegrationGraphDefinition } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { getOneIntegrationGraph } from "../repo";

export const getIntegrationGraphHandler = async (
    request: FastifyRequest<{ Params: { integrationId: string } }>,
    reply: FastifyReply
): Promise<void> => {
    const graph = await getOneIntegrationGraph(request.params.integrationId);

    if (!graph) {
        return reply.status(404).send({
            success: false,
            error: "Integration graph not found"
        });
    }

    const response: ApiResponse<IntegrationGraphDefinition> = {
        success: true,
        data: graph
    };

    return reply.send(response);
};
