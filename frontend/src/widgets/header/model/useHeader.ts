'use client';

import { useQuery } from '@tanstack/react-query';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useLocale } from '@/entities/locale';
import { useAuth } from '@/entities/user';
import { getDashboardSummary } from '../api/getDashboardSummary';
import { getDaysUntilNextPayday } from '../lib/getDaysUntilNextPayday';
import { getCurrentMonth } from '@/shared/lib/date';
import { getDaysRemainingInMonth } from '../lib/getDaysRemainingInMonth';
import type { DashboardSummaryDto } from './types';

export function useHeader() {
  const { currency } = useCurrency();
  const { intlLocale } = useLocale();
  const { user } = useAuth();
  const month = getCurrentMonth();

  const { data } = useQuery<DashboardSummaryDto>({
    queryKey: ['dashboard-summary', month],
    queryFn: () => getDashboardSummary(month),
    enabled: Boolean(user),
  });

  const { expenses: spent = 0, income: total = 0 } = data ?? {};

  const daysRemaining = user?.payday
    ? getDaysUntilNextPayday(user.payday)
    : getDaysRemainingInMonth();

  const percent = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;

  const left = total - spent;

  function formatAmount(amount: number) {
    return formatCurrencyAmount(amount, currency, intlLocale);
  }

  return {
    spent,
    total,
    daysRemaining,
    formatAmount,
    percent,
    left,
  };
}
