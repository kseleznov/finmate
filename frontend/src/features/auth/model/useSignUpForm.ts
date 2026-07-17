'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { apiFetch, ApiError } from '@/shared/api/client';
import { useAuth } from '@/entities/user';
import { useTranslation } from '@/entities/locale';
import type { StoredUser } from '@/shared/api/types';

interface AuthResponse {
  user: StoredUser;
}

const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 3;
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

export function useSignUpForm() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (username.length < MIN_USERNAME_LENGTH) {
      setError(t('auth.usernameTooShort', { min: MIN_USERNAME_LENGTH }));
      return;
    }

    if (!USERNAME_PATTERN.test(username)) {
      setError(t('auth.usernameInvalid'));
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(t('auth.passwordTooShort', { min: MIN_PASSWORD_LENGTH }));
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });
      login(data.user);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('auth.signUpError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    isSubmitting,
    handleSubmit,
  };
}
