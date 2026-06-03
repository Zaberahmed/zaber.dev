export interface Session {
  userId: string;
  isAdmin: boolean;
  expiresAt: number;
}
export type Secret =
  | "CORS_ALLOWED_ORIGINS"
  | "JWT_SECRET"
  | "ADMIN_SETUP_KEY"
  | "DATABASE_URL";
