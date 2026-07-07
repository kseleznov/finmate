import { useState } from 'react';

export function useCategoriesList() {
  const formatAmount = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' €';

  const categories = [
    { title: 'Shopping', icon: '🛍️', color: '#e91e8c', spent: 0, remaining: 5000 },
    { title: 'Utilities', icon: '⚡', color: '#4b5563', spent: 0, remaining: 3000 },
    { title: 'Groceries', icon: '🛒', color: '#12b76a', spent: 0, remaining: 5000 },
    { title: 'Transport', icon: '🚗', color: '#3b82f6', spent: 0, remaining: 2000 },
    { title: 'Food/Cafe', icon: '☕️', color: '#f59e0b', spent: 0, remaining: 15000 },
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
