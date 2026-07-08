'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { DEFAULT_EXPENSE_CATEGORIES } from '@/shared/lib/defaultCategories';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';
import { useAuth } from '@/entities/user';

interface CategoryDto {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface BudgetLimitDto {
  categoryId: string;
  amount: number;
}

interface IncomeDto {
  month: string;
  amount: number;
}

interface BudgetCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  limit: number;
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function useBudget() {
  const month = getCurrentMonth();
  const router = useRouter();
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const { isAuthenticated } = useAuth();
  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [isEditingIncome, setIsEditingIncomeState] = useState(false);

  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [editingCategoryId, setEditingCategoryIdState] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategoryState] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isAuthenticated) {
        await Promise.resolve();
        if (cancelled) return;

        setCategories(
          DEFAULT_EXPENSE_CATEGORIES.map((category) => ({
            id: category.name,
            title: category.name,
            icon: category.icon,
            color: category.color,
            limit: 0,
          }))
        );
        setIncome(0);
        setIsLoading(false);
        return;
      }

      const [categoriesRes, limitsRes, incomeRes] = await Promise.all([
        apiFetch<CategoryDto[]>('/categories?type=EXPENSE'),
        apiFetch<BudgetLimitDto[]>(`/budgets?month=${month}`),
        apiFetch<IncomeDto>(`/budgets/income?month=${month}`),
      ]);

      if (cancelled) return;

      const limitByCategoryId = new Map(limitsRes.map((limit) => [limit.categoryId, limit.amount]));

      const mapped = categoriesRes.map((category) => ({
        id: category.id,
        title: category.name,
        icon: category.icon,
        color: category.color,
        limit: limitByCategoryId.get(category.id) ?? 0,
      }));

      mapped.sort((a, b) => Number(b.limit > 0) - Number(a.limit > 0));

      setCategories(mapped);
      setIncome(incomeRes.amount);
      setIsLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [month, isAuthenticated]);

  const setIsEditingIncome = (value: boolean) => {
    if (value && !isAuthenticated) {
      router.push('/profile');
      return;
    }

    setIsEditingIncomeState(value);

    if (!value && isAuthenticated) {
      apiFetch('/budgets/income', {
        method: 'POST',
        body: JSON.stringify({ month, amount: income }),
      }).catch(() => {});
    }
  };

  const updateCategoryLimit = (id: string, limit: number) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? { ...category, limit } : category))
    );
  };

  const setEditingCategoryId = (id: string | null) => {
    if (id !== null && !isAuthenticated) {
      router.push('/profile');
      return;
    }

    const previousId = editingCategoryId;
    setEditingCategoryIdState(id);

    if (id === null && previousId && isAuthenticated) {
      const category = categories.find((item) => item.id === previousId);
      if (category) {
        apiFetch('/budgets', {
          method: 'POST',
          body: JSON.stringify({ categoryId: previousId, month, amount: category.limit }),
        }).catch(() => {});
      }
    }
  };

  const setIsAddingCategory = (value: boolean) => {
    if (value && !isAuthenticated) {
      router.push('/profile');
      return;
    }

    setAddCategoryError(null);
    setIsAddingCategoryState(value);
  };

  const addCategory = async (input: { name: string; icon: string; color: string }) => {
    setAddCategoryError(null);

    try {
      const created = await apiFetch<CategoryDto>('/categories', {
        method: 'POST',
        body: JSON.stringify({ ...input, type: 'EXPENSE' }),
      });

      setCategories((prev) => [
        ...prev,
        { id: created.id, title: created.name, icon: created.icon, color: created.color, limit: 0 },
      ]);
      setIsAddingCategoryState(false);
      return true;
    } catch {
      setAddCategoryError('errorAddCategory');
      return false;
    }
  };

  const deleteCategory = async (id: string) => {
    if (!isAuthenticated) {
      router.push('/profile');
      return false;
    }

    try {
      await apiFetch(`/categories/${id}`, { method: 'DELETE' });
      setCategories((prev) => prev.filter((category) => category.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const allocated = categories.reduce((sum, category) => sum + category.limit, 0);
  const leftToAllocate = income - allocated;

  return {
    isLoading,
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
