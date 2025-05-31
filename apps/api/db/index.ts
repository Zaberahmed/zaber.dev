import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  DATABASE_CONNECTION_STRING,
  DEPLOYMENT_ENV,
} from "../constants/global.constant.ts";
import { handleProcedure } from "../utils/response.ts";
import * as schema from "./schema.ts";
import { Client } from "jsr:@db/postgres";

const dbConnectionString = DATABASE_CONNECTION_STRING;
const isProductionEnv = DEPLOYMENT_ENV === "production";

export const newClient = new Client(dbConnectionString);

const res = await newClient.connect();
console.log("Database connection established:", res);

export const client = postgres(dbConnectionString, {
  max: 10, // Maximum number of connections
  connect_timeout: 60, // Timeout for establishing a connection
  ssl: isProductionEnv ? { rejectUnauthorized: false } : false,
});

export function checkDatabaseConnection(client: Client): Promise<boolean> {
  return handleProcedure(async () => {
    // Simple query to check if database is accessible
    await client.queryArray`SELECT 1`;
    console.log("Database connection is healthy");
    return true;
  }, "connect to database");
}

export const db = drizzle(client, { schema });
