import { apiFetch } from '@/shared/api/client';

export function deleteBudgetCategory(id: string) {
  return apiFetch(`/categories/${id}`, { method: 'DELETE' });
}
