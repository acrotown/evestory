import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "#/drizzle/schema";

let client = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
});

export let db = drizzle(client, { schema, logger: true });