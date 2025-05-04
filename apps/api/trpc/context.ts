import type { Session } from "@shared/types/index.ts";
import { verifyToken } from "../utils/auth.ts";

export interface Context {
  session: Session | null;
  req: Request;
}

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<Context> {
  // Initialize with null session
  const ctx: Context = {
    session: null,
    req,
  };

  // Extract token from Authorization header
  const authHeader = req.headers.get("authorization");
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
