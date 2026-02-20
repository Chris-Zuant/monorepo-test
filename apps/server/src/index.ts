import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './features/account/user.routes';
import env from './app/config/env';

const app = Fastify();

// Enable CORS for the Vite dev server origin
app.register(cors, {
  origin: env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
const port = env.PORT;
const host = env.HOST;

// Register additional routes
app.register(userRoutes, {prefix: '/user'});

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
    app.log.error(err);
    process.exit(1);
  }
};

start();
