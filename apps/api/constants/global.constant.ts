const TimeConstants = {
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
} as const;

const ADMIN_DEFAULT_SETUP_KEY = "your-super-secret-setup-key";

const ADMIN_SETUP_KEY =
  Deno.env.get("ADMIN_SETUP_KEY") || ADMIN_DEFAULT_SETUP_KEY;

const DEFAULT_DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5432/test";

const DATABASE_CONNECTION_STRING =
  Deno.env.get("DATABASE_URL") || DEFAULT_DATABASE_URL;

export { TimeConstants, ADMIN_SETUP_KEY, DATABASE_CONNECTION_STRING };
