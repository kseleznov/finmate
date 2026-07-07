import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  findAll(@Query('month') month?: string) {
    return this.budgetsService.findAll(month);
  }

  @Post()
  upsert(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.upsert(createBudgetDto);
  }
}
