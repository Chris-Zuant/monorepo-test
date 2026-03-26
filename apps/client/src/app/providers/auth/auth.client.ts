import { createAuthClient } from "better-auth/react";

const authBaseUrl = `${
  import.meta.env.VITE_API_URL || "http://localhost:3000"
}/api/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  credentials: "include",
});
