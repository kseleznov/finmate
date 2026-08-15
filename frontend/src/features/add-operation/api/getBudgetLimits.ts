import { apiFetch } from '@/shared/api/client';
import type { BudgetLimitDto } from '../model/types';

export function getBudgetLimits(month: string) {
  return apiFetch<BudgetLimitDto[]>(`/budgets?month=${month}`);
}
