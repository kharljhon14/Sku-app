import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required!' })
    .min(1, 'Email is required!')
    .email({ message: 'Invalid email!' }),
  password: z.string({ message: 'Password is required!' }).min(1, 'Password is required!')
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
