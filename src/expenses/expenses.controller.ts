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
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CategorySummaryResponseDto } from './dto/category-summary-response.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { MonthSummaryQueryDto } from './dto/month-summary-query.dto';
import { MonthSummaryResponseDto } from './dto/month-summary-response.dto';
import { SetCategoryLimitDto } from './dto/set-category-limit.dto';
import { SetMonthLimitDto } from './dto/set-month-limit.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiCreatedResponse({ type: Expense })
  create(@Body() createDto: CreateExpenseDto): Promise<Expense> {
    return this.expensesService.create(createDto);
  }

  @Get()
  @ApiOkResponse({ type: [Expense] })
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Get('month-summary')
  @ApiOkResponse({ type: MonthSummaryResponseDto })
  getMonthSummary(@Query() query: MonthSummaryQueryDto): Promise<MonthSummaryResponseDto> {
    return this.expensesService.getMonthSummary(query.month);
  }

  @Patch('month-limit')
  @ApiOkResponse({ type: MonthSummaryResponseDto })
  setMonthLimit(@Body() dto: SetMonthLimitDto): Promise<MonthSummaryResponseDto> {
    return this.expensesService.setMonthLimit(dto);
  }

  @Get('categories-summary')
  @ApiOkResponse({ type: [CategorySummaryResponseDto] })
  getCategoriesSummary(
    @Query() query: MonthSummaryQueryDto,
  ): Promise<CategorySummaryResponseDto[]> {
    return this.expensesService.getCategoriesSummary(query.month);
  }

  @Patch('category-limit')
  @ApiOkResponse({ type: CategorySummaryResponseDto })
  setCategoryLimit(@Body() dto: SetCategoryLimitDto): Promise<CategorySummaryResponseDto> {
    return this.expensesService.setCategoryLimit(dto);
  }

  @Get(':id')
  @ApiOkResponse({ type: Expense })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Expense })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.expensesService.remove(id);
  }
}
