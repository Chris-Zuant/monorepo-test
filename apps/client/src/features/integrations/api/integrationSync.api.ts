import type { ApiResponse, IntegrationGraphDefinition } from "@monorepo/shared";
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

export const fetchIntegrations = async (): Promise<IntegrationGraphDefinition[]> => {
  const res = await client.get<ApiResponse<IntegrationGraphDefinition[]>>('/integrations/sync');
  return res.data.data ?? [];
};

export const fetchIntegration = async (integrationId: string): Promise<IntegrationGraphDefinition> => {
  const res = await client.get<ApiResponse<IntegrationGraphDefinition>>(`/integrations/sync/${integrationId}`);

  if (!res.data.data) {
    throw new Error('Integration not found');
  }

  return res.data.data;
};

export const updateIntegration = async (newIntegration: IntegrationGraphDefinition): Promise<boolean> => {
  const res = await client.post(`/integrations/sync`, newIntegration);
  return res.status === 200;
};
