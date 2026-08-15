'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRequireAuth } from '@/entities/user';
import { addBudgetCategory } from '../api/addBudgetCategory';

export function useAddBudgetCategory() {
  const { requireAuth } = useRequireAuth();

  const [isAdding, setIsAddingState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: addBudgetCategory,
    onSuccess: () => setIsAddingState(false),
  });

  const setIsAdding = (value: boolean) => {
    if (value && !requireAuth()) {
      return;
    }

    setError(null);
    setIsAddingState(value);
  };

  const addCategory = async (input: { name: string; icon: string; color: string }) => {
    setError(null);

    try {
      return await mutation.mutateAsync(input);
    } catch {
      setError('errorAddCategory');
      return null;
    }
  };

  return { isAdding, setIsAdding, error, addCategory };
}
