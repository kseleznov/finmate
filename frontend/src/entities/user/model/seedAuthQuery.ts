import type { QueryClient } from '@tanstack/react-query';
import { ME_QUERY_KEY } from './costants';
import type { StoredUser } from '@/shared/api/types';

export function seedAuthQuery(queryClient: QueryClient, user: StoredUser | null) {
  queryClient.setQueryData(ME_QUERY_KEY, user);
}
