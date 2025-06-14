import { TimeConstants } from "../../constants/global.constant.ts";

const JWT_DEFAULT_SECRET = "your-super-secret-key-for-jwt-signing";
const ADMIN_DEFAULT_SETUP_KEY = "your-super-secret-setup-key";

export const JWT_SECRET = Deno.env.get("JWT_SECRET") || JWT_DEFAULT_SECRET;
export const JWT_ALGORITHM = "HS256";
export const TOKEN_EXPIRY = TimeConstants.ONE_WEEK;
export const ADMIN_SETUP_KEY =
  Deno.env.get("ADMIN_SETUP_KEY") || ADMIN_DEFAULT_SETUP_KEY;

export const AuthSuccessMessages = {
  LOGIN_SUCCESS: "Login successful.",
  SESSION_SUCCESS: "Session retrieved successfully.",
  LOGOUT_SUCCESS: "Logout successful.",
  ADMIN_USER_CREATED: "Admin user created successfully.",
};
