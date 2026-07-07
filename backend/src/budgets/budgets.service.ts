import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

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
}
