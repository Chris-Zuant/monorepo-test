import { FastifyReply, FastifyRequest } from 'fastify';

export const fakeAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const auth = request.headers.authorization as string | undefined;
  console.log('Athorizations Token:', auth)
  if (auth !== 'Bearer faketoken') {
    return reply.status(401).send({ success: false, error: 'Unauthorized' });
  }
};
