'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { formatAmount as formatCurrencyAmount } from '@/shared/lib/currency';
import { useCurrency } from '@/entities/currency';
import { useTranslation } from '@/entities/locale';
import { useAuth } from '@/entities/user';
import { getOperations } from '../api/getOperations';
import { deleteOperation as deleteOperationRequest } from '../api/deleteOperation';
import type { DisplayOperation, OperationDto } from './types';

const OPERATIONS_QUERY_KEY = ['operations'] as const;

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const { t, intlLocale } = useTranslation();
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: OPERATIONS_QUERY_KEY,
    queryFn: getOperations,
    enabled: isAuthenticated,
  });

  const operations = data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteOperationRequest,
    onSuccess: (_data, id) => {
      queryClient.setQueryData<OperationDto[]>(OPERATIONS_QUERY_KEY, (prev) =>
        prev?.filter((operation) => operation.id !== id)
      );
    },
  });

  function formatAmount(amount: number) {
    return formatCurrencyAmount(amount, currency, intlLocale);
  }

  async function deleteOperation(id: string) {
    if (!isAuthenticated) {
      router.push('/profile');
      return false;
    }

    try {
      await deleteMutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
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

  return { formatAmount, groups, isLoading, deleteOperation };
}
