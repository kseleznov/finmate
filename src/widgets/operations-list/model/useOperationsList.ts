export function useOperationsList() {
  function formatAmount(amount: number) {
    const sign = amount < 0 ? '-' : '';
    return `${sign}${new Intl.NumberFormat('ru-RU').format(Math.abs(amount))} €`;
  }

  const groups = [
    {
      date: 'today',
      operations: [
        {
          title: 'Кофе в Старбакс',
          subtitle: 'Food/Cafe',
          icon: '☕️',
          color: '#f59e0b',
          amount: -450,
        },
        {
          title: 'Пятёрочка',
          subtitle: 'Groceries',
          icon: '🛒',
          color: '#12b76a',
          amount: -3200,
        },
      ],
    },
    {
      date: 'yesterday',
      operations: [
        {
          title: 'Яндекс Такси',
          subtitle: 'Transport',
          icon: '🚗',
          color: '#3b82f6',
          amount: -1200,
        },
      ],
    },
    {
      date: '2 July',
      operations: [
        {
          title: 'Бизнес-ланч',
          subtitle: 'Food/Cafe',
          icon: '☕️',
          color: '#f59e0b',
          amount: -850,
        },
        {
          title: 'Оплата ЖКХ',
          subtitle: 'Utilities',
          icon: '🧾',
          color: '#64748b',
          amount: -5400,
        },
      ],
    },
  ];

  return { formatAmount, groups };
}
