import "dotenv-flow/config";

import type { Config } from "drizzle-kit";

let PROD = process.env.NODE_ENV === "production";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL || "http://127.0.0.1:8080",
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  },
} satisfies Config;
