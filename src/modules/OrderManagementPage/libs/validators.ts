import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  description: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  website: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  logo: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
});

export type BrandSchema = z.infer<typeof brandSchema>;
