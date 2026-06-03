import { jwtVerify } from "jose";
import { env } from "./env.ts";
import type { Session } from "./types.ts";

// Convert string to Uint8Array for JWT signing
export const getSecretKey = () => new TextEncoder().encode(env.JWT_SECRET);

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    return {
      userId: payload.userId as string,
      isAdmin: payload.isAdmin as boolean,
      expiresAt: payload.exp as number,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
