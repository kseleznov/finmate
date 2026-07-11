'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { apiFetch, ApiError } from '@/shared/api/client';
import { useAuth } from '@/entities/user';
import { useTranslation } from '@/entities/locale';
import type { StoredUser } from '@/shared/api/session';

interface AuthResponse {
  user: StoredUser;
}

export function useSignInForm() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      login(data.user);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('auth.signInError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit };
}
