import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20).default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(20),
});

export const newsletterSchema = z.object({
  email: z.email().trim(),
});

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(6),
  remember: z.boolean().optional().default(false),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  email: z.email().trim(),
  password: z.string().min(6),
  remember: z.boolean().optional().default(false),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "New password confirmation does not match",
    path: ["confirmPassword"],
  });
