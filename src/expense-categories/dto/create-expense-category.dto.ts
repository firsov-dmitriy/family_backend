import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateExpenseCategoryDto {
  @ApiProperty({ example: 'Transport' })
  @IsString()
  @MaxLength(120)
  name!: string;
}
