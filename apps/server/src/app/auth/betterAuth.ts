import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getMongoClient } from "../db/mongoDbConnectionManager";
import { ensureSamlifyCompat } from "./samlifyCompat";

ensureSamlifyCompat();
const { sso } = require("@better-auth/sso") as typeof import("@better-auth/sso");

const DATABASE_NAME = "App";

const mongoClient = getMongoClient();
const authDb = mongoClient.db(DATABASE_NAME);
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET ?? "development-better-auth-secret-change-me-123456",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  trustedOrigins: [process.env.CLIENT_URL ?? "http://localhost:5173"],
  database: mongodbAdapter(authDb, {
    client: mongoClient,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            prompt: "select_account",
          },
        },
      }
    : {}),
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      creatorRole: "owner",
      schema: {
        organization: {
          modelName: "auth_organizations",
        },
        member: {
          modelName: "auth_organization_members",
        },
        invitation: {
          modelName: "auth_organization_invitations",
        },
        organizationRole: {
          modelName: "auth_organization_roles",
        },
      },
    }),
    sso({
      modelName: "auth_sso_providers",
      organizationProvisioning: {
        disabled: false,
        defaultRole: "member",
      },
      saml: {
        enableInResponseToValidation: true,
        // Okta's free-trial SAML flow can return without an `InResponseTo` value
        // during local development, which Better Auth treats as IdP-initiated.
        // We allow that only in development so local SSO testing can complete
        // while keeping stricter SP-initiated behavior outside development.
        allowIdpInitiated: process.env.NODE_ENV === "development",
      },
      domainVerification: {
        enabled: process.env.NODE_ENV !== "development",
      },
    }),
  ],

// Additional collections:

  user: {
    modelName: "app_users",
  },
  session: {
    modelName: "auth_sessions",
  },
  // Okta returns to the ACS endpoint with a cross-site POST during SAML flows.
  // In development, Better Auth's extra state cookie check can fail because that
  // cookie is not reliably sent back on the POST, so we disable only that check
  // locally while keeping the stricter behavior outside development.
  account: {
    modelName: "auth_accounts",
    skipStateCookieCheck: process.env.NODE_ENV === "development",
    // We allow trusted SSO/social providers to link to an existing user record
    // during sign-in so enterprise SSO can attach to the same account as
    // email/password or Google when the identities represent the same person.
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "okta"],
      updateUserInfoOnLink: true,
    },
  },
  verification: {
    modelName: "auth_verifications",
  },
});
