import type { Secret } from "./types.ts";

function loadEnvVariables() {
  const secrets: Secret[] = [
    "CORS_ALLOWED_ORIGINS",
    "JWT_SECRET",
    "ADMIN_SETUP_KEY",
    "DATABASE_URL",
  ];
  for (const secret of secrets) {
    if (!Deno.env.get(secret)) {
      throw new Error(`${secret} not set`);
    }
  }
  return secrets.reduce((acc, secret) => {
    acc[secret] = Deno.env.get(secret) || "";
    return acc;
  }, {} as Record<Secret, string>);
}
export const env = loadEnvVariables();
