import { FastifyReply, FastifyRequest } from "fastify";
import type { ApiResponse } from "@monorepo/shared";
import { getAuthSession } from "../../../app/auth/session";
import { getCurrentUserAuthMethods } from "../repo";

export const getCurrentAuthMethodsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const session = await getAuthSession(request);

  if (!session?.user?.id) {
    return reply.status(401).send({ success: false, error: "Unauthorized" });
  }

  const authMethods = await getCurrentUserAuthMethods(session.user.id);

  const response: ApiResponse<string[]> = {
    success: true,
    data: authMethods,
  };

  return reply.send(response);
};
