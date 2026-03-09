import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse } from '@monorepo/shared';
import { fakeAuth } from '../../app/auth/middleware/auth';
import { exampleHandler } from './routeHandlers/example.handler';

export const integrationRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth}, exampleHandler);

  app.register(integrationSyncRoutes, {prefix: '/sync'});

}

const integrationSyncRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

    app.post<{Reply: ApiResponse<any>}>('/', { preHandler: fakeAuth}, exampleHandler)

  }
