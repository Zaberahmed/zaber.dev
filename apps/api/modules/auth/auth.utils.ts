import { SignJWT } from "jose";
import { TOKEN_EXPIRY } from "./auth.constants.ts";
import { getSecretKey, type Session, verifyToken } from "@lib";

// Web Crypto API for password hashing (scrypt)
// Salt is stored as part of the hash string
export async function hashPassword(password: string): Promise<string> {
  // Generate random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Convert password to buffer
  const passwordBuffer = new TextEncoder().encode(password);

  // Derive key using scrypt (more secure than simple hash)
  const keyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 10000,
    },
    await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits"],
    ),
    256,
  );

  // Convert key to array for storage
  const keyArray = new Uint8Array(keyBuffer);

  // Combine salt and key for storage
  const combined = new Uint8Array(salt.length + keyArray.length);
  combined.set(salt);
  combined.set(keyArray, salt.length);

  // Return as base64 string
  return btoa(String.fromCharCode(...combined));
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  try {
    // Decode the stored hash to get the salt + key
    const combined = Uint8Array.from(
      atob(storedHash)
        .split("")
        .map((c) => c.charCodeAt(0)),
    );

    // Extract salt (first 16 bytes)
    const salt = combined.slice(0, 16);

    // Extract stored key
    const storedKey = combined.slice(16);

    // Convert password to buffer
    const passwordBuffer = new TextEncoder().encode(password);

    // Derive key using same parameters
    const keyBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt,
        iterations: 10000,
      },
      await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits"],
      ),
      256,
    );

    // Convert to array for comparison
    const keyArray = new Uint8Array(keyBuffer);

    // Compare the two keys
    if (keyArray.length !== storedKey.length) {
      return false;
    }

    // Time-safe comparison
    let result = 0;
    keyArray.forEach((value, i) => {
      result |= value ^ storedKey[i];
    });

    return result === 0;
  } catch (error) {
    console.error("Password verification failed:", error);
    return false;
  }
}

export async function createToken(
  session: Omit<Session, "expiresAt">,
): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY;

  const jwt = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());

  return jwt;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const session = await verifyToken(token);
  return Boolean(session && session.isAdmin);
}
