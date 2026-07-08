import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
  ) {
    return this.categoriesService.findAll(user.userId, type);
  }

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(user.userId, createCategoryDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.categoriesService.remove(user.userId, id);
  }
}
