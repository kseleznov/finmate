import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOperationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsIn(['INCOME', 'EXPENSE'])
  type?: 'INCOME' | 'EXPENSE';

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
