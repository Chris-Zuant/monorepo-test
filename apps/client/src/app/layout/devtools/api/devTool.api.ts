import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

export interface DevToolWaitLink {
  nodeId: string;
  label: string;
  url: string;
}

export const triggerWaitLink = async (waitLinkUrl: string): Promise<string> => {
  const response = await client.get(waitLinkUrl, {
    responseType: 'text',
  });

  return response.data;
};
