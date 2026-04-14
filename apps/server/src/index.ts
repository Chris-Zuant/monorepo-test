import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './features/account/user.routes';
import env from './app/config/env';
import { integrationRoutes } from './features/integrations/integrations.routes';
import { betterAuthHandler } from './app/auth';

const app = Fastify();

// for better auth SAML response 
app.addContentTypeParser(
  'application/x-www-form-urlencoded',
  { parseAs: 'string' },
  (_request, body, done) => {
    done(null, body);
  }
);

// Enable CORS for the Vite dev server origin
app.register(cors, {
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
const port = env.PORT;
const host = env.HOST;

// Register additional routes
app.all('/api/auth/*', betterAuthHandler);

app.register(userRoutes, {prefix: '/user'});
app.register(integrationRoutes, {prefix: '/integrations'});

//Not found handler
app.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: "Route not found",
    path: request.url
  });
});

// Start server
const start = async () => {
  try {
    await app.listen({ port, host });
    console.log(`Server is running at http://${host}:${port}`);
  } catch (err) {
    console.error("Failed to start server", err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
