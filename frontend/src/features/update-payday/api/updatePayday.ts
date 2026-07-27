import { apiFetch } from '@/shared/api/client';
import type { StoredUser } from '@/shared/api/types';

export function updatePayday(payday: number) {
  return apiFetch<StoredUser>('/users/me/payday', {
    method: 'PATCH',
    body: JSON.stringify({ payday }),
  });
}
