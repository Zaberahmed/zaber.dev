import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createInitialAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(1),
  setupKey: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateInitialAdminInput = z.infer<typeof createInitialAdminSchema>;
