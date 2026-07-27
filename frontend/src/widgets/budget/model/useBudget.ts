'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';
import { useRequireAuth } from '@/entities/user';
import { useAddBudgetCategory } from '@/features/add-budget-category';
import { useDeleteBudgetCategory } from '@/features/delete-budget-category';
import { useUpdateBudgetLimit } from '@/features/update-budget-limit';
import { updateBudgetIncome } from '../api/updateBudgetIncome';
import { getCurrentMonth } from '../lib/getCurrentMonth';
import { useBudgetData, budgetQueryKey } from './useBudgetData';
import type { BudgetData } from './useBudgetData';
import type { BudgetCategory } from './types';

export function useBudget() {
  const month = getCurrentMonth();
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const { requireAuth, isAuthenticated } = useRequireAuth();
  const queryClient = useQueryClient();
  const queryKey = budgetQueryKey(month, isAuthenticated);
  const { data, isPending } = useBudgetData(month, isAuthenticated);
  const [isEditingIncome, setIsEditingIncomeState] = useState(false);
  const categories = data?.categories ?? [];
  const income = data?.income ?? 0;

  function formatAmount(amount: number) {
    return formatCurrencyAmount(amount, currency, intlLocale);
  }

  function updateBudgetData(updater: (prev: BudgetData) => BudgetData) {
    queryClient.setQueryData<BudgetData>(queryKey, (prev) => (prev ? updater(prev) : prev));
  }

  function setCategories(updater: (categories: BudgetCategory[]) => BudgetCategory[]) {
    updateBudgetData((prev) => ({ ...prev, categories: updater(prev.categories) }));
  }

  function setIncome(value: number) {
    updateBudgetData((prev) => ({ ...prev, income: value }));
  }

  function setIsEditingIncome(value: boolean) {
    if (value && !requireAuth()) {
      return;
    }

    setIsEditingIncomeState(value);

    if (!value && isAuthenticated) {
      updateBudgetIncome(month, income).catch(() => {});
    }
  }

  const { editingCategoryId, setEditingCategoryId, updateCategoryLimit } = useUpdateBudgetLimit(
    month,
    categories,
    setCategories
  );

  const {
    isAdding: isAddingCategory,
    setIsAdding: setIsAddingCategory,
    error: addCategoryError,
    addCategory: addBudgetCategory,
  } = useAddBudgetCategory();

  async function addCategory(input: { name: string; icon: string; color: string }) {
    const created = await addBudgetCategory(input);

    if (!created) {
      return false;
    }

    setCategories((prev) => [
      ...prev,
      { id: created.id, title: created.name, icon: created.icon, color: created.color, limit: 0 },
    ]);

    return true;
  }

  const { deleteCategory: deleteBudgetCategory } = useDeleteBudgetCategory();

  async function deleteCategory(id: string) {
    const ok = await deleteBudgetCategory(id);

    if (ok) {
      setCategories((prev) => prev.filter((category) => category.id !== id));
    }

    return ok;
  }

  const allocated = categories.reduce((sum, category) => sum + category.limit, 0);
  const leftToAllocate = income - allocated;

  return {
    isLoading: isPending,
    formatAmount,
    income,
    setIncome,
    isEditingIncome,
    setIsEditingIncome,
    categories,
    editingCategoryId,
    setEditingCategoryId,
    updateCategoryLimit,
    allocated,
    leftToAllocate,
    isAddingCategory,
    setIsAddingCategory,
    addCategoryError,
    addCategory,
    deleteCategory,
  };
}
