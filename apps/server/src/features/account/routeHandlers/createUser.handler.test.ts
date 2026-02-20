import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUserHandler } from './createUser.handler';
import type { FastifyRequest, FastifyReply } from 'fastify';

describe('createUserHandler', () => {
  let mockReply: any;

  beforeEach(() => {
    mockReply = {
      send: vi.fn().mockReturnValue(Promise.resolve()),
    };
  });

  it('should create and return a new user', async () => {
    const mockRequest = {} as FastifyRequest;

    await createUserHandler(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledOnce();
    const response = mockReply.send.mock.calls[0][0];

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
  });

  it('should return user with correct email format', async () => {
    const mockRequest = {} as FastifyRequest;

    await createUserHandler(mockRequest, mockReply);

    const response = mockReply.send.mock.calls[0][0];
    expect(response.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should have a valid id field', async () => {
    const mockRequest = {} as FastifyRequest;

    await createUserHandler(mockRequest, mockReply);

    const response = mockReply.send.mock.calls[0][0];
    expect(response.data.id).toBeDefined();
    expect(typeof response.data.id).toBe('string');
    expect(response.data.id.length).toBeGreaterThan(0);
  });

  it('should have a valid name field', async () => {
    const mockRequest = {} as FastifyRequest;

    await createUserHandler(mockRequest, mockReply);

    const response = mockReply.send.mock.calls[0][0];
    expect(response.data.name).toBeDefined();
    expect(typeof response.data.name).toBe('string');
    expect(response.data.name.length).toBeGreaterThan(0);
  });
});
