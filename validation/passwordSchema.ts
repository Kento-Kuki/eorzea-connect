import { z } from 'zod';

export const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
});
