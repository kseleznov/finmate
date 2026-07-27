export interface CategoryBreakdownDto {
  categoryName: string;
  icon: string;
  color: string;
  spent: number;
}

export interface DashboardSummaryDto {
  expenses: number;
  categoryBreakdown: CategoryBreakdownDto[];
}

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
  icon: string;
}
