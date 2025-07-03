import { z } from "zod";

// Prisma Role enum: USER, ADMIN, MODERATOR
export const userSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().int().min(0).max(120),
  role: z.enum(["USER", "ADMIN", "MODERATOR"]),
});

// TypeScript type from schema (for frontend types too)
export type UserInput = z.infer<typeof userSchema>;
