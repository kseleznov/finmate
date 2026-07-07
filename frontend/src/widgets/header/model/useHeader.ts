export function useHeader() {
  const spent = 0;
  const total = 0;
  const daysRemaining = 0;

  const formatAmount = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' €';

  const percent = Math.round((spent / total) * 100);
  const left = total - spent;

  return {
    spent,
    total,
    daysRemaining,
    formatAmount,
    percent,
    left,
  };
}
