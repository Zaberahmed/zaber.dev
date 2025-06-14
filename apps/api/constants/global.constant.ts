const TimeConstants = {
  HALF_SECOND: 0.5,
  ONE_SECOND: 1,
  FIVE_SECONDS: 5,
  TEN_SECONDS: 10,
  THIRTY_SECONDS: 30,
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
} as const;

// Default values
const DEFAULT_DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5432/test";
const DEFAULT_DEPLOYMENT_ENV = "development";

// Environment variables with fallbacks

const DATABASE_CONNECTION_STRING =
  Deno.env.get("DATABASE_URL") || DEFAULT_DATABASE_URL;
const DEPLOYMENT_ENV = Deno.env.get("DEPLOYMENT_ENV") || DEFAULT_DEPLOYMENT_ENV;

export { TimeConstants, DATABASE_CONNECTION_STRING, DEPLOYMENT_ENV };
