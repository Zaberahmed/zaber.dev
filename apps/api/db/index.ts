import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_CONNECTION_STRING } from "../constants/global.constant.ts";
import { handleProcedure } from "../utils/response.ts";
import * as schema from "./schema.ts";

// Get database connection details from environment variables
const dbConnectionString = DATABASE_CONNECTION_STRING;

// Create a postgres connection
const client = postgres(dbConnectionString, {
  max: 10, // Maximum number of connections
  connect_timeout: 60, // Timeout for establishing a connection
});

// Function to check database connection
export function checkDatabaseConnection(): Promise<boolean> {
  return handleProcedure(async () => {
    // Simple query to check if database is accessible
    await client`SELECT 1`;
    return true;
  }, "connect to database");
}

// Create Drizzle ORM instance with our schema
export const db = drizzle(client, { schema });
