import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseCategory } from './entities/expense-category.entity';
import { ExpenseCategoriesService } from './expense-categories.service';

@ApiTags('expense-categories')
@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: ExpenseCategory })
  create(@Body() createDto: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
    return this.expenseCategoriesService.create(createDto);
  }

  @Get()
  @ApiOkResponse({ type: [ExpenseCategory] })
  findAll(): Promise<ExpenseCategory[]> {
    return this.expenseCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ExpenseCategory })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ExpenseCategory> {
    return this.expenseCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ExpenseCategory })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    return this.expenseCategoriesService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.expenseCategoriesService.remove(id);
  }
}
