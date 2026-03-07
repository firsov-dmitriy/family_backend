import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  categoryId!: number;

  @ApiProperty({ example: 15, minimum: 1, maximum: 31 })
  @IsInt()
  @Min(1)
  @Max(31)
  day!: number;

  @ApiProperty({ example: 3, minimum: 1, maximum: 12 })
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;

  @ApiProperty({ example: 250.75 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount!: number;

  @ApiProperty({ example: 'Taxi airport to home', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
