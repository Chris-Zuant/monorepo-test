import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse } from '@monorepo/shared';
import { fakeAuth } from '../../app/auth/middleware/auth';
import { getUsersHandler } from './routeHandlers/getUsers.handler';
import { createUserHandler } from './routeHandlers/createUser.handler';

export const userRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // GET / - Retrieve list of users
  app.get<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth }, getUsersHandler);

  // POST / - Create a new use
  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth }, createUserHandler);
}

