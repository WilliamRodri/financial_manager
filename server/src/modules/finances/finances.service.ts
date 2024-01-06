
import { Injectable } from '@nestjs/common';
import { IncomeRepository } from '../income/repositories/income.repository';
import { ExpenseRepository } from '../expense/repositories/expense.repository';

@Injectable()
export class FinancesService {
  constructor(
    private readonly seeLance: IncomeRepository,
    private readonly seeExpenses: ExpenseRepository,
  ) {}
  async getFInances(id: string) {
    const incomes = await this.seeLance.seeLace(id);
    const expenses = await this.seeExpenses.seeExpenses(id);
    let totalIncome = 0;
    let totalExpenses = 0;

    if (Array.isArray(incomes)) {
      incomes.forEach((obj) => {
        totalIncome += obj.amount;
      });
    }
    if (Array.isArray(expenses)) {
      expenses.forEach((obj) => {
        totalExpenses += obj.amount;
      });
    }
    var savingsPercentage = 0.2;
    let netBalance = totalIncome - totalExpenses;
    let balanceSave = netBalance * savingsPercentage;

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      balanceSave
    }
  }
}
