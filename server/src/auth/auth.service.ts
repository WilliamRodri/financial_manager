import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FinUserDtos } from 'src/modules/users/dtos/users/find-user-.dtos';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUser(username, password);
    if(user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      user_id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
