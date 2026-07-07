'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/entities/user';

export function useProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'signIn' | 'signUp'>(
    searchParams.get('mode') === 'signUp' ? 'signUp' : 'signIn'
  );

  return { user, isAuthenticated, logout, mode, setMode };
}
