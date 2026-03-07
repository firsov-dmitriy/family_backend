import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExpenseCategory } from '../expense-categories/entities/expense-category.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { MonthSummaryResponseDto } from './dto/month-summary-response.dto';
import { SetMonthLimitDto } from './dto/set-month-limit.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { MonthlyLimit } from './entities/monthly-limit.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
    @InjectRepository(ExpenseCategory)
    private readonly expenseCategoriesRepository: Repository<ExpenseCategory>,
    @InjectRepository(MonthlyLimit)
    private readonly monthlyLimitsRepository: Repository<MonthlyLimit>,
  ) {}

  async create(createDto: CreateExpenseDto): Promise<Expense> {
    await this.ensureCategoryExists(createDto.categoryId);

    const expense = this.expensesRepository.create({
      ...createDto,
      comment: createDto.comment ?? null,
    });

    return this.expensesRepository.save(expense);
  }

  findAll(): Promise<Expense[]> {
    return this.expensesRepository.find({
      relations: { category: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with id=${id} not found`);
    }

    return expense;
  }

  async update(id: number, updateDto: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.findOne(id);

    if (typeof updateDto.categoryId === 'number') {
      await this.ensureCategoryExists(updateDto.categoryId);
    }

    const payload = { ...updateDto } as Partial<UpdateExpenseDto>;
    if (payload.comment === undefined) {
      delete payload.comment;
    }
    Object.assign(expense, payload);

    return this.expensesRepository.save(expense);
  }

  async remove(id: number): Promise<void> {
    const result = await this.expensesRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Expense with id=${id} not found`);
    }
  }

  async getMonthSummary(month: number): Promise<MonthSummaryResponseDto> {
    const result = await this.expensesRepository
      .createQueryBuilder('expense')
      .select('COALESCE(SUM(expense.amount), 0)', 'spent')
      .where('expense.month = :month', { month })
      .getRawOne<{ spent: string }>();

    const limitRow = await this.monthlyLimitsRepository.findOne({ where: { month } });
    const limit = limitRow ? Number(limitRow.limit) : 0;
    const spent = Number(result?.spent ?? 0);

    return {
      month,
      limit,
      spent,
    };
  }

  async setMonthLimit(dto: SetMonthLimitDto): Promise<MonthSummaryResponseDto> {
    const existingLimit = await this.monthlyLimitsRepository.findOne({
      where: { month: dto.month },
    });
    if (existingLimit) {
      existingLimit.limit = dto.limit;
      await this.monthlyLimitsRepository.save(existingLimit);
    } else {
      const newLimit = this.monthlyLimitsRepository.create(dto);
      await this.monthlyLimitsRepository.save(newLimit);
    }

    return this.getMonthSummary(dto.month);
  }

  private async ensureCategoryExists(categoryId: number): Promise<void> {
    const category = await this.expenseCategoriesRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new NotFoundException(`Expense category with id=${categoryId} not found`);
    }
  }
}
