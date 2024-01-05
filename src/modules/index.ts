import { ExpenseModule } from './expense/expense.module';
import { FinancesModule } from './finances/finances.module';
import { IncomeModule } from './income/income.module';
import { UsersModule } from './users/users.module';

export const featureModules = [
  UsersModule,
  IncomeModule,
  ExpenseModule,
  FinancesModule,
];
