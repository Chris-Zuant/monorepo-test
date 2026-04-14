import type { FastifyReply, FastifyRequest } from 'fastify';
import { auth } from '../betterAuth';

export const betterAuthHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isSamlCallbackRequest = request.url.includes('/api/auth/sso/saml2/sp/acs/');
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
      : typeof request.body === 'string'
        ? request.body
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
  // Better Auth can return multiple session-related cookies on auth callbacks.
  // We forward `set-cookie` explicitly so Fastify preserves each cookie instead
  // of relying on generic header iteration, which can flatten multi-cookie headers.
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
  if (isDevelopment && isSamlCallbackRequest) {
    console.log('[better-auth][saml-callback]', {
      path: request.url,
      status: response.status,
      location: response.headers.get('location'),
      setCookieCount: setCookieHeaders.length,
    });
  }

  if (setCookieHeaders.length > 0) {
    reply.header('set-cookie', setCookieHeaders);
  }

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      return;
    }

    reply.header(key, value);
  });

  return reply.send(await response.text());
};
