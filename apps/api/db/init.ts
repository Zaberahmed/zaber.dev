import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { createPool } from "./utils.ts";
import { env } from "@lib";

const dbConnectionString = env.DATABASE_URL;

const pool = createPool(dbConnectionString);

// Handle pool errors
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle db client", err);
});

const db = drizzle(pool, { schema });

export { db, pool };
