import { useState } from 'react';

export function useCategoriesList() {
  const formatAmount = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' €';

  const categories = [
    { title: 'Shopping', icon: '🛍️', color: '#e91e8c', spent: 3200, remaining: 1800 },
    { title: 'Utilities', icon: '⚡', color: '#4b5563', spent: 2400, remaining: 600 },
    { title: 'Groceries', icon: '🛒', color: '#12b76a', spent: 2100, remaining: 2900 },
    { title: 'Transport', icon: '🚗', color: '#3b82f6', spent: 800, remaining: 1200 },
    { title: 'Food/Cafe', icon: '☕️', color: '#f59e0b', spent: 1300, remaining: 13700 },
  ];

  const VISIBLE_COUNT = 3;

  const [expanded, setExpanded] = useState(false);

  const visibleCategories = expanded ? categories : categories.slice(0, VISIBLE_COUNT);

  return {
    formatAmount,
    categories,
    VISIBLE_COUNT,
    expanded,
    setExpanded,
    visibleCategories,
  };
}
