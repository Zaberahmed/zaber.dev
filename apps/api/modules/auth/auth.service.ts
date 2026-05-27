import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@db";
import { ForbiddenErrorMessages, UnauthorizedErrorMessages } from "@constants";
import { createToken, hashPassword, verifyPassword } from "./auth.utils.ts";
import { ADMIN_SETUP_KEY } from "./auth.constants.ts";
import type {
  LoginResponse,
  SessionResponse,
  UserAuthResponse,
} from "./auth.types.ts";
import type { CreateInitialAdminInput, LoginInput } from "./auth.schema.ts";

class AuthService {
  private users = schema.users;

  async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;

    // Find user by email
    const userResults = await db
      .select()
      .from(this.users)
      .where(eq(this.users.email, email))
      .limit(1);
    const user = userResults[0];

    // If user not found or password doesn't match
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: UnauthorizedErrorMessages.UNAUTHORIZED_LOGIN,
      });
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      isAdmin: user.isAdmin,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  }

  async getSession(userId: string): Promise<SessionResponse | null> {
    // Fetch user data based on session
    const userResults = await db
      .select()
      .from(this.users)
      .where(eq(this.users.id, userId))
      .limit(1);
    const user = userResults[0];

    if (!user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  }

  async createInitialAdmin(
    input: CreateInitialAdminInput,
  ): Promise<UserAuthResponse> {
    const { email, password, name, setupKey } = input;

    // Verify setup key from environment variable
    if (setupKey !== ADMIN_SETUP_KEY) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: UnauthorizedErrorMessages.UNAUTHORIZED_SETUP_KEY_MESSAGE,
      });
    }

    // Check if any admin user already exists
    const adminCount = await db
      .select({ count: this.users.id })
      .from(this.users)
      .where(eq(this.users.isAdmin, true));

    if (adminCount.length > 0 && adminCount[0].count) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: ForbiddenErrorMessages.FORBIDDEN_USER_ENTRY,
      });
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Create the admin user
    const newUser = await db
      .insert(this.users)
      .values({
        email,
        passwordHash,
        name,
        isAdmin: true,
      })
      .returning();

    return {
      id: newUser[0].id,
      email: newUser[0].email,
      name: newUser[0].name,
      isAdmin: newUser[0].isAdmin,
    };
  }
}

export const authService = new AuthService();
