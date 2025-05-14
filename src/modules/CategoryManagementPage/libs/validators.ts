import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  description: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  image: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
});

export type CategorySchema = z.infer<typeof categorySchema>;
