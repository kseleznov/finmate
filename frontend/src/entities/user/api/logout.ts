import { apiFetch } from '@/shared/api/client';

export function logout() {
  return apiFetch('/auth/logout', { method: 'POST' });
}
