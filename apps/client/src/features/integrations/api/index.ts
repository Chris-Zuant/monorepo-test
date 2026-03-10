/**
 * API helpers for integrations
 */
import axios from 'axios';
import type { Integration } from '../integrations.types';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' });

export const fetchIntegrations = async (): Promise<Integration[]> => {
  const res = await client.get('/integrations/sync');
  return res.data || [];
};

export const updateIntegration = async (newIntegration: any): Promise<boolean> => {
  const res = await client.post(`/integrations/sync`, newIntegration);
  return res.status === 200;
};
