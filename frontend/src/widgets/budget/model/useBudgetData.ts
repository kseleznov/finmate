import { useQuery } from '@tanstack/react-query';
import { DEFAULT_EXPENSE_CATEGORIES } from '@/shared/lib/defaultCategories';
import { getBudgetCategories } from '../api/getBudgetCategories';
import { getBudgetLimits } from '../api/getBudgetLimits';
import { getBudgetIncome } from '../api/getBudgetIncome';
import type { BudgetCategory } from './types';

export interface BudgetData {
  categories: BudgetCategory[];
  income: number;
}

export function budgetQueryKey(month: string, isAuthenticated: boolean) {
  return ['budget', month, isAuthenticated] as const;
}

async function fetchBudgetData(month: string, isAuthenticated: boolean): Promise<BudgetData> {
  if (!isAuthenticated) {
    return {
      categories: DEFAULT_EXPENSE_CATEGORIES.map((category) => ({
        id: category.name,
        title: category.name,
        icon: category.icon,
        color: category.color,
        limit: 0,
      })),
      income: 0,
    };
  }

  const [categoriesRes, limitsRes, incomeRes] = await Promise.all([
    getBudgetCategories(),
    getBudgetLimits(month),
    getBudgetIncome(month),
  ]);

  const limitByCategoryId = new Map(limitsRes.map((limit) => [limit.categoryId, limit.amount]));

  const categories = categoriesRes.map((category) => ({
    id: category.id,
    title: category.name,
    icon: category.icon,
    color: category.color,
    limit: limitByCategoryId.get(category.id) ?? 0,
  }));

  categories.sort((a, b) => Number(b.limit > 0) - Number(a.limit > 0));

  return { categories, income: incomeRes.amount };
}

export function useBudgetData(month: string, isAuthenticated: boolean) {
  return useQuery({
    queryKey: budgetQueryKey(month, isAuthenticated),
    queryFn: () => fetchBudgetData(month, isAuthenticated),
  });
}
