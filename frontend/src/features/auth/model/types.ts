import type { StoredUser } from '@/shared/api/types';
import type { z } from 'zod';
import type { createSignInSchema, createSignUpSchema } from './schema';
import type { FieldValues } from 'react-hook-form';

export interface AuthResponse {
  user: StoredUser;
}

export type AuthMode = 'signIn' | 'signUp';

export type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;

export type SignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface UseAuthFormOptions<TFieldValues extends FieldValues> {
  schema: z.ZodType<TFieldValues, TFieldValues>;
  defaultValues: TFieldValues;
  mutationFn: (payload: TFieldValues) => Promise<AuthResponse>;
  errorMessage: string;
}
