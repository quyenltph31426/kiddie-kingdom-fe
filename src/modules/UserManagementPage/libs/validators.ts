import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const adminSchema = z.object({
  avatar: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  username: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  email: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }).email(),
  password: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  role: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
});

export type AdminSchema = z.infer<typeof adminSchema>;
