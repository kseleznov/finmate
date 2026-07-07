'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useTranslation } from '@/entities/locale';

interface CategoryBreakdownDto {
  categoryName: string;
  icon: string;
  color: string;
  spent: number;
}

interface DashboardSummaryDto {
  expenses: number;
  categoryBreakdown: CategoryBreakdownDto[];
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function useDonut() {
  const { currency } = useCurrency();
  const { t, intlLocale } = useTranslation();
  const [data, setData] = useState<{ name: string; value: number; color: string; icon: string }[]>(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);

  const RADIAN = Math.PI / 180;

  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  const hexToRgba = (hex: string, alpha: number) => {
    const value = parseInt(hex.replace('#', ''), 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const summary = await apiFetch<DashboardSummaryDto>(
        `/dashboard/summary?month=${getCurrentMonth()}`
      );
      if (cancelled) return;

      const spentCategories = summary.categoryBreakdown.filter((category) => category.spent > 0);

      setData(
        spentCategories.map((category) => ({
          name: category.categoryName,
          value: summary.expenses > 0 ? Math.round((category.spent / summary.expenses) * 100) : 0,
          color: category.color,
          icon: category.icon,
        }))
      );
      setTotalAmount(summary.expenses);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (_dataItem: unknown, index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const centerLabel = selected === null ? t('donut.spent') : data[selected].name;
  const centerAmount =
    selected === null ? totalAmount : Math.round((totalAmount * data[selected].value) / 100);
  const centerSub =
    selected === null ? '' : t('donut.percentOfExpenses', { value: data[selected].value });

  return {
    data,
    totalAmount,
    RADIAN,
    formatAmount,
    hexToRgba,
    selected,
    handleClick,
    centerLabel,
    centerAmount,
    centerSub,
  };
}
