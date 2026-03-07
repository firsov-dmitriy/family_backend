import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class SetCategoryLimitDto {
  @ApiProperty({ example: 3, minimum: 1, maximum: 12 })
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  categoryId!: number;

  @ApiProperty({ example: 25967 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  limit!: number;
}
