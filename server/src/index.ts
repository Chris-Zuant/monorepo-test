import Fastify from 'fastify';
import cors from '@fastify/cors';
import {userRoutes} from './routes/user';

const app = Fastify();

// Enable CORS for the Vite dev server origin
app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

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
