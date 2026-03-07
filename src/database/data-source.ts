import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ExpenseCategory } from '../expense-categories/entities/expense-category.entity';
import { Expense } from '../expenses/entities/expense.entity';
import { MonthlyLimit } from '../expenses/entities/monthly-limit.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Wishlist, ExpenseCategory, Expense, MonthlyLimit],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
  logging: process.env.POSTGRES_LOGGING === 'true',
});
