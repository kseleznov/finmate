'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { StoredUser } from '@/shared/api/session';
import { ME_QUERY_KEY } from './useAuth';

const QUERY_STALE_TIME_MS = 5 * 60 * 1000;

export function QueryProvider({
  initialUser,
  children,
}: {
  initialUser: StoredUser | null;
  children: React.ReactNode;
}) {
  const [client] = useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: QUERY_STALE_TIME_MS,
          refetchOnWindowFocus: false,
        },
      },
    });
    queryClient.setQueryData(ME_QUERY_KEY, initialUser);
    return queryClient;
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
