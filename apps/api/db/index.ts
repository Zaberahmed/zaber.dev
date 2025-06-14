import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { Pool } from "npm:pg";

export { drizzle, schema, Pool };
