import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  getHello() {
    return {
      message: 'Finmate API is running',
      timestamp: new Date().toISOString(),
    };
  }

  async getHealth() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok' };
  }

  async onModuleInit() {
    await this.seedCategories();
  }

  private async seedCategories() {
    const existing = await this.prisma.category.count();
    if (existing > 0) {
      return;
    }

    const defaults = [
      {
        name: 'Food/Cafe',
        icon: '☕️',
        color: '#f59e0b',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Groceries',
        icon: '🛒',
        color: '#12b76a',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Entertainment',
        icon: '🎬',
        color: '#8b5cf6',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Transport',
        icon: '🚗',
        color: '#3b82f6',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Shopping',
        icon: '🛍️',
        color: '#e91e8c',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Health',
        icon: '❤️',
        color: '#ef4444',
        type: 'EXPENSE' as const,
      },
      {
        name: 'Utilities',
        icon: '📄',
        color: '#4b5563',
        type: 'EXPENSE' as const,
      },
      { name: 'Salary', icon: '💼', color: '#0f766e', type: 'INCOME' as const },
      {
        name: 'Freelance',
        icon: '🧑‍💻',
        color: '#2563eb',
        type: 'INCOME' as const,
      },
    ];

    await this.prisma.category.createMany({ data: defaults });
  }
}
