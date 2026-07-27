'use client';

import { useForm, type DefaultValues, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/entities/user';
import { ApiError } from '@/shared/api/client';
import type { UseAuthFormOptions } from './types';

export function useAuthForm<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  mutationFn,
  errorMessage,
}: UseAuthFormOptions<TFieldValues>) {
  const { login: setUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
  });

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (data) => setUser(data.user),
    onError: (err) => {
      setError('root', {
        message: err instanceof ApiError ? err.message : errorMessage,
      });
    },
  });

  return {
    register,
    errors,
    isPending,
    onSubmit: handleSubmit((values) => mutate(values as TFieldValues)),
  };
}
