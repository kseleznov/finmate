import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(type?: 'INCOME' | 'EXPENSE') {
    return this.prisma.category.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: 'asc' },
    });
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        type: createCategoryDto.type ?? 'EXPENSE',
      },
    });
  }
}
