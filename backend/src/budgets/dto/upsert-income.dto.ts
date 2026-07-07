import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertIncomeDto {
  @IsString()
  @IsNotEmpty()
  month: string;

  @IsNumber()
  amount: number;
}
