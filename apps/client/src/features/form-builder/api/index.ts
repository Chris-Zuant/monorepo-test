/**
 * API helpers for form-builder feature
 */
import axios from 'axios';
import type { Form } from '../form-builder.types';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' });

export const saveForm = async (form: Partial<Form>): Promise<Form> => {
  const res = await client.post('/forms', form);
  return res.data;
};

export const fetchForms = async (): Promise<Form[]> => {
  const res = await client.get('/forms');
  return res.data || [];
};
