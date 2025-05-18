import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const VOUCHER_TYPES = ['PERCENTAGE', 'FIXED_AMOUNT'] as const;

export const voucherSchema = z.object({
  code: z.string().min(1, { message: validationMessages.required() }),
  name: z.string().min(1, { message: validationMessages.required() }),
  description: z.string().optional(),
  type: z.enum(VOUCHER_TYPES, {
    required_error: validationMessages.required(),
  }),
  value: z.string().min(0, { message: 'Value must be a positive number' }),
  minOrderValue: z.string().min(0, { message: 'Minimum order value must be a positive number' }),
  maxDiscountValue: z.string().min(0, { message: 'Maximum discount value must be a positive number' }),
  usageLimit: z.string().min(0, { message: 'Usage limit must be a positive integer' }),
  startDate: z.date({ required_error: validationMessages.required() }),
  endDate: z.date({ required_error: validationMessages.required() }),
  isActive: z.boolean().default(true),
});

export type VoucherSchema = z.infer<typeof voucherSchema>;
