import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index.ts";

try {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations completed successfully");
} catch (error) {
  console.error("Error during migration:", error);
  Deno.exit(1);
}

Deno.exit(0);
