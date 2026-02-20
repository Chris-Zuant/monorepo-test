import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './user.routes';
import type { FastifyInstance } from 'fastify';

describe('User Feature Integration', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    
    // Register CORS
    await app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    });

    // Register user routes
    await app.register(userRoutes, { prefix: '/user' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 on GET /user', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user',
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return valid ApiResponse on GET /user', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user',
    });

    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.name).toBeDefined();
    expect(body.data.email).toBeDefined();
  });

  it('should return 200 on POST /user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/user',
    });

    expect(response.statusCode).toBe(200);
  });

  it('should create user with all required fields on POST /user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/user',
    });

    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('createdAt');
  });

  it('should return Content-Type application/json', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user',
    });

    expect(response.headers['content-type']).toContain('application/json');
  });

  it('should handle multiple GET requests independently', async () => {
    const response1 = await app.inject({
      method: 'GET',
      url: '/user',
    });

    const response2 = await app.inject({
      method: 'GET',
      url: '/user',
    });

    const body1 = JSON.parse(response1.body);
    const body2 = JSON.parse(response2.body);

    expect(body1.success).toBe(true);
    expect(body2.success).toBe(true);
    expect(body1.data.id).toBe(body2.data.id); // Same mock data
  });
});
