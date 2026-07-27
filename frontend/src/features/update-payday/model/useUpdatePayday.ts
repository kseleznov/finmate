'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/entities/user';
import { updatePayday } from '../api/updatePayday';
import type { ChangeEvent } from 'react';

export function useUpdatePayday() {
  const { user, updateUser } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: updatePayday,
    onSuccess: updateUser,
  });

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value) {
      mutate(Number(event.target.value));
    }
  }

  return {
    payday: user?.payday ?? '',
    isPending,
    handleChange,
  };
}
