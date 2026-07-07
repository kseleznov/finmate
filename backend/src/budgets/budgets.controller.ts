import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpsertIncomeDto } from './dto/upsert-income.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('month') month?: string,
  ) {
    return this.budgetsService.findAll(user.userId, month);
  }

  @Post()
  upsert(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.budgetsService.upsert(user.userId, createBudgetDto);
  }

  @Get('income')
  getIncome(
    @CurrentUser() user: AuthenticatedUser,
    @Query('month') month: string,
  ) {
    return this.budgetsService.getIncome(user.userId, month);
  }

  @Post('income')
  upsertIncome(
    @CurrentUser() user: AuthenticatedUser,
    @Body() upsertIncomeDto: UpsertIncomeDto,
  ) {
    return this.budgetsService.upsertIncome(user.userId, upsertIncomeDto);
  }
}
