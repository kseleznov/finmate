'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export function useRequireAuth() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  function requireAuth() {
    if (!isAuthenticated) {
      router.push('/profile');

      return false;
    }

    return true;
  }

  return { requireAuth, isAuthenticated };
}
