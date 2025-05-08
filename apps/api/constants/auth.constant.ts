import { TimeConstants } from "./global.constant.ts";

const JWT_DEFAULT_SECRET = "your-super-secret-key-for-jwt-signing";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || JWT_DEFAULT_SECRET;

const JWT_ALGORITHM = "HS256";

const TOKEN_EXPIRY = TimeConstants.ONE_WEEK;

export { JWT_SECRET, JWT_ALGORITHM, TOKEN_EXPIRY };
