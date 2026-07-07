'use client';

import { useCallback } from 'react';
import { translate } from '@/shared/lib/i18n';
import type { TranslationKey } from '@/shared/lib/i18n';
import { useLocale } from './useLocale';

export function useTranslation() {
  const { locale, setLocale, intlLocale } = useLocale();

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale]
  );

  return { t, locale, setLocale, intlLocale };
}
