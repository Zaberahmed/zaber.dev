const TimeConstants = {
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
} as const;

const JWT_DEFAULT_SECRET = "your-super-secret-key-for-jwt-signing";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || JWT_DEFAULT_SECRET;

const JWT_ALGORITHM = "HS256";

const TOKEN_EXPIRY = TimeConstants.ONE_WEEK;

const ADMIN_DEFAULT_SETUP_KEY = "your-super-secret-setup-key";

const ADMIN_SETUP_KEY =
  Deno.env.get("ADMIN_SETUP_KEY") || ADMIN_DEFAULT_SETUP_KEY;

const DEFAULT_DATABASE_URL =
  "postgres://postgres:postgres@localhost:5432/portfolio";
const DATABASE_CONNECTION_STRING =
  Deno.env.get("DATABASE_URL") || DEFAULT_DATABASE_URL;
export {
  TimeConstants,
  JWT_SECRET,
  JWT_ALGORITHM,
  TOKEN_EXPIRY,
  ADMIN_SETUP_KEY,
  DATABASE_CONNECTION_STRING,
};
