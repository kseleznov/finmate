'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { apiFetch, ApiError } from '@/shared/api/client';

type Step = 'choose' | 'manual';

interface BudgetLimitDto {
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

interface DisplayCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function useAddOperation() {
  const router = useRouter();

  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [step, setStep] = useState<Step>('choose');
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await apiFetch<BudgetLimitDto[]>(`/budgets?month=${getCurrentMonth()}`);
      if (cancelled) return;

      setCategories(
        data
          .filter((limit) => limit.amount > 0)
          .map((limit) => ({
            id: limit.category.id,
            label: limit.category.name,
            icon: limit.category.icon,
            color: limit.category.color,
          }))
      );
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

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
      setError('Enter what you bought');
      return;
    }

    if (amount <= 0) {
      setError('Enter an amount greater than 0');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch('/operations', {
        method: 'POST',
        body: JSON.stringify({
          title,
          amount,
          type: 'EXPENSE',
          date: new Date().toISOString(),
          categoryId: categoryId ?? undefined,
        }),
      });
      router.push('/operations');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save the operation');
      setIsSubmitting(false);
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
    isSubmitting,
  };
}
