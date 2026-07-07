import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpsertIncomeDto } from './dto/upsert-income.dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string, month?: string) {
    return this.prisma.budgetLimit.findMany({
      where: { userId, ...(month ? { month } : {}) },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async upsert(userId: string, createBudgetDto: CreateBudgetDto) {
    return this.prisma.budgetLimit.upsert({
      where: {
        categoryId_month_userId: {
          categoryId: createBudgetDto.categoryId,
          month: createBudgetDto.month,
          userId,
        },
      },
      update: { amount: createBudgetDto.amount },
      create: {
        categoryId: createBudgetDto.categoryId,
        month: createBudgetDto.month,
        amount: createBudgetDto.amount,
        userId,
      },
      include: { category: true },
    });
  }

  async getIncome(userId: string, month: string) {
    const income = await this.prisma.monthlyIncome.findUnique({
      where: { userId_month: { userId, month } },
    });

    return { month, amount: income?.amount ?? 0 };
  }

  async upsertIncome(userId: string, upsertIncomeDto: UpsertIncomeDto) {
    const income = await this.prisma.monthlyIncome.upsert({
      where: {
        userId_month: { userId, month: upsertIncomeDto.month },
      },
      update: { amount: upsertIncomeDto.amount },
      create: {
        userId,
        month: upsertIncomeDto.month,
        amount: upsertIncomeDto.amount,
      },
    });

    return { month: income.month, amount: income.amount };
  }
}
