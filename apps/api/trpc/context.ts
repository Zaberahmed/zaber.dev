import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { verifyToken } from "@lib";

export type TContext = Awaited<ReturnType<typeof createContext>>;

export async function createContext(opts: CreateNextContextOptions) {
  const { req } = opts;
  // Initialize with null session
  const ctx = {
    session: null,
    req,
  };

  // Extract token from Authorization header

  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return ctx;
  }

  // Get the token part
  const token = authHeader.substring(7);
  if (!token) {
    return ctx;
  }

  // Verify and set the session
  const session = await verifyToken(token);
  return { ...ctx, session };
}
