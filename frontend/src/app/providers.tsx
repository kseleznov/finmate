'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { seedAuthQuery } from '@/entities/user';
import type { StoredUser } from '@/shared/api/types';

const QUERY_STALE_TIME_MS = 5 * 60 * 1000;

interface Props {
  initialUser: StoredUser | null;
  children: React.ReactNode;
}

export function Providers({ initialUser, children }: Props) {
  const [client] = useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: QUERY_STALE_TIME_MS,
          refetchOnWindowFocus: false,
        },
      },
    });

    seedAuthQuery(queryClient, initialUser);

    return queryClient;
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
