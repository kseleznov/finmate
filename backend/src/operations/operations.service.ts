import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    userId: string,
    month?: string,
    type?: 'INCOME' | 'EXPENSE',
    categoryId?: string,
  ) {
    const where: Record<string, unknown> = { userId };

    if (type) {
      where.type = type;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (month) {
      const [year, monthNumber] = month.split('-').map(Number);
      const start = new Date(Date.UTC(year, monthNumber - 1, 1));
      const end = new Date(Date.UTC(year, monthNumber, 0, 23, 59, 59, 999));
      where.date = { gte: start, lte: end };
    }

    return this.prisma.operation.findMany({
      where,
      include: { category: true },
      orderBy: { date: 'desc' },
    });
  }

  create(userId: string, createOperationDto: CreateOperationDto) {
    return this.prisma.operation.create({
      data: {
        ...createOperationDto,
        date: new Date(createOperationDto.date),
        paymentMethod: createOperationDto.paymentMethod ?? 'cash',
        type: createOperationDto.type,
        userId,
      },
      include: { category: true },
    });
  }

  async update(
    userId: string,
    id: string,
    updateOperationDto: UpdateOperationDto,
  ) {
    const existing = await this.prisma.operation.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return this.prisma.operation.update({
      where: { id },
      data: {
        ...updateOperationDto,
        ...(updateOperationDto.date
          ? { date: new Date(updateOperationDto.date) }
          : {}),
      },
      include: { category: true },
    });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.operation.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    await this.prisma.operation.delete({ where: { id } });
    return { deleted: true, id };
  }
}
