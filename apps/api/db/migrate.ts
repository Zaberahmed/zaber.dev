import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index.ts";

try {
  await migrate(db, { migrationsFolder: "./db/migrations" });
} catch (error) {
  console.error("Error during migration:", error);
  Deno.exit(1);
}

Deno.exit(0);
