import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class SetMonthLimitDto {
  @ApiProperty({ example: 3, minimum: 1, maximum: 12 })
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;

  @ApiProperty({ example: 47606 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  limit!: number;
}
