import { apiFetch } from '@/shared/api/client';

export function addOperation(input: { title: string; amount: number; categoryId: string | null }) {
  return apiFetch('/operations', {
    method: 'POST',
    body: JSON.stringify({
      title: input.title,
      amount: input.amount,
      type: 'EXPENSE',
      date: new Date().toISOString(),
      categoryId: input.categoryId ?? undefined,
    }),
  });
}
