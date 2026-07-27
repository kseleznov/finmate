import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from '../api/getMe';
import { logout as logoutRequest } from '../api/logout';
import { ME_QUERY_KEY } from './costants';
import type { StoredUser } from '@/shared/api/types';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data } = useQuery<StoredUser | null>({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    retry: false,
    enabled: queryClient.getQueryData<StoredUser | null>(ME_QUERY_KEY) !== null,
  });

  const user = data ?? null;

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => queryClient.setQueryData(ME_QUERY_KEY, null),
  });

  function login(nextUser: StoredUser) {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  }

  function updateUser(nextUser: StoredUser) {
    queryClient.setQueryData(ME_QUERY_KEY, nextUser);
  }

  return {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout: logoutMutation.mutate,
    updateUser,
  };
}
