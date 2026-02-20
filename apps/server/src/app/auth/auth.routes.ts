import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { loginHandler } from './routeHandlers/login.handler';
import { logoutHandler } from './routeHandlers/logout.handler';

export const authRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // POST /auth/login - User login
  app.post('/login', loginHandler);

  // POST /auth/logout - User logout
  app.post('/logout', logoutHandler);
};
