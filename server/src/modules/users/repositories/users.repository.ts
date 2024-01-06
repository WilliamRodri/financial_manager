import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';
import { CreateUserDtos } from '../dtos/users/create-user.dtos';
import { UpdateUserDtos } from '../dtos/users/update-user.dtos';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    try{
      return await this.prismaService.users.findMany();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error na coleta dos dados',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  
  async createUser(user: CreateUserDtos) {
    try{
      const data = {
        username: user.username,
        email: user.email,
        password: user.password
      };
  
      await this.prismaService.users.create({
        data: data,
      });

      return [{ message: 'Usuario criado com sucesso' }];
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error na criação do usuario',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async updateUser(id: string, data: UpdateUserDtos) {
    try{
      const userUpdate = await this.prismaService.users.update({
        where: {
          id,
        },
        data,
      });

      return [
        {
          message: 'Usuario atualizado com sucesso.',
          data: userUpdate,
        },
      ];
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error na atualização do usuario',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string) {
    try{
      await this.prismaService.users.delete({ where: { id } });
      return [
        {
          message: 'Usuario deletado com sucesso.',
        },
      ];
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de deletar o usuario',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUser(username: string, password: string) {
    try{
      return this.prismaService.users.findFirst({
        where: {
          username: username,
          password: password,
        },
      })
    } catch (error) {
      return null;
    }
  }
}