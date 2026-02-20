import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { authRoutes } from './auth.routes';
import type { FastifyInstance } from 'fastify';

describe('Auth Feature Integration', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();

    // Register auth routes
    await app.register(authRoutes, { prefix: '/auth' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 on POST /auth/login', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return token on login', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
    });

    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data.token).toBeDefined();
    expect(typeof body.data.token).toBe('string');
  });

  it('should return user object on login', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
    });

    const body = JSON.parse(response.body);
    expect(body.data.user).toBeDefined();
    expect(body.data.user.id).toBeDefined();
    expect(body.data.user.email).toBeDefined();
    expect(body.data.user.name).toBeDefined();
  });

  it('should return 200 on POST /auth/logout', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/logout',
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return success message on logout', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/logout',
    });

    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.message).toBeDefined();
    expect(typeof body.message).toBe('string');
  });

  it('should handle auth flow: login then logout', async () => {
    const loginResponse = await app.inject({
      method: 'POST',
      url: '/auth/login',
    });

    expect(loginResponse.statusCode).toBe(200);
    const loginBody = JSON.parse(loginResponse.body);
    expect(loginBody.data.token).toBeDefined();

    const logoutResponse = await app.inject({
      method: 'POST',
      url: '/auth/logout',
    });

    expect(logoutResponse.statusCode).toBe(200);
    const logoutBody = JSON.parse(logoutResponse.body);
    expect(logoutBody.success).toBe(true);
  });
});
