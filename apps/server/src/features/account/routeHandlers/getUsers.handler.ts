import { FastifyReply, FastifyRequest } from 'fastify';
import type { User, ApiResponse } from '@monorepo/shared';
import { logUser } from '@monorepo/shared';

/**
 * GET / - Retrieve list of users
 */
export const getUsersHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const user: User = {
    id: 'meow',
    name: 'chris',
    email: 'chris@zuant.com',
    createdAt: new Date(),
  };

  logUser(user);

  const response: ApiResponse<User> = {
    success: true,
    data: user
  };

  return reply.send(response);
};
