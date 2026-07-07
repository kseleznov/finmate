'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';

interface CategoryBreakdownDto {
  categoryName: string;
  icon: string;
  color: string;
  limit: number;
  spent: number;
  remaining: number;
}

interface DashboardSummaryDto {
  categoryBreakdown: CategoryBreakdownDto[];
}

interface DisplayCategory {
  title: string;
  icon: string;
  color: string;
  spent: number;
  remaining: number;
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function useCategoriesList() {
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const VISIBLE_COUNT = 3;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const summary = await apiFetch<DashboardSummaryDto>(
        `/dashboard/summary?month=${getCurrentMonth()}`
      );
      if (cancelled) return;

      setCategories(
        summary.categoryBreakdown
          .filter((category) => category.limit > 0)
          .map((category) => ({
            title: category.categoryName,
            icon: category.icon,
            color: category.color,
            spent: category.spent,
            remaining: category.remaining,
          }))
      );
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleCategories = expanded ? categories : categories.slice(0, VISIBLE_COUNT);

  return {
    formatAmount,
    categories,
    VISIBLE_COUNT,
    expanded,
    setExpanded,
    visibleCategories,
  };
}
