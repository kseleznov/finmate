export function useOperationsList() {
  function formatAmount(amount: number) {
    const sign = amount < 0 ? '-' : '';
    return `${sign}${new Intl.NumberFormat('ru-RU').format(Math.abs(amount))} €`;
  }

  const groups: {
    date: string;
    operations: { title: string; subtitle: string; icon: string; color: string; amount: number }[];
  }[] = [];

  return { formatAmount, groups };
}
