import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDtos } from './dtos/users/create-user.dtos';
import { UpdateUserDtos } from './dtos/users/update-user.dtos';
import { FinUserDtos } from './dtos/users/find-user-.dtos';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
    
  getUsers() {
    return this.repository.getUsers();
  }

  createUser(user: CreateUserDtos) {
    return this.repository.createUser(user);
  }

  updateUser(id: string, user: UpdateUserDtos) {
    return this.repository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.repository.deleteUser(id);
  }

  findUser(username: string, password: string) {
    return this.repository.findUser(username, password);
  }
}