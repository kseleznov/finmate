'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useTranslation } from '@/entities/locale';
import { useAuth } from '@/entities/user';

interface OperationDto {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  category: { name: string; icon: string; color: string } | null;
}

interface DisplayOperation {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  amount: number;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatGroupDate(
  dateString: string,
  intlLocale: string,
  labels: { today: string; yesterday: string }
) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return labels.today;
  if (isSameDay(date, yesterday)) return labels.yesterday;

  return new Intl.DateTimeFormat(intlLocale, { day: 'numeric', month: 'long' }).format(date);
}

export function useOperationsList() {
  const { currency } = useCurrency();
  const { t, intlLocale } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [operations, setOperations] = useState<OperationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isAuthenticated) {
        await Promise.resolve();
        if (cancelled) return;

        setOperations([]);
        setIsLoading(false);
        return;
      }

      const data = await apiFetch<OperationDto[]>('/operations');
      if (cancelled) return;

      setOperations(data);
      setIsLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  function formatAmount(amount: number) {
    return formatCurrencyAmount(amount, currency, intlLocale);
  }

  const groups: { date: string; operations: DisplayOperation[] }[] = [];

  for (const operation of operations) {
    const label = formatGroupDate(operation.date, intlLocale, {
      today: t('operations.today'),
      yesterday: t('operations.yesterday'),
    });
    const displayOperation: DisplayOperation = {
      id: operation.id,
      title: operation.title,
      subtitle: operation.category?.name ?? '',
      icon: operation.category?.icon ?? '💳',
      color: operation.category?.color ?? '#6366f1',
      amount: operation.type === 'EXPENSE' ? -operation.amount : operation.amount,
    };

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === label) {
      lastGroup.operations.push(displayOperation);
    } else {
      groups.push({ date: label, operations: [displayOperation] });
    }
  }

  return { formatAmount, groups, isLoading };
}
