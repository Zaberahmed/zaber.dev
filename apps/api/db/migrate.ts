import { load } from "https://deno.land/std@0.220.1/dotenv/mod.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { closeDatabaseConnection } from "./utils.ts";
import { Pool } from "npm:pg";
import { DATABASE_CONNECTION_STRING } from "../constants/index.ts";
import * as schema from "./schema.ts";

let connectionString = DATABASE_CONNECTION_STRING;
const args = Deno.args;

// Dynamically load environment variables based on arguments
if (args.length > 0 && args[0] === "--local") {
  console.log("Running migration in local mode...");

  try {
    await load({
      envPath: "../../.env.dev",
      export: true,
    });
    connectionString = Deno.env.get("DATABASE_URL") || connectionString;
  } catch (error) {
    console.warn(
      "Failed to load .env.dev file:",
      error instanceof Error ? error.message : String(error)
    );
  }
} else if (args.length > 0 && args[0] === "--prod") {
  console.log("Running migration in production mode...");

  try {
    await load({
      envPath: "../../.env.production",
      export: true,
    });
    connectionString = Deno.env.get("DATABASE_URL") || connectionString;
  } catch (error) {
    console.warn(
      "Failed to load .env.production file:",
      error instanceof Error ? error.message : String(error)
    );
  }
} else {
  console.log("No specific mode provided (--local or --prod)");
}

const pool = new Pool({
  connectionString,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
});

const db = drizzle(pool, { schema });

try {
  console.log("Starting migration...");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migration completed successfully");
} catch (error) {
  console.error("Error during migration:", error);
  await closeDatabaseConnection(pool);
  Deno.exit(1);
}

await closeDatabaseConnection(pool);
Deno.exit(0);
