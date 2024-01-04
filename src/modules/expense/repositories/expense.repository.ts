import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';
import { RegisterExpenseDtos } from '../dtos/register-expense.dtos';

@Injectable()
export class ExpenseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async seeExpenses(id: string) {
    try{
      const data = await this.prismaService.expenses.findMany({
        where: {
          userId: id,
        },
      });
      if (data.length <= 0) {
        return {
          message: 'Nenhuma despesa cadastrada.'
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

  async registerExpense(id: string, data: RegisterExpenseDtos) {
    try{
      const date = new Date(data.date);
      const expenseData = await this.prismaService.expenses.create({
        data: {
          userId: id,
          description: data.description,
          amount: parseFloat(data.amount),
          date: date.toISOString(),
          isPaid: data.isPaid,
        },
      });

      return {
        message: 'Despesa cadastrada com sucesso.',
        data: expenseData,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de cadastrar sua Despesa.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateExpense(id: string, userId: string, data: RegisterExpenseDtos) {
    try{
      const date = new Date(data.date);
      await this.prismaService.expenses.update({
        where: {
          id,
          userId: userId
        },
        data: {
          description: data.description,
          amount: parseFloat(data.amount),
          date: date.toISOString(),
          isPaid: data.isPaid,
        }
      });

      return {
        message: 'Despesa atualizada com sucesso.',
        data: data
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de atualizar sua Despesa.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteExpense(id: string, userId: string) {
    try{
      await this.prismaService.expenses.delete({
        where: {
          id,
          userId: userId
        },
      });

      return {
        message: 'Despesa deletada com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de deletar sua Despesa.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async seeSingleExpense(id: string, userId: string) {
    try{
      const data = await this.prismaService.expenses.findFirst({
        where: {
          id,
          userId: userId,
        },
      });

      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error no processo de visualizar a Despesa.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}