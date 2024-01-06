import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { IncomeRepository } from './repositories/income.repository';

@Module({
  imports: [],
  controllers: [IncomeController],
  providers: [IncomeService, IncomeRepository],
  exports: [IncomeRepository],
})
export class IncomeModule {}
