import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(month?: string) {
    const targetMonth = month ?? this.getCurrentMonth();
    const [year, monthNumber] = targetMonth.split('-').map(Number);
    const start = new Date(Date.UTC(year, monthNumber - 1, 1));
    const end = new Date(Date.UTC(year, monthNumber, 0, 23, 59, 59, 999));

    const operations = await this.prisma.operation.findMany({
      where: { date: { gte: start, lte: end } },
      include: { category: true },
    });

    const budgetLimits = await this.prisma.budgetLimit.findMany({
      where: { month: targetMonth },
      include: { category: true },
    });

    const income = operations
      .filter((op) => op.type === 'INCOME')
      .reduce((sum, op) => sum + op.amount, 0);
    const expenses = operations
      .filter((op) => op.type === 'EXPENSE')
      .reduce((sum, op) => sum + op.amount, 0);

    const categoryBreakdown = budgetLimits.map((limit) => {
      const spent = operations
        .filter(
          (op) => op.categoryId === limit.categoryId && op.type === 'EXPENSE',
        )
        .reduce((sum, op) => sum + op.amount, 0);

      return {
        categoryId: limit.categoryId,
        categoryName: limit.category.name,
        limit: limit.amount,
        spent,
        remaining: limit.amount - spent,
      };
    });

    return {
      month: targetMonth,
      income,
      expenses,
      balance: income - expenses,
      budgeted: budgetLimits.reduce((sum, limit) => sum + limit.amount, 0),
      budgetLeft:
        budgetLimits.reduce((sum, limit) => sum + limit.amount, 0) - expenses,
      categoryBreakdown,
    };
  }

  private getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }
}
