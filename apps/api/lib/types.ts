export interface Session {
  userId: string;
  isAdmin: boolean;
  expiresAt: number;
}

export type DeploymentMode = "local" | "production";

export type Secret =
  | "DEPLOYMENT_MODE"
  | "CORS_ALLOWED_ORIGINS"
  | "JWT_SECRET"
  | "ADMIN_SETUP_KEY"
  | "DATABASE_URL";

type BaseEnv = Record<Secret, string>;

export type LocalEnv = BaseEnv & {
  DEPLOYMENT_MODE: "local";
  API_LOCAL_PORT: string;
};

export type ProductionEnv = BaseEnv & {
  DEPLOYMENT_MODE: "production";
};

export type Env = LocalEnv | ProductionEnv;
