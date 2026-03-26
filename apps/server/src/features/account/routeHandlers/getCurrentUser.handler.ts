import { FastifyReply, FastifyRequest } from "fastify";
import type { ApiResponse, User } from "@monorepo/shared";
import { getAuthSession } from "../../../app/auth/session";
import { getCurrentAppUser, getCurrentAppUserByEmail } from "../repo";

export const getCurrentUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const session = await getAuthSession(request);

  if (!session?.user?.id) {
    return reply.status(401).send({ success: false, error: "Unauthorized" });
  }

  const user =
    (await getCurrentAppUser(session.user.id)) ??
    (session.user.email ? await getCurrentAppUserByEmail(session.user.email) : null) ??
    {
      id: session.user.id,
      name: session.user.name ?? "",
      email: session.user.email ?? "",
      createdAt: new Date(),
    };

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  };

  return reply.send(response);
};
