'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';
import { getDashboardSummary } from '../api/getDashboardSummary';
import { getCurrentMonth } from '@/shared/lib/date';
import type { DisplayCategory } from './types';

const VISIBLE_COUNT = 3;

export function useCategoriesList() {
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  const [expanded, setExpanded] = useState(false);

  const { data: summary } = useQuery({
    queryKey: ['dashboard-summary', getCurrentMonth()],
    queryFn: () => getDashboardSummary(getCurrentMonth()),
  });

  const categories: DisplayCategory[] = (summary?.categoryBreakdown ?? [])
    .filter((category) => category.limit > 0)
    .map((category) => ({
      title: category.categoryName,
      icon: category.icon,
      color: category.color,
      spent: category.spent,
      remaining: category.remaining,
    }));

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
