/**
 * API client for user-related requests
 */

import axios from 'axios';
import type { User } from '@monorepo/shared';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer faketoken',
  },
});

export const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await apiClient.get('/user');
    return res.data?.data || null;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
