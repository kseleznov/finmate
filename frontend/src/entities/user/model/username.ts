import { z } from 'zod';
import { getStoredLocale, translate } from '@/shared/lib/i18n';

const MIN_USERNAME_LENGTH = 3;
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

export function usernameSchema() {
  const locale = getStoredLocale();

  return z
    .string()
    .trim()
    .min(
      MIN_USERNAME_LENGTH,
      translate(locale, 'auth.usernameTooShort', { min: MIN_USERNAME_LENGTH })
    )
    .regex(USERNAME_PATTERN, translate(locale, 'auth.usernameInvalid'));
}
