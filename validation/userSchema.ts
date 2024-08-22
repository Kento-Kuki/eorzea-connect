import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  avatar: z.string().min(1, 'Avatar is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  race: z.string().min(1, 'Race is required'),
  job: z.string().min(1, 'Job is required'),
  server: z.string().min(1, 'Server is required'),
  dataCenter: z.string().min(1, 'Data Center is required'),
  playStyle: z.array(z.string()).min(1, 'At least one play style is required'),
  activeTime: z
    .array(z.string())
    .min(1, 'At least one active time is required'),
});
