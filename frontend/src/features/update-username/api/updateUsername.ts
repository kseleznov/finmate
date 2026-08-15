import { apiFetch } from '@/shared/api/client';
import type { StoredUser } from '@/shared/api/types';

export function updateUsername(username: string) {
  return apiFetch<StoredUser>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ username }),
  });
}
