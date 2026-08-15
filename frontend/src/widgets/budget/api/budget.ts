import { apiFetch } from '@/shared/api/client';
import type { BudgetLimitDto, CategoryDto, IncomeDto } from '../model/types';

export function getBudgetCategories() {
  return apiFetch<CategoryDto[]>('/categories?type=EXPENSE');
}

export function getBudgetIncome(month: string) {
  return apiFetch<IncomeDto>(`/budgets/income?month=${month}`);
}

export function getBudgetLimits(month: string) {
  return apiFetch<BudgetLimitDto[]>(`/budgets?month=${month}`);
}

export function updateBudgetIncome(month: string, amount: number) {
  return apiFetch('/budgets/income', {
    method: 'POST',
    body: JSON.stringify({ month, amount }),
  });
}
