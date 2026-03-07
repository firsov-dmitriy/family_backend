import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ExpenseCategory } from '../../expense-categories/entities/expense-category.entity';

@Entity({ name: 'expenses' })
export class Expense {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 2 })
  @Column({ name: 'category_id', type: 'int' })
  categoryId!: number;

  @ApiProperty({ type: () => ExpenseCategory })
  @ManyToOne(() => ExpenseCategory, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category!: ExpenseCategory;

  @ApiProperty({ example: 15, minimum: 1, maximum: 31 })
  @Column({ type: 'smallint' })
  day!: number;

  @ApiProperty({ example: 3, minimum: 1, maximum: 12 })
  @Column({ type: 'smallint' })
  month!: number;

  @ApiProperty({ example: 250.75 })
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => Number(value),
    },
  })
  amount!: number;

  @ApiProperty({ example: 'Taxi airport to home', required: false })
  @Column({ type: 'varchar', length: 500, nullable: true })
  comment!: string | null;
}
