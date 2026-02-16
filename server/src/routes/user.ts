import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { User, ApiResponse } from '@monorepo/shared';
import { fakeAuth } from '../middleware/auth';

export const userRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth }, async (request, reply) => {
    const user: User = {
      id: 'meow',
      name: 'chris',
      email: 'chris@zuant.com',
      createdAt: new Date(),
    };

    const response: ApiResponse<User> = {
      success: true,
      data: user
    };

    return reply.send(response);
  });
}

