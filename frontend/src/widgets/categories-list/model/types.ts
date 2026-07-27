export interface CategoryBreakdownDto {
  categoryName: string;
  icon: string;
  color: string;
  limit: number;
  spent: number;
  remaining: number;
}

export interface DashboardSummaryDto {
  categoryBreakdown: CategoryBreakdownDto[];
}

export interface DisplayCategory {
  title: string;
  icon: string;
  color: string;
  spent: number;
  remaining: number;
}
