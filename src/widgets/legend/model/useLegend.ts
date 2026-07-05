export function useLegend() {
  const items = [
    { color: 'pink', label: 'Purchases', pct: '57%' },
    { color: 'grey', label: 'Bills/Utilities', pct: '21%' },
    { color: 'green', label: 'Groceries', pct: '12%' },
    { color: 'blue', label: 'Transport', pct: '5%' },
    { color: 'orange', label: 'Food/Cafe', pct: '5%' },
  ];

  return { items };
}
