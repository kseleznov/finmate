'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';

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
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [isEditingIncome, setIsEditingIncomeState] = useState(false);

  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [editingCategoryId, setEditingCategoryIdState] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
  }, [month]);

  const setIsEditingIncome = (value: boolean) => {
    setIsEditingIncomeState(value);

    if (!value) {
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
    const previousId = editingCategoryId;
    setEditingCategoryIdState(id);

    if (id === null && previousId) {
      const category = categories.find((item) => item.id === previousId);
      if (category) {
        apiFetch('/budgets', {
          method: 'POST',
          body: JSON.stringify({ categoryId: previousId, month, amount: category.limit }),
        }).catch(() => {});
      }
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
  };
}
