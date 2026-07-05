import { useState } from 'react';

export function useBudget() {
  const formatAmount = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' €';

  const [income, setIncome] = useState(0);
  const [isEditingIncome, setIsEditingIncome] = useState(false);

  const [categories, setCategories] = useState([
    { id: 'food', title: 'Food/Cafe', icon: '☕️', color: '#f59e0b', limit: 0 },
    { id: 'groceries', title: 'Groceries', icon: '🛒', color: '#12b76a', limit: 0 },
    { id: 'entertainment', title: 'Entertainment', icon: '🎬', color: '#8b5cf6', limit: 0 },
    { id: 'transport', title: 'Transport', icon: '🚗', color: '#3b82f6', limit: 0 },
    { id: 'shopping', title: 'Shopping', icon: '🛍️', color: '#e91e8c', limit: 0 },
    { id: 'health', title: 'Health', icon: '❤️', color: '#ef4444', limit: 0 },
    { id: 'utilities', title: 'Utilities', icon: '📄', color: '#4b5563', limit: 0 },
  ]);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const updateCategoryLimit = (id: string, limit: number) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? { ...category, limit } : category))
    );
  };

  const allocated = categories.reduce((sum, category) => sum + category.limit, 0);
  const leftToAllocate = income - allocated;

  return {
    formatAmount,
    income,
    setIncome,
    isEditingIncome,
    setIsEditingIncome,
    categories,
    editingCategoryId,
    setEditingCategoryId,
    updateCategoryLimit,
    allocated,
    leftToAllocate,
  };
}
