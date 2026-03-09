import { ApiResponse } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";

export const integrationSyncHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {

    const response: ApiResponse<any> = {
        success: true,
        data: {test: 'meow' }
    };

    return reply.send(response);

};