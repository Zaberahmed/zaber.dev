import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  DATABASE_CONNECTION_STRING,
  DEPLOYMENT_ENV,
} from "../constants/global.constant.ts";
import { handleProcedure } from "../utils/response.ts";
import * as schema from "./schema.ts";

const dbConnectionString = DATABASE_CONNECTION_STRING;
const isProductionEnv = DEPLOYMENT_ENV === "production";

export const client = postgres(dbConnectionString, {
  max: 10, // Maximum number of connections
  connect_timeout: 60, // Timeout for establishing a connection
  ssl: isProductionEnv ? "require" : false, // Use SSL in production
});

export function checkDatabaseConnection(
  client: postgres.Sql<Record<PropertyKey, never>>
): Promise<boolean> {
  return handleProcedure(async () => {
    // Simple query to check if database is accessible
    await client`SELECT 1`;
    return true;
  }, "connect to database");
}

export const db = drizzle(client, { schema });
