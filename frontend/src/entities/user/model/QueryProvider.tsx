'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ME_QUERY_KEY, QUERY_STALE_TIME_MS } from './costants';
import type { StoredUser } from '@/shared/api/types';

interface Props {
  initialUser: StoredUser | null;
  children: React.ReactNode;
}

export function QueryProvider({ initialUser, children }: Props) {
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
