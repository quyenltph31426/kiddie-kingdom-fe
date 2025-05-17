import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const BANNER_TYPES = ['HOME_HERO', 'CATEGORY_TOP', 'SIDEBAR', 'POPUP'] as const;

export const bannerSchema = z.object({
  title: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  subtitle: z.string().optional(),
  image: z.string({ required_error: validationMessages.required() }).min(1, { message: validationMessages.required() }),
  link: z.string().optional(),
  type: z.enum(BANNER_TYPES, {
    required_error: validationMessages.required(),
  }),
  order: z.string().refine((val) => !isNaN(+val) && +val >= 0, {
    message: 'Order must be a positive number',
  }),
  isActive: z.boolean().default(true),
});

export type BannerSchema = z.infer<typeof bannerSchema>;
