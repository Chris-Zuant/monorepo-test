/**
 * API helpers for integrations
 */
import axios from 'axios';
import type { Integration } from '../integrations.types';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' });

export const fetchIntegrations = async (): Promise<Integration[]> => {
  const res = await client.get('/integrations');
  return res.data || [];
};

export const testIntegration = async (id: string): Promise<boolean> => {
  const res = await client.post(`/integrations/${id}/test`);
  return res.status === 200;
};
