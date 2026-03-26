import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './features/account/user.routes';
import env from './app/config/env';
import { integrationRoutes } from './features/integrations/integrations.routes';
import { auth } from './app/auth';

const app = Fastify();

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
app.all('/api/auth/*', async (request, reply) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const headers = new Headers();

  Object.entries(request.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => headers.append(key, entry));
      return;
    }

    if (typeof value === 'string') {
      headers.set(key, value);
    }
  });

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : request.body
        ? JSON.stringify(request.body)
        : undefined;

  const requestInit: RequestInit = {
    method: request.method,
    headers,
  };

  if (body !== undefined) {
    requestInit.body = body;
  }

  const response = await auth.handler(new Request(url.toString(), requestInit));

  reply.status(response.status);
  response.headers.forEach((value, key) => {
    reply.header(key, value);
  });

  return reply.send(await response.text());
});

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
