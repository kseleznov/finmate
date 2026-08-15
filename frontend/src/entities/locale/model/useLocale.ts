'use client';

import { useEffect } from 'react';
import { getIntlLocale, LOCALES } from '@/shared/lib/i18n';
import { useLocaleStore, hydrateLocaleStore } from './localeStore';

export function useLocale() {
  useEffect(() => {
    hydrateLocaleStore();
  }, []);

  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const localeItems = LOCALES.map((item) => ({ value: item.code, label: item.code.toUpperCase() }));

  return { locale, setLocale, intlLocale: getIntlLocale(locale), localeItems };
}
