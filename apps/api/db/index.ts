import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "npm:pg";
import { DATABASE_CONNECTION_STRING } from "../constants/global.constant.ts";
import { handleProcedure } from "../utils/response.ts";
import * as schema from "./schema.ts";

const dbConnectionString = DATABASE_CONNECTION_STRING;

console.log("Database connection string:", dbConnectionString);

export const pool = new Pool({
  connectionString: dbConnectionString,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
});

// Handle pool errors
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
});

export async function checkDatabaseConnection(): Promise<boolean> {
  return await handleProcedure(async () => {
    const client = await pool.connect();
    try {
      // Simple query to check if database is accessible
      await client.query("SELECT 1");
      console.log("Database connection is healthy");
      return true;
    } finally {
      client.release();
    }
  }, "connect to database");
}

export const db = drizzle(pool, { schema });

// Clean shutdown function
export async function closeDatabaseConnection(): Promise<void> {
  await pool.end();
  console.log("Database connection pool closed");
}
