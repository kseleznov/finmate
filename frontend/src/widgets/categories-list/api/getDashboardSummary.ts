import { apiFetch } from '@/shared/api/client';
import type { DashboardSummaryDto } from '../model/types';

export function getDashboardSummary(month: string) {
  return apiFetch<DashboardSummaryDto>(`/dashboard/summary?month=${month}`);
}
