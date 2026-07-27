import type { AuthMode } from './types';

export const TABS: { mode: AuthMode; labelKey: 'auth.signIn' | 'auth.signUp' }[] = [
  { mode: 'signIn', labelKey: 'auth.signIn' },
  { mode: 'signUp', labelKey: 'auth.signUp' },
] as const;

export const MIN_PASSWORD_LENGTH = 8;
