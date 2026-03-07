import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseCategory } from '../expense-categories/entities/expense-category.entity';
import { CategoryMonthlyLimit } from './entities/category-monthly-limit.entity';
import { Expense } from './entities/expense.entity';
import { MonthlyLimit } from './entities/monthly-limit.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ExpenseCategory, MonthlyLimit, CategoryMonthlyLimit]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
