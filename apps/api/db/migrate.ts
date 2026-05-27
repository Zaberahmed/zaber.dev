import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { load } from "@std/dotenv";
import * as schema from "./schema.ts";
import { closePool, createPool } from "./utils.ts";

let dbConnectionString = Deno.env.get("DATABASE_URL") || "";
const args = Deno.args;

// Dynamically load environment variables based on arguments
if (args.length > 0 && args[0] === "--local") {
  console.log("Running migration in local mode...");

  try {
    await load({
      envPath: "../../.env",
      export: true,
    });
    dbConnectionString = Deno.env.get("DATABASE_URL") || dbConnectionString;
  } catch (error) {
    console.warn(
      "Failed to load environment file:",
      error instanceof Error ? error.message : String(error),
    );
  }
} else if (args.length > 0 && args[0] === "--prod") {
  console.log("Running migration in production mode...");

  try {
    await load({
      envPath: "../../.env.production",
      export: true,
    });
    dbConnectionString = Deno.env.get("DATABASE_URL") || dbConnectionString;
  } catch (error) {
    console.warn(
      "Failed to load .env.production file:",
      error instanceof Error ? error.message : String(error),
    );
  }
} else {
  console.log("No specific mode provided (--local or --prod)");
}

const pool = createPool(dbConnectionString);

const db = drizzle(pool, { schema });

try {
  console.log("Starting migration...");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migration completed successfully");
} catch (error) {
  console.error("Error during migration:", error);
  await closePool(pool);
  Deno.exit(1);
}

await closePool(pool);
Deno.exit(0);
