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

  const login = (nextUser: StoredUser) => {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  };

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // best-effort — очищаем кэш в любом случае
    }
    queryClient.setQueryData(ME_QUERY_KEY, null);
  };

  const updateUser = (nextUser: StoredUser) => {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  };

  return { user, isAuthenticated: !!user, login, logout, updateUser };
}
