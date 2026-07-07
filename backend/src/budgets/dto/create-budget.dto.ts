import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  month: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  title?: string;
}
