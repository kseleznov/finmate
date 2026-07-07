import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('month') month?: string,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
    @Query('categoryId') categoryId?: string,
  ) {
    return this.operationsService.findAll(user.userId, month, type, categoryId);
  }

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createOperationDto: CreateOperationDto,
  ) {
    return this.operationsService.create(user.userId, createOperationDto);
  }

  @Put(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(user.userId, id, updateOperationDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.operationsService.remove(user.userId, id);
  }
}
