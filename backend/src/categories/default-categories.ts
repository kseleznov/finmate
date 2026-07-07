import { CategoryType } from '@prisma/client';

export const DEFAULT_CATEGORIES: {
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
}[] = [
  { name: 'Food/Cafe', icon: '☕️', color: '#f59e0b', type: 'EXPENSE' },
  { name: 'Groceries', icon: '🛒', color: '#12b76a', type: 'EXPENSE' },
  { name: 'Entertainment', icon: '🎬', color: '#8b5cf6', type: 'EXPENSE' },
  { name: 'Transport', icon: '🚗', color: '#3b82f6', type: 'EXPENSE' },
  { name: 'Shopping', icon: '🛍️', color: '#e91e8c', type: 'EXPENSE' },
  { name: 'Health', icon: '❤️', color: '#ef4444', type: 'EXPENSE' },
  { name: 'Utilities', icon: '📄', color: '#4b5563', type: 'EXPENSE' },
  { name: 'Salary', icon: '💼', color: '#0f766e', type: 'INCOME' },
  { name: 'Freelance', icon: '🧑‍💻', color: '#2563eb', type: 'INCOME' },
];
