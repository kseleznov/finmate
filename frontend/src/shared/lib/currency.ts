export type CurrencyCode = 'EUR' | 'USD' | 'UAH';

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'UAH', symbol: '₴', label: 'Гривна' },
];

const CURRENCY_KEY = 'finmate_currency';
const DEFAULT_CURRENCY: CurrencyCode = 'EUR';

export function getCurrencySymbol(currency: CurrencyCode) {
  return CURRENCIES.find((item) => item.code === currency)?.symbol ?? '';
}

export function getStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;

  const stored = localStorage.getItem(CURRENCY_KEY);
  return CURRENCIES.some((item) => item.code === stored)
    ? (stored as CurrencyCode)
    : DEFAULT_CURRENCY;
}

export function setStoredCurrency(currency: CurrencyCode) {
  localStorage.setItem(CURRENCY_KEY, currency);
}

export function formatAmount(amount: number, currency: CurrencyCode) {
  const sign = amount < 0 ? '-' : '';
  return `${sign}${new Intl.NumberFormat('ru-RU').format(Math.abs(amount))} ${getCurrencySymbol(currency)}`;
}
