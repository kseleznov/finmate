'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/entities/user';
import { useTranslation } from '@/entities/locale';
import { apiFetch, ApiError } from '@/shared/api/client';
import type { StoredUser } from '@/shared/api/types';

const MIN_USERNAME_LENGTH = 3;
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

export function useProfile() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'signIn' | 'signUp'>(
    searchParams.get('mode') === 'signUp' ? 'signUp' : 'signIn'
  );

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isSavingPayday, setIsSavingPayday] = useState(false);

  const startEditingUsername = () => {
    setUsernameDraft(user?.username ?? '');
    setUsernameError(null);
    setIsEditingUsername(true);
  };

  const cancelEditingUsername = () => {
    setIsEditingUsername(false);
    setUsernameError(null);
  };

  const saveUsername = async () => {
    const trimmed = usernameDraft.trim();

    if (trimmed.length < MIN_USERNAME_LENGTH) {
      setUsernameError(t('auth.usernameTooShort', { min: MIN_USERNAME_LENGTH }));
      return;
    }

    if (!USERNAME_PATTERN.test(trimmed)) {
      setUsernameError(t('auth.usernameInvalid'));
      return;
    }

    setIsSavingUsername(true);
    setUsernameError(null);

    try {
      const updated = await apiFetch<StoredUser>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({ username: trimmed }),
      });
      updateUser(updated);
      setIsEditingUsername(false);
    } catch (err) {
      setUsernameError(err instanceof ApiError ? err.message : t('common.genericError'));
    } finally {
      setIsSavingUsername(false);
    }
  };

  const savePayday = async (value: number) => {
    setIsSavingPayday(true);

    try {
      const updated = await apiFetch<StoredUser>('/users/me/payday', {
        method: 'PATCH',
        body: JSON.stringify({ payday: value }),
      });
      updateUser(updated);
    } catch {
      // low-stakes preference toggle — the select simply won't reflect the change
    } finally {
      setIsSavingPayday(false);
    }
  };

  return {
    user,
    isAuthenticated,
    logout,
    mode,
    setMode,
    isEditingUsername,
    usernameDraft,
    setUsernameDraft,
    usernameError,
    isSavingUsername,
    startEditingUsername,
    cancelEditingUsername,
    saveUsername,
    isSavingPayday,
    savePayday,
  };
}
