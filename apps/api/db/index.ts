import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";
import { DATABASE_CONNECTION_STRING } from "../constants/global.constant.ts";

// Get database connection details from environment variables
const connectionString = DATABASE_CONNECTION_STRING;

console.log("connectionString", connectionString);
// Create a postgres connection
const client = postgres(connectionString, {
  max: 10, // Maximum number of connections
});

// Create Drizzle ORM instance with our schema
export const db = drizzle(client, { schema });
