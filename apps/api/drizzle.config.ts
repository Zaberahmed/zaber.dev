import type { Config } from "drizzle-kit";
import { DATABASE_CONNECTION_STRING } from "./constants/global.constant.ts";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_CONNECTION_STRING,
  },
} satisfies Config;
