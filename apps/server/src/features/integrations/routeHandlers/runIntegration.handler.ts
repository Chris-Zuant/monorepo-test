import { ApiResponse } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { getOneIntegrationGraph } from "../repo";

export const integrationRunHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const body = request.body as {id: string};

        const integration = await getOneIntegrationGraph(body.id);

        const response: ApiResponse<{id: string}> = {
            success: true,
            data: {id: integration?.id ?? 'undefined'}
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
