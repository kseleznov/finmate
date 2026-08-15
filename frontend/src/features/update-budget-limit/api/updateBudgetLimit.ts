import { apiFetch } from '@/shared/api/client';

export function updateBudgetLimit(input: { categoryId: string; month: string; amount: number }) {
  return apiFetch('/budgets', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
