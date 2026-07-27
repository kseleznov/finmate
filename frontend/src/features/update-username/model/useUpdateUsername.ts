'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/entities/user';
import { useTranslation } from '@/entities/locale';
import { ApiError } from '@/shared/api/client';
import { updateUsername } from '../api/updateUsername';
import { createUsernameFormSchema, type UsernameFormValues } from './schema';
import type { KeyboardEvent } from 'react';

export function useUpdateUsername(onDone: () => void) {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const usernameSchema = createUsernameFormSchema();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: user?.username ?? '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUsername,
    onSuccess: (data) => {
      updateUser(data);

      onDone();
    },
    onError: (err) => {
      setError('root', {
        message: err instanceof ApiError ? err.message : t('common.genericError'),
      });
    },
  });

  const error = errors.username?.message ?? errors.root?.message;

  const save = handleSubmit((values) => mutate(values.username));

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      save();
    }
  }

  return {
    error,
    isPending,
    register,
    save,
    cancel: onDone,
    handleKeyDown,
  };
}
