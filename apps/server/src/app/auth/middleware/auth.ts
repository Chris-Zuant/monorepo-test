import { FastifyReply, FastifyRequest } from 'fastify';
import { getAuthSession } from '../session';

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const session = await getAuthSession(request);

  if (!session?.session || !session.user) {
    return reply.status(401).send({ success: false, error: 'Unauthorized' });
  }
};
