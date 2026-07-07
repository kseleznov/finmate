'use client';

import { useSyncExternalStore } from 'react';
import { getStoredLocale, setStoredLocale, getIntlLocale, DEFAULT_LOCALE } from '@/shared/lib/i18n';
import type { LocaleCode } from '@/shared/lib/i18n';

type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getServerSnapshot(): LocaleCode {
  return DEFAULT_LOCALE;
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getStoredLocale, getServerSnapshot);

  const setLocale = (next: LocaleCode) => {
    setStoredLocale(next);
    notify();
  };

  return { locale, setLocale, intlLocale: getIntlLocale(locale) };
}
