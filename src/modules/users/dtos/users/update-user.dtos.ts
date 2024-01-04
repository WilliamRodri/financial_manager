import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDtos {
  @IsString()
  username: string;
  
  @IsEmail()
  email: string;

  @IsString()   
  password: string;
}
