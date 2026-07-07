import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';

type Step = 'choose' | 'manual';

export function useAddOperation() {
  const router = useRouter();

  const categories = [
    { id: 'food', label: 'Food/Cafe', icon: '☕️', color: '#f59e0b' },
    { id: 'groceries', label: 'Groceries', icon: '🛒', color: '#12b76a' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
    { id: 'transport', label: 'Transport', icon: '🚗', color: '#3b82f6' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#e91e8c' },
    { id: 'health', label: 'Health', icon: '❤️', color: '#ef4444' },
    { id: 'utilities', label: 'Utilities', icon: '📄', color: '#4b5563' },
    { id: 'other', label: 'Other', icon: '⋯', color: '#94a3b8' },
  ] as const;

  const [step, setStep] = useState<Step>('choose');
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    router.push('/operations');
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
  };
}
