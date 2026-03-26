import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import type { User, ApiResponse, IntegrationGraphDefinition } from '@monorepo/shared';
import { requireAuth } from '../../app/auth/middleware/auth';
import { exampleHandler } from './routeHandlers/example.handler';
import { integrationSyncHandler } from './routeHandlers';
import { getAllIntegrationGraphsHandler } from './routeHandlers/getAllIntergrations.handler';
import { getIntegrationGraphHandler } from './routeHandlers/getIntergrationGraph.handler';
import { integrationRunHandler } from './routeHandlers/runIntegration.handler';
import { externalLinkClickHandler } from './routeHandlers/externalLinkClick.handler';

export const integrationRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{ Reply: ApiResponse<User> }>('/', { preHandler: requireAuth}, exampleHandler);

  app.post<{ Reply: ApiResponse<User> }>('/run', { preHandler: requireAuth}, integrationRunHandler);
  app.get('/link/:workflowId/:nodeId', externalLinkClickHandler);

  app.register(integrationSyncRoutes, {prefix: '/sync'});

}

const integrationSyncRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

  app.post<{Reply: ApiResponse<IntegrationGraphDefinition>}>('/', { preHandler: requireAuth}, integrationSyncHandler)
  app.get<{Reply: ApiResponse<IntegrationGraphDefinition[]>}>('/', { preHandler: requireAuth}, getAllIntegrationGraphsHandler)
  app.get<{Params: { integrationId: string }; Reply: ApiResponse<IntegrationGraphDefinition>}>('/:integrationId', { preHandler: requireAuth}, getIntegrationGraphHandler )

}
