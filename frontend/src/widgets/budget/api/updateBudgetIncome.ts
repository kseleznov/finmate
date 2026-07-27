import { apiFetch } from '@/shared/api/client';

export function updateBudgetIncome(month: string, amount: number) {
  return apiFetch('/budgets/income', {
    method: 'POST',
    body: JSON.stringify({ month, amount }),
  });
}
