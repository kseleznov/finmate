'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { AuthMode } from './types';

export function useAuthCard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signUp' ? 'signUp' : 'signIn';

  function setMode(mode: AuthMode) {
    const params = new URLSearchParams(searchParams.toString());

    params.set('mode', mode);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { mode, setMode };
}
