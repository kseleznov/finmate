import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(month?: string) {
    const where = month ? { month } : undefined;

    return this.prisma.budgetLimit.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async upsert(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budgetLimit.upsert({
      where: {
        categoryId_month: {
          categoryId: createBudgetDto.categoryId,
          month: createBudgetDto.month,
        },
      },
      update: { amount: createBudgetDto.amount },
      create: {
        categoryId: createBudgetDto.categoryId,
        month: createBudgetDto.month,
        amount: createBudgetDto.amount,
      },
      include: { category: true },
    });
  }
}
