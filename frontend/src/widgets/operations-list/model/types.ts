export interface OperationDto {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  category: { name: string; icon: string; color: string } | null;
}

export interface DisplayOperation {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  amount: number;
}
