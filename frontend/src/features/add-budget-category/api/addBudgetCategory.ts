import { apiFetch } from '@/shared/api/client';
import type { CategoryDto } from '../model/types';

export function addBudgetCategory(input: { name: string; icon: string; color: string }) {
  return apiFetch<CategoryDto>('/categories', {
    method: 'POST',
    body: JSON.stringify({ ...input, type: 'EXPENSE' }),
  });
}
