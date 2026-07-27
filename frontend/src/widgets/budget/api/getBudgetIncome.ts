import { apiFetch } from '@/shared/api/client';
import type { IncomeDto } from '../model/types';

export function getBudgetIncome(month: string) {
  return apiFetch<IncomeDto>(`/budgets/income?month=${month}`);
}
