import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RegisterExpenseDtos {
  @IsString()
  description: string;

  @IsNumber()
  amount: string;

  @IsString()
  date: string;

  @IsBoolean()
  isPaid: boolean;
}