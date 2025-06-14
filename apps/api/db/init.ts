import { DATABASE_CONNECTION_STRING } from "@constants/index.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "npm:pg";
import * as schema from "./schema.ts";

const pool = new Pool({
  connectionString: DATABASE_CONNECTION_STRING,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
});

// Handle pool errors
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
});

const db = drizzle(pool, { schema });

export { db, pool };
