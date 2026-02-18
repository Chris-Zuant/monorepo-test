export interface Integration {
  id: string;
  name: string;
  enabled?: boolean;
  config?: Record<string, any>;
}
