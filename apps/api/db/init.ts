import { DATABASE_CONNECTION_STRING } from "@constants/index.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { createPool } from "./utils.ts";

const pool = createPool(DATABASE_CONNECTION_STRING);

// Handle pool errors
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle db client", err);
});

const db = drizzle(pool, { schema });

export { db, pool };
