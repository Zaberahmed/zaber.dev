import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      Deno.env.get("DATABASE_URL") ||
      "postgres://postgres:postgres@localhost:5432/portfolio",
  },
} satisfies Config;
