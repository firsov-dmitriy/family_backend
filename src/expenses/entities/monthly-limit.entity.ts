import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'monthly_limits' })
export class MonthlyLimit {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 3, minimum: 1, maximum: 12 })
  @Column({ type: 'smallint', unique: true })
  month!: number;

  @ApiProperty({ example: 47606 })
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => Number(value),
    },
  })
  limit!: number;
}
