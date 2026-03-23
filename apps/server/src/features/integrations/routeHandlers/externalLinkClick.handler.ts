import { FastifyReply, FastifyRequest } from "fastify";
import { getTemporalClient } from "../../../app/temporal/client";
import { EXTERNAL_LINK_CLICKED_SIGNAL } from "../temporal/runtime/action/waitForExternalLinkClick.runtime";

export const externalLinkClickHandler = async (
  request: FastifyRequest<{ Params: { workflowId: string; nodeId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { workflowId, nodeId } = request.params;
  const client = await getTemporalClient();
  const handle = client.workflow.getHandle(workflowId);
  const requestUrl = `${request.protocol}://${request.headers.host}${request.url}`;

  await handle.signal(EXTERNAL_LINK_CLICKED_SIGNAL as never, {
    nodeId,
    clickedAt: new Date().toISOString(),
    requestUrl,
  } as never);

  reply
    .type("text/html; charset=utf-8")
    .send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h1>Link clicked</h1>
          <p>The workflow has been resumed.</p>
        </body>
      </html>
    `);
};
