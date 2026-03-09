/**
 * API client for integration-related requests
 */

import axios from 'axios';
import type { User } from '@monorepo/shared';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer faketoken',
  },
});

export const integrationTemporalTest = async (): Promise<User | null> => {
  try {
    const res = await apiClient.post('/integration', {});
    return res.data?.data || null;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
