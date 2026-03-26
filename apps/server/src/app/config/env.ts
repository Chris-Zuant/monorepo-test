import dotenv from 'dotenv';
import path from 'path';

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development";

const envPaths = [
  ".env",
  ".env.local",
  envFile,
  `${envFile}.local`,
];

// Load from lowest to highest priority, allowing later files to override earlier values.
for (const envPath of envPaths) {
  dotenv.config({
    path: path.resolve(process.cwd(), envPath),
    override: true,
  });
}

const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL!;
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

export default {
  CLIENT_URL,
  PORT,
  HOST,
  NODE_ENV
};
