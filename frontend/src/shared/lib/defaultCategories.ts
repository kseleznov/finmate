// Mirrors backend DEFAULT_CATEGORIES (backend/src/categories/default-categories.ts),
// which every account gets seeded on registration — safe to use as a logged-out
// placeholder so the budget page doesn't need an authenticated request.
export const DEFAULT_EXPENSE_CATEGORIES: { name: string; icon: string; color: string }[] = [
  { name: 'Food/Cafe', icon: '☕️', color: '#f59e0b' },
  { name: 'Groceries', icon: '🛒', color: '#12b76a' },
  { name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  { name: 'Transport', icon: '🚗', color: '#3b82f6' },
  { name: 'Shopping', icon: '🛍️', color: '#e91e8c' },
  { name: 'Health', icon: '❤️', color: '#ef4444' },
  { name: 'Utilities', icon: '📄', color: '#4b5563' },
];
