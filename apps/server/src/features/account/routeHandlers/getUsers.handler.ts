import { FastifyReply, FastifyRequest } from 'fastify';
import type { User, ApiResponse } from '@monorepo/shared';
import { getAllAppUsers } from '../repo';

/**
 * GET / - Retrieve list of users
 */
export const getUsersHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const users = await getAllAppUsers();

  const response: ApiResponse<User[]> = {
    success: true,
    data: users
  };

  return reply.send(response);
};
