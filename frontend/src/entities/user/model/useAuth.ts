import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/shared/api/client';
import { ME_QUERY_KEY } from './costants';
import type { StoredUser } from '@/shared/api/types';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data } = useQuery<StoredUser | null>({
    queryKey: ME_QUERY_KEY,
    queryFn: () => apiFetch<StoredUser>('/users/me'),
    retry: false,
    enabled: queryClient.getQueryData<StoredUser | null>(ME_QUERY_KEY) !== null,
  });

  const user = data ?? null;

  function login(nextUser: StoredUser) {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  }

  async function logout() {
    await apiFetch('/auth/logout', { method: 'POST' });

    queryClient.setQueryData(ME_QUERY_KEY, null);
  }

  function updateUser(nextUser: StoredUser) {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  }

  return { user, isAuthenticated: Boolean(user), login, logout, updateUser };
}
