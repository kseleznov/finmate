import { apiFetch } from '@/shared/api/client';

export function deleteOperation(id: string) {
  return apiFetch(`/operations/${id}`, { method: 'DELETE' });
}
