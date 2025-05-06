import { SignJWT, jwtVerify } from "jose";
import type { Session } from "../types/index.ts";
import { compare, hash } from "bcrypt";
import {
  JWT_ALGORITHM,
  JWT_SECRET,
  TOKEN_EXPIRY,
} from "../constants/global.constant.ts";

// Convert string to Uint8Array for JWT signing
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export async function createToken(
  session: Omit<Session, "expiresAt">
): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY;

  const jwt = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());

  return jwt;
}

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

export async function verifyAdminToken(token: string): Promise<boolean> {
  const session = await verifyToken(token);
  return Boolean(session && session.isAdmin);
}
