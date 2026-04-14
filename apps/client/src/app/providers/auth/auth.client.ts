import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { ssoClient } from "@better-auth/sso/client";

const authBaseUrl = `${
  import.meta.env.VITE_API_URL || "http://localhost:3000"
}/api/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  credentials: "include",
  plugins: [
    organizationClient(),
    ssoClient({
      domainVerification: {
        enabled: import.meta.env.MODE !== 'development',
      },
    }),
  ],
});
