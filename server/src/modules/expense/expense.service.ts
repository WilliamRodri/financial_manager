import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './repositories/expense.repository';
import { RegisterExpenseDtos } from './dtos/register-expense.dtos';

@Injectable()
export class ExpenseService {
  constructor(private readonly repository: ExpenseRepository) {}
  seeExpenses(id: string) {
    return this.repository.seeExpenses(id);
  }

  registerExpense(id: string, data: RegisterExpenseDtos) {
    return this.repository.registerExpense(id, data);
  }

  updateExpense(id: string, userId: string, data: RegisterExpenseDtos) {
    return this.repository.updateExpense(id, userId, data);
  }

  deleteExpense(id: string, userId: string) {
    return this.repository.deleteExpense(id, userId);
  }

  seeSingleExpense(id: string, userId: string) {
    return this.repository.seeSingleExpense(id, userId);
  }
}
