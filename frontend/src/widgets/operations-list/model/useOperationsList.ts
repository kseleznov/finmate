'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/shared/api/client';

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

function formatGroupDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return 'Today';
  if (isSameDay(date, yesterday)) return 'Yesterday';

  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' }).format(date);
}

export function useOperationsList() {
  const [operations, setOperations] = useState<OperationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await apiFetch<OperationDto[]>('/operations');
      if (cancelled) return;

      setOperations(data);
      setIsLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  function formatAmount(amount: number) {
    const sign = amount < 0 ? '-' : '';
    return `${sign}${new Intl.NumberFormat('ru-RU').format(Math.abs(amount))} €`;
  }

  const groups: { date: string; operations: DisplayOperation[] }[] = [];

  for (const operation of operations) {
    const label = formatGroupDate(operation.date);
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
