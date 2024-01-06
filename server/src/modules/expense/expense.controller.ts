import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterExpenseDtos } from './dtos/register-expense.dtos';

@Controller('expense')
@UseGuards(AuthGuard('jwt'))
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  seeExpenses(@Request() req) {
    return this.expenseService.seeExpenses(req.user.id);
  }

  @Post('register-income')
  registerExpense(@Request() req, @Body() body: RegisterExpenseDtos) {
    return this.expenseService.registerExpense(req.user.id, body);
  }

  @Patch('update-income/:id')
  updateExpense(
    @Param('id') id,
    @Body() body: RegisterExpenseDtos,
    @Request() req,
  ) {
    return this.expenseService.updateExpense(id, req.user.id, body);
  }

  @Delete('delete-income/:id')
  deleteExpense(@Param('id') id, @Request() req) {
    return this.expenseService.deleteExpense(id, req.user.id);
  }

  @Get('see-single-income/:id')
  seeSingleExpense(@Param('id') id, @Request() req) {
    return this.expenseService.seeSingleExpense(id, req.user.id);
  }
}
