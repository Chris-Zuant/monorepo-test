import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getMongoClient } from "../db/mongoDbConnectionManager";

const DATABASE_NAME = "App";

const mongoClient = getMongoClient();
const authDb = mongoClient.db(DATABASE_NAME);
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "development-better-auth-secret-change-me-123456",
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
  user: {
    modelName: "app_users",
  },
  session: {
    modelName: "auth_sessions",
  },
  account: {
    modelName: "auth_accounts",
  },
  verification: {
    modelName: "auth_verifications",
  },
});
