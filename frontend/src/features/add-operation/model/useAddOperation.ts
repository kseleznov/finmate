'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { FormEvent } from 'react';
import { ApiError } from '@/shared/api/client';
import { useTranslation } from '@/entities/locale';
import { getBudgetLimits } from '../api/getBudgetLimits';
import { addOperation } from '../api/addOperation';
import { getCurrentMonth } from '@/shared/lib/date';
import type { DisplayCategory, Step } from './types';

export function useAddOperation() {
  const router = useRouter();
  const { t } = useTranslation();

  const [step, setStep] = useState<Step>('choose');
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: budgetLimits } = useQuery({
    queryKey: ['budget', getCurrentMonth()],
    queryFn: () => getBudgetLimits(getCurrentMonth()),
  });

  const categories: DisplayCategory[] = (budgetLimits ?? [])
    .filter((limit) => limit.amount > 0)
    .map((limit) => ({
      id: limit.category.id,
      label: limit.category.name,
      icon: limit.category.icon,
      color: limit.category.color,
    }));

  const mutation = useMutation({ mutationFn: addOperation });

  function goToManual() {
    setStep('manual');
  }

  function goToChoose() {
    setStep('choose');
  }

  function incrementAmount() {
    setAmount((prev) => prev + 10);
  }

  function decrementAmount() {
    setAmount((prev) => Math.max(0, prev - 10));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError(t('addOperation.errorEnterTitle'));
      return;
    }

    if (amount <= 0) {
      setError(t('addOperation.errorEnterAmount'));
      return;
    }

    try {
      await mutation.mutateAsync({ title, amount, categoryId });
      router.push('/operations');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('addOperation.errorSubmit'));
    }
  }

  return {
    step,
    goToManual,
    goToChoose,
    categories,
    amount,
    setAmount,
    incrementAmount,
    decrementAmount,
    title,
    setTitle,
    categoryId,
    setCategoryId,
    handleSubmit,
    error,
    isSubmitting: mutation.isPending,
  };
}
