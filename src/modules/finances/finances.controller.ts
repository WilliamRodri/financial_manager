import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FinancesService } from './finances.service';

@Controller('finances')
@UseGuards(AuthGuard('jwt'))
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}
  @Get()
  getFinances(@Request() req: any) {
    return this.financesService.getFInances(req.user.id);
  }
}
