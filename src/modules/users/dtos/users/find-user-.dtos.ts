import { IsString } from 'class-validator';

export class FinUserDtos {
  @IsString()
  username: string;
  
  @IsString()
  password: string;
}
