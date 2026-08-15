'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRequireAuth } from '@/entities/user';
import { updateBudgetLimit } from '../api/updateBudgetLimit';

interface BudgetLimitCategory {
  id: string;
  limit: number;
}

export function useUpdateBudgetLimit<T extends BudgetLimitCategory>(
  month: string,
  categories: T[],
  setCategories: (updater: (categories: T[]) => T[]) => void
) {
  const { requireAuth, isAuthenticated } = useRequireAuth();
  const [editingCategoryId, setEditingCategoryIdState] = useState<string | null>(null);

  const mutation = useMutation({ mutationFn: updateBudgetLimit });

  function updateCategoryLimit(id: string, limit: number) {
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? { ...category, limit } : category))
    );
  }

  function setEditingCategoryId(id: string | null) {
    if (id !== null && !requireAuth()) {
      return;
    }

    const previousId = editingCategoryId;

    setEditingCategoryIdState(id);

    if (id === null && previousId && isAuthenticated) {
      const category = categories.find((item) => item.id === previousId);
      if (category) {
        mutation.mutate({ categoryId: previousId, month, amount: category.limit });
      }
    }
  }

  return { editingCategoryId, setEditingCategoryId, updateCategoryLimit };
}
