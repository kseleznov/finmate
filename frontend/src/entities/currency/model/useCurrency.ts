'use client';

import { useSyncExternalStore } from 'react';
import { getStoredCurrency, setStoredCurrency } from '@/shared/lib/currency';
import type { CurrencyCode } from '@/shared/lib/currency';

type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getServerSnapshot(): CurrencyCode {
  return 'EUR';
}

export function useCurrency() {
  const currency = useSyncExternalStore(subscribe, getStoredCurrency, getServerSnapshot);

  const setCurrency = (next: CurrencyCode) => {
    setStoredCurrency(next);
    notify();
  };

  return { currency, setCurrency };
}
