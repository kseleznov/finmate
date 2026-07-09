import { IsInt, Max, Min } from 'class-validator';

export class UpdatePaydayDto {
  @IsInt()
  @Min(1)
  @Max(31)
  payday: number;
}
