import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer faketoken',
  },
});

export const runIntegration = async (
  integrationInfo: {id: string}
): Promise<{id: string; workflowId: string; waitLinks: {nodeId: string; label: string; url: string}[]}> => {
  const res = await client.post(`/integrations/run`, integrationInfo);
  return res.data.data;
};
