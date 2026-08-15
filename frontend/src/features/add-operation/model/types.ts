export type Step = 'choose' | 'manual';

export interface BudgetLimitDto {
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

export interface DisplayCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}
