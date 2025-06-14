import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { NotFoundErrorMessages } from "../../constants/index.ts";
import { schema, db } from "../../db/index.ts";
import type { DeleteUserByIdInput, GetUserByIdInput } from "./user.schema.ts";
import type { UserListResponse, UserResponse } from "./user.types.ts";

class UserService {
  private users = schema.users;

  async getAllUsers(): Promise<UserListResponse> {
    const allUsers = await db
      .select({
        id: this.users.id,
        email: this.users.email,
        name: this.users.name,
        isAdmin: this.users.isAdmin,
        createdAt: this.users.createdAt,
        updatedAt: this.users.updatedAt,
      })
      .from(this.users);

    return {
      users: allUsers,
      count: allUsers.length,
    };
  }

  async getUserById(input: GetUserByIdInput): Promise<UserResponse> {
    const user = await db
      .select({
        id: this.users.id,
        email: this.users.email,
        name: this.users.name,
        isAdmin: this.users.isAdmin,
        createdAt: this.users.createdAt,
        updatedAt: this.users.updatedAt,
      })
      .from(this.users)
      .where(eq(this.users.id, input.id))
      .limit(1);

    if (user.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: NotFoundErrorMessages.NOT_FOUND_RESOURCE_MESSAGE,
      });
    }

    return user[0];
  }

  async deleteUserById(input: DeleteUserByIdInput): Promise<void> {
    // Check if user exists
    const existingUser = await db
      .select({ id: this.users.id })
      .from(this.users)
      .where(eq(this.users.id, input.id))
      .limit(1);

    if (existingUser.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: NotFoundErrorMessages.NOT_FOUND_RESOURCE_MESSAGE,
      });
    }

    // Delete user
    await db.delete(this.users).where(eq(this.users.id, input.id));
  }

  async deleteAllUsers(): Promise<number> {
    // Get count before deletion
    const userCount = await db
      .select({ count: this.users.id })
      .from(this.users);
    const count = userCount.length;

    // Delete all users
    await db.delete(this.users);

    return count;
  }
}

export const userService = new UserService();
