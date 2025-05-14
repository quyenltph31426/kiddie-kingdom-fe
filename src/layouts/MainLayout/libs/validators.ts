import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const createAccountSchema = z.object({
  avatar: z.string().min(1, validationMessages.required('Avatar')),
  username: z.string().min(1, validationMessages.required('Username')).max(50, validationMessages.max(50, 'Username')),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const editAccountSchema = z.object({
  avatar: z.string().min(1, validationMessages.required('Avatar')),
  username: z.string().min(1, validationMessages.required('Username')).max(50, validationMessages.max(50, 'Username')),
  wallet_address: z.string().min(1, validationMessages.required('Username')).max(50, validationMessages.max(50, 'Username')),
});
export type EditAccountSchema = z.infer<typeof editAccountSchema>;
