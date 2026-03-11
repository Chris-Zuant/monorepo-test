import { ApiResponse, IntegrationGraphDefinition } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { getAllIntegrationGraphs } from "../repo";

export const getIntegrationGraphsHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const graphs = await getAllIntegrationGraphs();

    const response: ApiResponse<IntegrationGraphDefinition[]> = {
        success: true,
        data: graphs
    };

    return reply.send(response);
};