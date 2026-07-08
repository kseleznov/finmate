import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string, type?: 'INCOME' | 'EXPENSE') {
    return this.prisma.category.findMany({
      where: { userId, ...(type ? { type } : {}) },
      orderBy: { createdAt: 'asc' },
    });
  }

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        type: createCategoryDto.type ?? 'EXPENSE',
        userId,
      },
    });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.category.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.prisma.category.delete({ where: { id } });
    return { deleted: true, id };
  }
}
