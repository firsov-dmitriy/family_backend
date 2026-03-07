import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseCategory } from './entities/expense-category.entity';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly expenseCategoriesRepository: Repository<ExpenseCategory>,
  ) {}

  async create(createDto: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
    try {
      const category = this.expenseCategoriesRepository.create(createDto);
      return await this.expenseCategoriesRepository.save(category);
    } catch (error) {
      this.handleUniqueError(error, createDto.name);
      throw error;
    }
  }

  findAll(): Promise<ExpenseCategory[]> {
    return this.expenseCategoriesRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<ExpenseCategory> {
    const category = await this.expenseCategoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Expense category with id=${id} not found`);
    }

    return category;
  }

  async update(id: number, updateDto: UpdateExpenseCategoryDto): Promise<ExpenseCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateDto);

    try {
      return await this.expenseCategoriesRepository.save(category);
    } catch (error) {
      this.handleUniqueError(error, updateDto.name);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.expenseCategoriesRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Expense category with id=${id} not found`);
    }
  }

  private handleUniqueError(error: unknown, name?: string): void {
    if (
      error instanceof QueryFailedError &&
      (error as { driverError?: { code?: string } }).driverError?.code === '23505'
    ) {
      throw new ConflictException(`Expense category '${name}' already exists`);
    }
  }
}
