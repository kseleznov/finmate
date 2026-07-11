import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      payday: user.payday,
    };
  }

  async updateUsername(userId: string, username: string) {
    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing && existing.id !== userId) {
      throw new ConflictException('Username is already taken');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      payday: user.payday,
    };
  }

  async updatePayday(userId: string, payday: number) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { payday },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      payday: user.payday,
    };
  }
}
