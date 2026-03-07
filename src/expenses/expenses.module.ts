import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseCategory } from '../expense-categories/entities/expense-category.entity';
import { Expense } from './entities/expense.entity';
import { MonthlyLimit } from './entities/monthly-limit.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseCategory, MonthlyLimit])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
