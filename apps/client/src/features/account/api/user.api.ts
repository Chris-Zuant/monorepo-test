/**
 * API client for user-related requests
 */

import axios from 'axios';
import type { User } from '@monorepo/shared';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await apiClient.get('/user/me');
    return res.data?.data || null;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentAuthMethods = async (): Promise<string[]> => {
  const res = await apiClient.get('/user/auth-methods');
  return res.data?.data ?? [];
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await apiClient.get('/user');
  return res.data?.data ?? [];
};

export const fetchUser = fetchCurrentUser;

export default apiClient;
