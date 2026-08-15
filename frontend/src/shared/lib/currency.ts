export type CurrencyCode = 'EUR' | 'USD' | 'UAH';

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'UAH', symbol: '₴', label: 'Гривна' },
];

export function getCurrencySymbol(currency: CurrencyCode) {
  return CURRENCIES.find((item) => item.code === currency)?.symbol ?? '';
}

export function formatAmount(amount: number, currency: CurrencyCode, intlLocale = 'ru-RU') {
  const sign = amount < 0 ? '-' : '';
  return `${sign}${new Intl.NumberFormat(intlLocale).format(Math.abs(amount))} ${getCurrencySymbol(currency)}`;
}
