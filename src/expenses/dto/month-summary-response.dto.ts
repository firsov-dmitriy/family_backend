import { ApiProperty } from '@nestjs/swagger';

export class MonthSummaryResponseDto {
  @ApiProperty({ example: 3 })
  month!: number;

  @ApiProperty({ example: 47606 })
  limit!: number;

  @ApiProperty({ example: 4472 })
  spent!: number;
}
