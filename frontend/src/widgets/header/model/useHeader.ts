'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';
import { useAuth } from '@/entities/user';

interface DashboardSummaryDto {
  income: number;
  expenses: number;
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getDaysRemainingInMonth() {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return lastDay - now.getDate();
}

function getDaysUntilNextPayday(payday: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = new Date(year, month, now.getDate());

  function clampedPaydayDate(y: number, m: number) {
    const lastDay = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(payday, lastDay));
  }

  let target = clampedPaydayDate(year, month);
  if (target < today) {
    target = clampedPaydayDate(year, month + 1);
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((target.getTime() - today.getTime()) / msPerDay);
}

export function useHeader() {
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const { user } = useAuth();
  const [spent, setSpent] = useState(0);
  const [total, setTotal] = useState(0);

  const daysRemaining = user?.payday
    ? getDaysUntilNextPayday(user.payday)
    : getDaysRemainingInMonth();
  const formatAmount = (amount: number) => formatCurrencyAmount(amount, currency, intlLocale);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const summary = await apiFetch<DashboardSummaryDto>(
        `/dashboard/summary?month=${getCurrentMonth()}`
      );
      if (cancelled) return;

      setSpent(summary.expenses);
      setTotal(summary.income);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const percent = total > 0 ? Math.round((spent / total) * 100) : 0;
  const left = total - spent;

  return {
    spent,
    total,
    daysRemaining,
    formatAmount,
    percent,
    left,
  };
}
