import { z } from 'zod';
import { usernameSchema } from '@/entities/user';
import { MIN_PASSWORD_LENGTH } from './constants';
import type { TranslateFn } from '@/shared/lib/i18n';

export function createSignInSchema(t: TranslateFn) {
  return z.object({
    email: z.email(t('auth.emailInvalid')),
    password: z.string().min(1, t('auth.passwordRequired')),
  });
}

export function createSignUpSchema(t: TranslateFn) {
  return z.object({
    email: z.email(t('auth.emailInvalid')),
    username: usernameSchema(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, t('auth.passwordTooShort', { min: MIN_PASSWORD_LENGTH })),
  });
}
