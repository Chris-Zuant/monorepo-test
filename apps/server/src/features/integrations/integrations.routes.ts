import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse, IntegrationGraphDefinition } from '@monorepo/shared';
import { fakeAuth } from '../../app/auth/middleware/auth';
import { exampleHandler } from './routeHandlers/example.handler';
import { integrationSyncHandler } from './routeHandlers';
import { getAllIntegrationGraphsHandler } from './routeHandlers/getAllIntergrations.handler';
import { getIntegrationGraphHandler } from './routeHandlers/getIntergrationGraph.handler';
import { integrationRunHandler } from './routeHandlers/runIntegration.handler';
import { externalLinkClickHandler } from './routeHandlers/externalLinkClick.handler';

export const integrationRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: fakeAuth}, exampleHandler);

  app.post<{ Reply: ApiResponse<User> }>('/run', { preHandler: fakeAuth}, integrationRunHandler);
  app.get('/link/:workflowId/:nodeId', externalLinkClickHandler);

  app.register(integrationSyncRoutes, {prefix: '/sync'});

}

const integrationSyncRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{Reply: ApiResponse<IntegrationGraphDefinition>}>('/', { preHandler: fakeAuth}, integrationSyncHandler)
  app.get<{Reply: ApiResponse<IntegrationGraphDefinition[]>}>('/', { preHandler: fakeAuth}, getAllIntegrationGraphsHandler)
  app.get<{Params: { integrationId: string }; Reply: ApiResponse<IntegrationGraphDefinition>}>('/:integrationId', { preHandler: fakeAuth}, getIntegrationGraphHandler )

}
