import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse } from '@monorepo/shared';
import { requireAuth } from '../../app/auth/middleware/auth';
import { getCurrentAuthMethodsHandler } from './routeHandlers/getCurrentAuthMethods.handler';
import { getCurrentUserHandler } from './routeHandlers/getCurrentUser.handler';
import { getUsersHandler } from './routeHandlers/getUsers.handler';
import { createUserHandler } from './routeHandlers/createUser.handler';

export const userRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get<{ Reply: ApiResponse<User> }>('/me', { preHandler: requireAuth }, getCurrentUserHandler);
  app.get<{ Reply: ApiResponse<string[]> }>('/auth-methods', { preHandler: requireAuth }, getCurrentAuthMethodsHandler);

  // GET / - Retrieve list of users
  app.get<{ Reply: ApiResponse<User[]> }>('/', { preHandler: requireAuth }, getUsersHandler);

  // POST / - Create a new use TEST
  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: requireAuth }, createUserHandler);
}
