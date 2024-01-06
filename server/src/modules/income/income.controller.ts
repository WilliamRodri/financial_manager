import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterIncomeDtos } from './dtos/register-income.dtos';

@Controller('income')
@UseGuards(AuthGuard('jwt'))
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  seeLace(@Request() req) {
    return this.incomeService.seeLace(req.user.id);
  }

  @Post('register-income')
  registerIncome(@Request() req, @Body() body: RegisterIncomeDtos) {
    return this.incomeService.registerIncome(req.user.id, body);
  }

  @Patch('update-income/:id')
  updateIncome(
    @Param('id') id,
    @Body() body: RegisterIncomeDtos,
    @Request() req,
  ) {
    return this.incomeService.updateIncome(id, req.user.id, body);
  }

  @Delete('delete-income/:id')
  deleteIncome(@Param('id') id, @Request() req) {
    return this.incomeService.deleteIncome(id, req.user.id);
  }

  @Get('see-single-income/:id')
  seeSingleIncome(@Param('id') id, @Request() req) {
    return this.incomeService.seeSingleIncome(id, req.user.id);
  }
}
