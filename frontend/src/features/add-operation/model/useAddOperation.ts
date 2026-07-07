'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { apiFetch, ApiError } from '@/shared/api/client';

type Step = 'choose' | 'manual';

interface CategoryDto {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface DisplayCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
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
      const data = await apiFetch<CategoryDto[]>('/categories?type=EXPENSE');
      if (cancelled) return;

      setCategories(
        data.map((category) => ({
          id: category.id,
          label: category.name,
          icon: category.icon,
          color: category.color,
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
