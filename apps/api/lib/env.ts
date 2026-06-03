import type { DeploymentMode, Env, Secret } from "./types.ts";

function loadEnvVariables() {
  const secrets: Secret[] = [
    "DEPLOYMENT_MODE",
    "CORS_ALLOWED_ORIGINS",
    "JWT_SECRET",
    "ADMIN_SETUP_KEY",
    "DATABASE_URL",
  ] as const;
  const values = secrets.reduce((acc, secret) => {
    const value = Deno.env.get(secret);

    if (!value) {
      throw new Error(`${secret} not set`);
    }

    acc[secret] = value;
    return acc;
  }, {} as Record<Secret, string>);

  const deploymentMode = values.DEPLOYMENT_MODE as DeploymentMode;

  if (deploymentMode !== "local" && deploymentMode !== "production") {
    throw new Error("DEPLOYMENT_MODE must be local or production");
  }

  if (deploymentMode === "local") {
    const apiLocalPort = Deno.env.get("API_LOCAL_PORT");

    if (!apiLocalPort) {
      throw new Error("API_LOCAL_PORT not set");
    }

    return {
      ...values,
      DEPLOYMENT_MODE: deploymentMode,
      API_LOCAL_PORT: apiLocalPort,
    };
  }

  return {
    ...values,
    DEPLOYMENT_MODE: deploymentMode,
  };
}

export const env: Env = loadEnvVariables();
