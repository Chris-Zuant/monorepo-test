/**
 * Environment and runtime configuration
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const config = {
  apiUrl: API_URL,
  // Add other config values here
};

export default config;
