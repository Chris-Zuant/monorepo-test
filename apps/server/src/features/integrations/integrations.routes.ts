import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse, IntegrationGraphDefinition } from '@monorepo/shared';
import { fakeAuth } from '../../app/auth/middleware/auth';
import { exampleHandler } from './routeHandlers/example.handler';
import { integrationSyncHandler } from './routeHandlers';
import { getIntegrationGraphsHandler } from './routeHandlers/getIntergration.handler';
import { integrationRunHandler } from './routeHandlers/runIntegration.handler';

export const integrationRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth}, exampleHandler);

  app.post<{ Reply: ApiResponse<User> }>('/run', { preHandler: fakeAuth}, integrationRunHandler);

  app.register(integrationSyncRoutes, {prefix: '/sync'});

}

const integrationSyncRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{Reply: ApiResponse<IntegrationGraphDefinition>}>('/', { preHandler: fakeAuth}, integrationSyncHandler)
  app.get<{Reply: ApiResponse<IntegrationGraphDefinition[]>}>('/', { preHandler: fakeAuth}, getIntegrationGraphsHandler)

}
