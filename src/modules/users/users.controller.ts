import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDtos } from './dtos/users/create-user.dtos';
import { UpdateUserDtos } from './dtos/users/update-user.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('create')
  createUser(@Body() body: CreateUserDtos) {
    return this.usersService.createUser(body);
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDtos) {
    return this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
