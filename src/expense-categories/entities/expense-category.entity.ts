import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'expense_categories' })
export class ExpenseCategory {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Transport' })
  @Column({ type: 'varchar', length: 120, unique: true })
  name!: string;
}
