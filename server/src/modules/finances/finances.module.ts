import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { IncomeModule } from '../income/income.module';
import { ExpenseModule } from '../expense/expense.module';

@Module({
  imports: [IncomeModule, ExpenseModule],
  providers: [FinancesService],
  controllers: [FinancesController],
  exports: [],
})
export class FinancesModule {}
