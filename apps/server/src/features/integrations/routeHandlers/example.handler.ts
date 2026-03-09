import { ApiResponse } from "@monorepo/shared";
import { FastifyRequest, FastifyReply } from "fastify";
import { getTemporalClient } from "../../../app/temporal/client";
import { welcomeWorkflow } from "../temporal/workflows/example.workflow";

export const exampleHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {

    const client = await getTemporalClient();

    const handle = await client.workflow.start(welcomeWorkflow, {
        taskQueue: "monolith-task-queue",
        workflowId: `welcome-${Date.now()}`,
        args: ['chris'],
    });


    const response: ApiResponse<any> = {
        success: true,
        data: {workflowId: handle.workflowId }
    };

    return reply.send(response);

};
