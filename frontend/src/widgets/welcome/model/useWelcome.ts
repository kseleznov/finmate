'use client';

import { useAuth } from '@/entities/user';
import { useTranslation } from '@/entities/locale';

export function useWelcome() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return { isAuthenticated, t };
}
