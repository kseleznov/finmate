import { apiFetch } from '@/shared/api/client';
import type { StoredUser } from '@/shared/api/types';

export function getMe() {
  return apiFetch<StoredUser>('/users/me');
}
