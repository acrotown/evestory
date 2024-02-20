import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

let PROD = process.env.NODE_ENV === "production";

async function main() {
  const db = drizzle(
    createClient({
      url: process.env.TURSO_DB_URL as string,
      authToken: PROD ? (process.env.TURSO_DB_AUTH_TOKEN as string) : undefined,
    }),
  );

  console.log("Running migrations");

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log("Migrated successfully");

  process.exit(0);
}

main().catch((e) => {
  console.error("Migration failed");
  console.error(e);
  process.exit(1);
});
