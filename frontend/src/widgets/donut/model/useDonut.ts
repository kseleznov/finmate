'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useTranslation } from '@/entities/locale';
import { getDashboardSummary } from '../api/getDashboardSummary';
import { getCurrentMonth } from '@/shared/lib/date';

export function useDonut() {
  const { currency } = useCurrency();
  const { t, intlLocale } = useTranslation();
  const month = getCurrentMonth();
  const RADIAN = Math.PI / 180;

  const { data: summary } = useQuery({
    queryKey: ['dashboard-summary', month],
    queryFn: () => getDashboardSummary(month),
  });

  const totalAmount = summary?.expenses ?? 0;

  const data = (summary?.categoryBreakdown ?? [])
    .filter((category) => category.spent > 0)
    .map((category) => ({
      name: category.categoryName,
      value: totalAmount > 0 ? Math.round((category.spent / totalAmount) * 100) : 0,
      color: category.color,
      icon: category.icon,
    }));

  const isEmpty = data.length === 0;
  const pieData = isEmpty ? [{ name: '', value: 1, color: '#12b76a', icon: '' }] : data;

  function formatAmount(amount: number) {
    return formatCurrencyAmount(amount, currency, intlLocale);
  }

  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(_dataItem: unknown, index: number) {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  }

  const centerLabel = selected === null ? t('donut.spent') : data[selected].name;

  const centerAmount =
    selected === null ? totalAmount : Math.round((totalAmount * data[selected].value) / 100);

  const centerSub =
    selected === null ? '' : t('donut.percentOfExpenses', { value: data[selected].value });

  return {
    pieData,
    isEmpty,
    totalAmount,
    RADIAN,
    formatAmount,
    selected,
    handleClick,
    centerLabel,
    centerAmount,
    centerSub,
  };
}
