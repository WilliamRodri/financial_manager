import { IsString, IsEmail } from 'class-validator';

export class CreateUserDtos {
  @IsString()
  username: string;
  
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
