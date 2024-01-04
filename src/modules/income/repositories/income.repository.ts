import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';
import { RegisterIncomeDtos } from '../dtos/register-income.dtos';

@Injectable()
export class IncomeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async seeLace(id: string) {
    try{
      const data = await this.prismaService.incomes.findMany({
        where: {
          userId: id,
        },
      });
      if (data.length <= 0) {
        return {
          message: 'Nenhuma renda cadastrada.'
        };
      } else {
        return data;
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error na coleta dos dados',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerIncome(id: string, data: RegisterIncomeDtos) {
    try{
      const date = new Date(data.date);
      const incomeData = await this.prismaService.incomes.create({
        data: {
          userId: id,
          description: data.description,
          amount: parseFloat(data.amount),
          date: date.toISOString(),
        },
      });

      return {
        message: 'Renda cadastrada com sucesso.',
        data: incomeData,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de cadastrar sua Renda.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateIncome(id: string, userId: string, data: RegisterIncomeDtos) {
    try{
      const date = new Date(data.date);
      await this.prismaService.incomes.update({
        where: {
          id,
          userId: userId
        },
        data: {
          description: data.description,
          amount: parseFloat(data.amount),
          date: date.toISOString(),
        }
      });

      return {
        message: 'Renda atualizada com sucesso.',
        data: data
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de atualizar sua Renda.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteIncome(id: string, userId: string) {
    try{
      await this.prismaService.incomes.delete({
        where: {
          id,
          userId: userId
        },
      });

      return {
        message: 'Renda deletada com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de deletar sua Renda.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async seeSingleIncome(id: string, userId: string) {
    try{
      const data = await this.prismaService.incomes.findFirst({
        where: {
          id,
          userId: userId,
        },
      });

      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de visualizar a Renda.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}