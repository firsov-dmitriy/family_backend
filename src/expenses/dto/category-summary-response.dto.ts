import { ApiProperty } from '@nestjs/swagger';

export class CategorySummaryResponseDto {
  @ApiProperty({ example: 2 })
  categoryId!: number;

  @ApiProperty({ example: 'Food' })
  categoryName!: string;

  @ApiProperty({ example: 3 })
  month!: number;

  @ApiProperty({ example: 25967 })
  limit!: number;

  @ApiProperty({ example: 3462 })
  spent!: number;

  @ApiProperty({ example: 22505 })
  remaining!: number;
}
