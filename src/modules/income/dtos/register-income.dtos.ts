import { IsNumber, IsString } from 'class-validator';

export class RegisterIncomeDtos {
  @IsString()
  description: string;

  @IsNumber()
  amount: string;

  @IsString()
  date: string;
}