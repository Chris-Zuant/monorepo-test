import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsersHandler } from './getUsers.handler';
import type { FastifyRequest, FastifyReply } from 'fastify';

describe('getUsersHandler', () => {
  let mockReply: any;

  beforeEach(() => {
    mockReply = {
      send: vi.fn().mockReturnValue(Promise.resolve()),
    };
  });

  it('should return a user object with correct structure', async () => {
    const mockRequest = {} as FastifyRequest;

    await getUsersHandler(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledOnce();
    const response = mockReply.send.mock.calls[0][0];

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBe('meow');
    expect(response.data.name).toBe('chris');
    expect(response.data.email).toBe('chris@zuant.com');
  });

  it('should have a valid createdAt timestamp', async () => {
    const mockRequest = {} as FastifyRequest;

    await getUsersHandler(mockRequest, mockReply);

    const response = mockReply.send.mock.calls[0][0];
    expect(response.data.createdAt).toBeInstanceOf(Date);
    expect(response.data.createdAt.getTime()).toBeGreaterThan(0);
  });

  it('should call reply.send with ApiResponse type', async () => {
    const mockRequest = {} as FastifyRequest;

    await getUsersHandler(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: expect.any(Boolean),
        data: expect.any(Object),
      })
    );
  });
});
