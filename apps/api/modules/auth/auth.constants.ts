import { TimeConstants } from "@scope/constants";
import { env } from "@lib";

export const TOKEN_EXPIRY = TimeConstants.ONE_WEEK;
export const ADMIN_SETUP_KEY = env.ADMIN_SETUP_KEY;

export const AuthSuccessMessages = {
  LOGIN_SUCCESS: "Login successful.",
  SESSION_SUCCESS: "Session retrieved successfully.",
  LOGOUT_SUCCESS: "Logout successful.",
  ADMIN_USER_CREATED: "Admin user created successfully.",
};
