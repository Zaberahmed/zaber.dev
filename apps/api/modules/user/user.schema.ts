import { z } from "zod";

export const getUserByIdSchema = z.object({
  id: z.string().uuid(),
});

export const deleteUserByIdSchema = z.object({
  id: z.string().uuid(),
});

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type DeleteUserByIdInput = z.infer<typeof deleteUserByIdSchema>;
