export interface CategoryDto {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface BudgetLimitDto {
  categoryId: string;
  amount: number;
}

export interface IncomeDto {
  month: string;
  amount: number;
}

export interface BudgetCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  limit: number;
}
