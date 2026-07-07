'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { apiFetch, ApiError } from '@/shared/api/client';
import { useAuth } from '@/entities/user';
import type { StoredUser } from '@/shared/api/session';

interface AuthResponse {
  accessToken: string;
  user: StoredUser;
}

const MIN_PASSWORD_LENGTH = 8;

export function useSignUpForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      login(data.accessToken, data.user);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось зарегистрироваться');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit };
}
