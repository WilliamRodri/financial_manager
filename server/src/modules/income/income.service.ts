import { Injectable } from '@nestjs/common';
import { IncomeRepository } from './repositories/income.repository';
import { RegisterIncomeDtos } from './dtos/register-income.dtos';

@Injectable()
export class IncomeService {
  constructor(private readonly incomeRespository: IncomeRepository) {}

  seeLace(id: string) {
    return this.incomeRespository.seeLace(id);
  }

  registerIncome(id: string, data: RegisterIncomeDtos) {
    return this.incomeRespository.registerIncome(id, data);
  }

  updateIncome(id: string, userId: string, data: RegisterIncomeDtos) {
    return this.incomeRespository.updateIncome(id, userId, data);
  }

  deleteIncome(id: string, userId: string) {
    return this.incomeRespository.deleteIncome(id, userId);
  }

  seeSingleIncome(id: string, userId: string) {
    return this.incomeRespository.seeSingleIncome(id, userId);
  }
}
