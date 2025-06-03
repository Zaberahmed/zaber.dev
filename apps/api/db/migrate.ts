import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, closeDatabaseConnection } from "./index.ts";

try {
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migration completed successfully");
} catch (error) {
  console.error("Error during migration:", error);
  await closeDatabaseConnection();
  Deno.exit(1);
}

await closeDatabaseConnection();
Deno.exit(0);
