import type { Config } from "drizzle-kit";

const databaseUrl = Deno.env.get("DATABASE_URL");

if (!databaseUrl) {
  throw new Error("DATABASE_URL env variable is not set");
}

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: databaseUrl,
  },
} satisfies Config;
