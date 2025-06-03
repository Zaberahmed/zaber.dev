import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "npm:pg";
import {
  DATABASE_CONNECTION_STRING,
  DEPLOYMENT_ENV,
} from "../constants/global.constant.ts";
import { handleProcedure } from "../utils/response.ts";
import * as schema from "./schema.ts";

const dbConnectionString = DATABASE_CONNECTION_STRING;
const isProductionEnv = DEPLOYMENT_ENV === "production";

console.log("Database connection string:", dbConnectionString);

// Create a connection pool with proper SSL configuration for cloud deployment
const requiresSSL =
  dbConnectionString.includes("ssl=require") ||
  dbConnectionString.includes("sslmode=require") ||
  dbConnectionString.includes("neon.tech") ||
  dbConnectionString.includes("supabase.co") ||
  dbConnectionString.includes("planetscale.app") ||
  isProductionEnv;

export const pool = new Pool({
  connectionString: dbConnectionString,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
  ssl: requiresSSL
    ? {
        rejectUnauthorized: false, // Accept self-signed certificates for cloud providers
      }
    : false,
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
