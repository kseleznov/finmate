import { apiFetch } from '@/shared/api/client';
import type { CategoryDto } from '../model/types';

export function getBudgetCategories() {
  return apiFetch<CategoryDto[]>('/categories?type=EXPENSE');
}
