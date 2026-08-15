'use client';

import { useMutation } from '@tanstack/react-query';
import { useRequireAuth } from '@/entities/user';
import { deleteBudgetCategory } from '../api/deleteBudgetCategory';

export function useDeleteBudgetCategory() {
  const { requireAuth } = useRequireAuth();

  const mutation = useMutation({ mutationFn: deleteBudgetCategory });

  const deleteCategory = async (id: string) => {
    if (!requireAuth()) {
      return false;
    }

    try {
      await mutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
  };

  return { deleteCategory };
}
