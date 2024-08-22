import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(40, 'Title must be at most 40 characters long'),
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .min(10, 'Comment must be at least 10 characters long')
    .max(1000, 'Content must be at most 1000 characters long'),
});
