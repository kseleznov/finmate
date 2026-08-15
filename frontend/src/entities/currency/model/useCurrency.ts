'use client';

import { useEffect } from 'react';
import { CURRENCIES } from '@/shared/lib/currency';
import { useCurrencyStore } from './currencyStore';

export function useCurrency() {
  useEffect(() => {
    useCurrencyStore.persist.rehydrate();
  }, []);

  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const currencyItems = CURRENCIES.map((item) => ({ value: item.code, label: item.code }));

  return { currency, setCurrency, currencyItems };
}
